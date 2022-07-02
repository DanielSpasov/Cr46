import { Event } from "../../Interfaces";
import { createGuild } from "./createGuild";
import { formatGuildChannels } from "./helpers";
import errorHandler from "../../Errors/handler";

export const event: Event = {
  name: "guildCreate",
  run: async (client, guild) => {
    try {
      const guildChannels = await guild.channels.fetch();
      const channels = formatGuildChannels(client, guildChannels);
      const craetedGuild = await createGuild(client, guild, channels);
      if (!craetedGuild) {
        throw {
          type: "Database Error",
          message: `Failed to add Cr46 in guild with ID: ${guild.id}.`,
          error_code: 400,
        };
      }
      console.log(`Cr46 was added to Guild with ID: ${guild.id}`);
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
