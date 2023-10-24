import { SearchUser } from "../commands/admin.commands.js";
import { introduction } from "../commands/default.command.js";

export const adminsCommand = {
  introduce: introduction(),
  search: SearchUser(),
};
