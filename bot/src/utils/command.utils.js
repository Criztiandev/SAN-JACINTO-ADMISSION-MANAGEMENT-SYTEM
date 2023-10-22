export const getCommand = cmd => cmd.split(" ")[0].slice(1).toLowerCase();

export const getThread = message =>
  message
    .replace(new RegExp(`^\\/${getCommand(message)}\\s+`, "i"), "")
    .replace(/[^a-z0-9\s:-@/-]/gi, "");
