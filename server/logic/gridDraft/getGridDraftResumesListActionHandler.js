const gridDraftActions = require("../../../src/routes/GridDraft/actions/gridDraftActions");

export const getGridDraftResumesListActionHandler = (Draft, socket, currentUserId) => {
  Draft.find(
    {
      $or: [
        {
          ownerId: currentUserId
        },
        {
          inviteeId: currentUserId
        }
      ]
    },
    "name",
    function(err, drafts) {
      if (err) {
        log("draft.find errored with: " + err);
        return handleError(err);
      }
      socket.emit("action", {
        type: gridDraftActions.GRID_LIST_INIT,
        data: drafts
      });
    }
  );
};
