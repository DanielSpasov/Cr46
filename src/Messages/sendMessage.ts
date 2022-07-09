import { MessageEmbedOptions, TextChannel } from "discord.js";
import ExtendedClient from "../Client";
import { getChannel } from "../Services/Core/getChannel";

export const sendMessage = async ({
  client,
  channelID,
  embed,
}: {
  client: ExtendedClient;
  channelID?: string;
  embed: MessageEmbedOptions;
}) => {
  const channel: TextChannel = await getChannel(client, channelID);
  return await channel.send({ embeds: [embed] });
};
