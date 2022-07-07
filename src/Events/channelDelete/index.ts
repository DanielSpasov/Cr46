import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces";

export const event: Event = {
  name: "channelDelete",
  run: async (client, deletedChannel) => {
    try {
      await guildService.channels.delete(client, deletedChannel);
      console.log(
        `${deletedChannel.type} with ID: ${deletedChannel.id} was DELETED from Guild with ID: ${deletedChannel.guildId}.`
      );
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
