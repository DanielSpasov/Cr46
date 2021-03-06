import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Handlers/error";
import { Event } from "../../Interfaces/Core";
import { Guild as IGuild } from "discord.js";
import ExtendedClient from "../../Client";

export const event: Event = {
  name: "guildCreate",
  run: async (client: ExtendedClient, guild: IGuild) => {
    try {
      const newGuild = await new Guild({
        id: guild.id,
        name: guild.name,
        validChannels: [],
        users: [],
      });
      await newGuild.save();
      console.log(`Cr46 was added to Guild with ID: ${guild.id}.`);
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
