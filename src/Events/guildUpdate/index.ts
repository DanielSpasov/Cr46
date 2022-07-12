import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Handlers/error";
import { Event } from "../../Interfaces/Core";
import { Guild as IGuild } from "discord.js";
import ExtendedClient from "../../Client";

export const event: Event = {
  name: "guildUpdate",
  run: async (client: ExtendedClient, oldGuild: IGuild, newGuild: IGuild) => {
    try {
      await Guild.findOneAndUpdate(
        { id: oldGuild.id },
        { id: newGuild.id, name: newGuild.name }
      );
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
