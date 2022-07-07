import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "guildDelete",
  run: async (client, guild) => {
    try {
      await guildService.delete(client, guild.id);
      console.log(`Cr46 was removed from Guild with ID: ${guild.id}.`);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
