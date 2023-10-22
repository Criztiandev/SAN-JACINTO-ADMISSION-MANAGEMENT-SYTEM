import { mentionConfig } from "../utils/message.utils.js";

export const introduction = () => (api, event) => {
  const { senderID, threadID } = event;
  const UID = api.getCurrentUserID();

  api.getUserInfo(UID, (err, ret) => {
    const { thumbSrc, name, profileUrl } = ret[UID];

    const info = {
      profilePic: thumbSrc,
      name: name,
      link: profileUrl,
      version: "0.0.1",
      platform: "Facebok",
    };

    const greetMessage = `Hello! @Sender I am ${info.name}, a bot running version ${info.version}. I'm here to assist you on ${info.platform}. How can I help you today?`;

    api.sendMessage(mentionConfig(greetMessage, { UID: senderID }), threadID);
  });
};
