import * as sendNotification from "./sendNotification";
export const notifyUser = (userId, content, url) => {
  console.log("notifyUser called with " + userId + " and " + content);
  var message = {
    app_id: "7f7d1877-0020-459c-91a1-d223bc3c7c09",
    contents: { en: content },
    filters: [{ field: "tag", key: "userId", relation: "=", value: userId }],
    url: url
  };

  sendNotification(message);
};
