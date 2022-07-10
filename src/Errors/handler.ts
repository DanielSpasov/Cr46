import { Interaction } from "../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../Client";
import { message } from "../Messages";

export default async function errorHandler({
  client,
  interaction,
  error,
  module,
}: {
  client: ExtendedClient;
  interaction?: Interaction;
  error?: any;
  module?: string | undefined;
}) {
  const type = module || error.type || "Unknown";
  const code =
    error?.response?.data?.status?.status_code ||
    error?.error_code ||
    error?.status_code ||
    500;
  const messageContent =
    error?.response?.data?.status?.message ||
    error?.message ||
    error?.error?.message ||
    error?.err?.message ||
    "No Message was provided";
  const channelID = error?.channelID || process.env.CONSOLE_CHANNEL_ID;

  const errorEmbed: MessageEmbedOptions = {
    author: {
      name: `${type} Error`,
      iconURL: client?.config?.bot_icon_url,
    },
    footer: {
      text: `Error Code: ${code}`,
    },
    color: "RED",
    description: messageContent,
  };
  if (!interaction) {
    message.send({ client, embed: errorEmbed, channelID });
  } else {
    interaction.editReply({ embeds: [errorEmbed] });
  }
  return;
}
