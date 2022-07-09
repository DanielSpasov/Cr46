import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";

export const event: Event = {
  name: "channelUpdate",
  run: async (client, _, newChannel) => {
    try {
      await guildService.channels.update(client, newChannel);
      console.log(`${newChannel.type} with ID: ${newChannel.id} was UPDATED.`);
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
