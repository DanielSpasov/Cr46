import errorHandler from "../../Errors/handler";
import { database } from "../../Database/setup";
import { Event } from "../../Interfaces";
import { message } from "../../Messages";
import { setActivity } from "./helpers";

export const event: Event = {
  name: "ready",
  run: async (client) => {
    try {
      const hasConnection = await database.connect(client);
      if (!hasConnection) return;
      setActivity(client);
      message.status(client);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
