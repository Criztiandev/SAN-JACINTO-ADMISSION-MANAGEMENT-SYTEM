import login from "facebook-chat-api";
import dotenv from "dotenv";
import { serverController } from "./controller/main.controller.js";

dotenv.config();

if (process.env.APP_STATE === undefined) {
  console.log("App State Doesnt Exist");
  process.exit(1);
}

const credentials = {
  appState: JSON.parse(process.env.APP_STATE),
};

setTimeout(() => {
  login(credentials, (error, api) => {
    if (error) {
      return console.error(error);
    }

    api.setOptions({
      listenEvents: true,
      selfListen: true,
      autoMarkRead: false,
      autoMarkDelivery: false,
      logLevel: "info",
    });

    // main controller
    serverController(api);
  });
}, 3000);
