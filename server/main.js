//npm libs
import _ from "lodash";
import http from "http";
import https from "https";
import config from "../config";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import socketio from "socket.io";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

//secrets
dotenv.config()

//internal utils
import { log } from "./log";
import { sendToUser } from "./logic/util/sendToSocketUser";
import { getRoomFromUser } from "./logic/util/getRoomFromUser";
import { handleColPicked } from "./logic/gridDraft/colPick";
import { getPlayerNumForGridAndPick } from "./logic/gridDraft/getPlayerNumberForGridAndPick";
import { addToRoom } from "./logic/util/addToRoom";
import { getCurrentUserPlayerNum } from "./logic/util/getCurrentUserPlayerNum";
import { getUserIdFromSocketId } from "./logic/util/getUserIdFromSocketId";
import { sendToRoom } from "./logic/util/sendToRoom";
import { sendDraftStateToClient } from "./logic/draft/sendDraftStateToClient";
import { popRandomCardFromCube } from "./logic/draft/popRandomCardFromCube";

//Action Handlers
import { startDraftActionHandler } from "./logic/draft/startDraftActionHandler";
import { openDraftStartFormHandler } from "./logic/draft/openDraftStartFormHandler";
import { gridPickActionHandler } from "./logic/gridDraft/gridPickActionHandler";
import { getGridDraftResumesListActionHandler } from "./logic/gridDraft/getGridDraftResumesListActionHandler";
import { getBoosterDraftResumesListActionHandler } from "./logic/boosterDraft/getBoosterDraftResumesListActionHandler";
import { boosterPickActionHandler } from "./logic/boosterDraft/boosterPickActionHandler";

import {addUserAndSendBoosterDraftStateToClient} from "./logic/boosterDraft/sendBoosterDraftStateToClient";

//Action Constants - shared client & server
import * as rootActions from "../src/actions/rootActions";
import * as gridDraftActions from "../src/routes/GridDraft/actions/gridDraftActions";
import * as boosterDraftActions from "../src/routes/BoosterDraft/actions/boosterDraftActions";

//Constants - shared client & server
import * as sharedConstants from "../src/constants/sharedConstants";

//Infrastructure
import { configureExpressApp } from "./intrastructure/configureExpressApp"
import {getMongooseModels} from "./intrastructure/getMongooseModels"
//Schema

const User = require("../src/models/user");

//TODO: cleanup, organize, and regression test imports

const MongoStore = require("connect-mongo")(session);
require("../config/passport")(passport); // pass passport for configuration


const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

//TODO replace this with
const secret = process.env.SECRET_KEY_BASE;

mongoose.connect(process.env.DB_CONN_STRING); // connect to our database


const DraftModels = getMongooseModels()
const app = configureExpressApp(passport, sessionStore,secret);


var server = http.createServer(app);
var draftToSocketIdMap = {};
var socketIdToUserMap = {};
var loggedInUserToSocketIdMap = {};
var io = socketio.listen(server);

io.use(
  passportSocketIo.authorize({
    key: "connect.sid",
    secret: secret,
    store: sessionStore,
    passport: passport,
    cookieParser: cookieParser
  })
);
var state = {};

