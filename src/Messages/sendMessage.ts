import { Client, MessageEmbedOptions, TextChannel } from "discord.js";
import { getChannel } from "../Services/Core/getChannel";

export const sendMessage = async ({
  client,
  channelID,
  embed,
}: {
  client: Client;
  channelID?: string;
  embed: MessageEmbedOptions;
}) => {
  const channel: TextChannel = await getChannel.text(client, channelID);
  return await channel.send({ embeds: [embed] });
};
