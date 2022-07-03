import { guildService } from "../../Services/Guild";
import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "channelUpdate",
  run: async (client, channel) => {
    try {
      console.log("In Channel Update");
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