io.on("connection", function(socket) {
  if (socket.request.user && socket.request.user.logged_in) {
    var data = {
      socketUser: socket.request.user,
      socketId: socket.id
    };

    const { nickname, email } = data.socketUser.local;

    socketIdToUserMap[data.socketId] = { nickname, email, id: data.socketUser._id };

    //This is important for turning on notifications for logged out players!!!
    //we suppress notifications for anyone in this list.
    loggedInUserToSocketIdMap[data.socketUser._id] = data.socketId;
    sendToUser(socket, {
      type: "authSuccess",
      data: data
    });

    socket.on("disconnect", function() {
      //This is important for turning on notifications for logged out players!!!
      //we suppress notifications for anyone in this list.
      delete loggedInUserToSocketIdMap[data.socketUser._id];
    });
  }
  //TODO: IMPORTANT! gotta trycatch this whole block or else junked actions can crash the server. no fun!
  socket.on("action", action => {
    const userId = getUserIdFromSocketId(socketIdToUserMap, socket.id);

    if (action.type === gridDraftActions.PICK_ROW || action.type === gridDraftActions.PICK_COL) {
      gridPickActionHandler(DraftModels.Draft, state, socket, action, userId, loggedInUserToSocketIdMap, draftToSocketIdMap);
    } else if (action.type === rootActions.START_DRAFT) {
      //convenience for drafts that need full player information
      //if we don't end up needing the full blob, we can convert this to just using userId
      var ownerInfo = socketIdToUserMap[socket.id];
      const afterDraftCreatedCallback = draft => {
        sendDraftStateToClient(state, draft, socket, socketIdToUserMap, draftToSocketIdMap);
        draftToSocketIdMap = addToRoom(draftToSocketIdMap, draft.name, socket.id);
      };
      startDraftActionHandler(DraftModels, state, action, ownerInfo, afterDraftCreatedCallback);
    } else if (action.type === rootActions.OPEN_DRAFT_START_FORM) {
      openDraftStartFormHandler(DraftModels.Cube, socket);
    } else if (action.type === boosterDraftActions.GET_BOOSTER_DRAFT_RESUMES_LIST) {
      getBoosterDraftResumesListActionHandler(DraftModels.BoosterDraft, socket, userId);
    } else if (action.type === boosterDraftActions.PICK_CARD) {
      boosterPickActionHandler(
        DraftModels.BoosterDraft,
        state,
        socket,
        action,
        userId,
        loggedInUserToSocketIdMap,
        draftToSocketIdMap
      );
    } else if (action.type === gridDraftActions.GET_RESUMES_LIST) {
      getGridDraftResumesListActionHandler(DraftModels.Draft, socket, userId);
    } else if (
      //      action.type === "server/RESUME_DRAFT" ||
      action.type === rootActions.LOCATION_CHANGE &&
      action.payload &&
      action.payload.pathname &&
      action.payload.pathname.split("/boosterDraft/").length > 1
    ) {
      if (action.payload && action.payload.pathname && action.payload.pathname.split("/boosterDraft/").length > 1) {
        action.data = { draft: { name: action.payload.pathname.split("/boosterDraft/")[1] } };
      }
      if (!action || !action.data || !action.data.draft || !action.data.draft.name) {
        //TODO: since adding the routing we're hitting this twice per every resume. Stuff works but inefficient
        log("resumeBoosterDraft... no action so we out!");
        return;
      }
      var draftId = action.data.draft.name;
      log("resume draft called with " + draftId);

      DraftModels.BoosterDraft.findOne(
        {
          name: draftId
        },
        function(err, resumeDraft) {
          if (err) {
            log("resume errored out");
            return;
          }

          addUserAndSendBoosterDraftStateToClient(resumeDraft, socket, socketIdToUserMap, state, draftToSocketIdMap);
        }
      );
    } else if (
      //      action.type === "server/RESUME_DRAFT" ||
      action.type === rootActions.LOCATION_CHANGE &&
      action.payload &&
      action.payload.pathname &&
      action.payload.pathname.split("/gridDraft/").length > 1
    ) {
      //TODO: figure out how to not call this when changing urlbar after create
      //we handle state population as is from creation
      //if that proves too hard, maybe don't populate state from creation
      //but like async/await so we can't hit this before the draft is saved?
      //OR!!!! and this is probably best...
      //just don't change the freaking URL until the save is done!!!
      if (action.payload && action.payload.pathname && action.payload.pathname.split("/gridDraft/").length > 1) {
        action.data = { draft: { name: action.payload.pathname.split("/gridDraft/")[1] } };
      }

      if (!action || !action.data || !action.data.draft || !action.data.draft.name) {
        log("resumeDraft... no action so we out!");
        return;
      }
      var draftId = action.data.draft.name;
      log("resume draft called with " + draftId);

      const afterDraftFindCallback = draft => {
        sendDraftStateToClient(state, draft, socket, socketIdToUserMap, draftToSocketIdMap);
        draftToSocketIdMap = addToRoom(draftToSocketIdMap, draftId, socket.id);
      };

      DraftModels.Draft.findOne(
        {
          name: draftId
        },
        function(err, resumeDraft) {
          if (err) {
            log("resume errored out");
            return;
          }
          afterDraftFindCallback(resumeDraft);
        }
      );
    }
  });
});

module.exports = server;
