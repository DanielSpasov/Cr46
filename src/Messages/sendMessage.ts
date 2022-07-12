import { MessageEmbedOptions, TextChannel } from "discord.js";
import ExtendedClient from "../Client";

export const sendMessage = async ({
  client,
  channelID,
  embed,
}: {
  client: ExtendedClient;
  channelID?: string;
  embed: MessageEmbedOptions;
}) => {
  const _channelID = !channelID ? process.env.CONSOLE_CHANNEL_ID : channelID;
  const channel: TextChannel = await (<Promise<TextChannel>>(
    client.channels.fetch(_channelID)
  ));
  return await channel.send({ embeds: [embed] });
};
