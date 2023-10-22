import { adminsCommand } from "../store/admin.store.js";
import { getCommand } from "../utils/command.utils.js";

export const serverController = api => (err, event) => {
  if (err) return console.err(err);

  const { type, body } = event;

  switch (type) {
    case "message":
      if (!body.startsWith("/")) return;
      const input = getCommand(body);

      const commandHandler = adminsCommand[input];
      if (commandHandler) commandHandler(api, event);

      break;
  }
};
