import * as boosterDraftActions from "../../../src/routes/BoosterDraft/actions/boosterDraftActions";

export const getBoosterDraftResumesListActionHandler = (BoosterDraft, socket, currentUserId) => {
  console.log("calling bdraft find");
  BoosterDraft.find(
      {
        $or: [
          {
            ownerId: currentUserId
          },
          {
            playerIds: currentUserId
          }
        ]
      },
      "name",
      function(err, drafts) {
        if (err) {
          log("draft.find errored with: " + err);
          return handleError(err);
        }
        console.log("bdraft found " + drafts);
        socket.emit("action", {
          type: boosterDraftActions.BOOSTER_DRAFT_LIST_INIT,
          data: drafts
        });
      }
    )
    .lean();
};
