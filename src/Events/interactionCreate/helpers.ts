import errorHandler from "../../Errors/handler";
import { Guild } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";

export const validateInteraction = (
  client: ExtendedClient,
  guild: Guild,
  channelID: string
) => {
  try {
    if (
      !guild.validChannels.includes(channelID) &&
      guild.validChannels.length
    ) {
      return false;
    }

    return true;
  } catch (error) {
    errorHandler({ client, error });
  }
};
