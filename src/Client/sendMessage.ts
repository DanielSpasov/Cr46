import { Client, MessageEmbedOptions, TextChannel } from "discord.js";

import getChannel from "./getChannel";

interface SendMessageProps {
  client: Client;
  channelID?: string;
  embed: MessageEmbedOptions;
}

export const sendMessage = async ({
  client,
  channelID,
  embed,
}: SendMessageProps) => {
  const channel: TextChannel = await getChannel.text(client, channelID);
  await channel.send({ embeds: [embed] });
};
