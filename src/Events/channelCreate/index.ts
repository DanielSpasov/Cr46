import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "channelCreate",
  run: async (client, newChannel) => {
    try {
      const clientGuilds = await client.guilds.fetch();
      const guild = await clientGuilds.get(newChannel.guildId).fetch();
      await guildService.channels.create(client, newChannel, guild.id);
      console.log(
        `${newChannel.type} with ID: ${newChannel.id} was CREATED in Guild with ID: ${guild.id}`
      );
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
