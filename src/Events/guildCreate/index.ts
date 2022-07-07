import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "guildCreate",
  run: async (client, guild) => {
    try {
      const guildChannels = await guild.channels.fetch();
      const channels = guildService.channels.format(client, guildChannels);
      await guildService.create(client, guild, channels);
      console.log(`Cr46 was added to Guild with ID: ${guild.id}.`);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
