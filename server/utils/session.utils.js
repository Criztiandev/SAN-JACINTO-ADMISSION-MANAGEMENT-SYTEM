import sessionModel from "../models/sessionModel";

export const deleteExpiredSessions = async (id) => {
  await sessionModel.deleteMany({ UID: id });
  
};
