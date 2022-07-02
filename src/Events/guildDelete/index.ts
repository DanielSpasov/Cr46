import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";
import Guild from "../../Models/Guild";

export const event: Event = {
  name: "guildDelete",
  run: async (client, guild) => {
    try {
      await Guild.findOneAndDelete({ id: guild.id });
      console.log(`Cr46 was removed from Guild with ID: ${guild.id}`);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
