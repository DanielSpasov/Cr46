import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";
import { Guild as IGuild } from "discord.js";
import ExtendedClient from "../../Client";

export const event: Event = {
  name: "guildDelete",
  run: async (client: ExtendedClient, guild: IGuild) => {
    try {
      await Guild.findOneAndDelete({ id: guild.id });
      console.log(`Cr46 was removed from Guild with ID: ${guild.id}.`);
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
