import { setActivity, sendStatusMessage } from "./helpers";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";
import { database } from "./database";

export const event: Event = {
  name: "ready",
  run: async (client) => {
    try {
      const hasConnection = await database.connect(client);
      if (!hasConnection) return;
      setActivity(client);
      sendStatusMessage(client);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
