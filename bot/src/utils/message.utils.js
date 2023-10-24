export const mentionConfig = (message, { UID, flag = "@Sender" }) => {
  return {
    body: message,
    mentions: [{ tag: flag, id: UID }],
  };
};
