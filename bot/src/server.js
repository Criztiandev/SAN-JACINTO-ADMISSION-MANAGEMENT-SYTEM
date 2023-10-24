import login from "facebook-chat-api";
import dotenv from "dotenv";
import { serverController } from "./controller/main.controller.js";
import { serverConfig } from "./config/bot.cofig.js";
dotenv.config();

if (process.env.APP_STATE === undefined) {
  console.log("App State Doesnt Exist");
  process.exit(1);
}

const credentials = {
  appState: JSON.parse(process.env.APP_STATE),
};

setTimeout(() => {
  try {
    login(credentials, (error, api) => {
      if (error) return console.error("Failed to Login, Please Try Again");

      api.setOptions(serverConfig);
      api.listenMqtt(serverController(api));
    });
  } catch (e) {
    console.log(e);
  }
}, 3000);
