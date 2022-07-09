import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { TextChannel } from "discord.js";

export const getChannel = async (
  client: ExtendedClient,
  channelID?: string
): Promise<TextChannel> => {
  try {
    const _channelID = !channelID ? process.env.CONSOLE_CHANNEL_ID : channelID;
    const channel: TextChannel = await (<Promise<TextChannel>>(
      client.channels.fetch(_channelID)
    ));
    return channel;
  } catch (error) {
    errorHandler({ client, error });
  }
};
