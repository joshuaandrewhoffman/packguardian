import * as rootActions from "../../../src/actions/rootActions";
export const openDraftStartFormHandler = (Cube, socket) => {
  Cube.find({}, "cube name", function(err, cubes) {
    if (err) {
      log("Cube.find errored with: " + err);
      return handleError(err);
    }
    socket.emit("action", {
      type: rootActions.CUBE_LIST_INIT,
      data: cubes
    });
  });
};
