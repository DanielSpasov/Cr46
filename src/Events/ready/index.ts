import errorHandler from "../../Errors/handler";
import { database } from "../../Database/setup";
import { Event } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { message } from "../../Messages";
import { setActivity } from "./helpers";

export const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
    try {
      const hasConnection = await database.connect(client);
      if (!hasConnection) return;
      setActivity(client);
      message.send({
        client,
        channelID: process.env.CONSOLE_CHANNEL_ID,
        embed: message.common.status(client),
      });
      console.log("Cr46 is Online!");
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
