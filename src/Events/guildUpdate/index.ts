import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";

export const event: Event = {
  name: "guildUpdate",
  run: async (client, oldGuild, newGuild) => {
    try {
      console.log("In Guild Update");
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
