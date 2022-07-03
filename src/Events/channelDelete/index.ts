import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "channelDelete",
  run: async (client, deletedChannel) => {
    try {
      const clientGuilds = await client.guilds.fetch();
      const guild = await clientGuilds.get(deletedChannel.guildId).fetch();
      await guildService.channels.delete(client, deletedChannel, guild.id);
      console.log(
        `${deletedChannel.type} with ID: ${deletedChannel.id} was DELETED from Guild with ID: ${guild.id}`
      );
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
