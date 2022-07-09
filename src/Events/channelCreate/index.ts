import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";

export const event: Event = {
  name: "channelCreate",
  run: async (client, newChannel) => {
    try {
      await guildService.channels.create(client, newChannel);
      console.log(
        `${newChannel.type} with ID: ${newChannel.id} was CREATED in Guild with ID: ${newChannel.guildId}.`
      );
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
