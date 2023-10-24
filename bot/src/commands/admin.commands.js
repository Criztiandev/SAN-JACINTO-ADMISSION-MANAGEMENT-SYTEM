import { getThread } from "../utils/command.utils.js";

export const SearchUser = () => (api, event) => {
  const { body, senderID, threadID } = event;

  const credentials = getThread(body);

  api.getUserID("Marc Zuckerbot", (err, data) => {
    if (err) return console.log(err);

    console.log(data);
  });
};
