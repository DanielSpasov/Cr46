import ExtendedClient from "../Client";
import { message } from "../Messages";

export default async function errorHandler({
  client,
  error,
  module,
}: {
  client: ExtendedClient;
  error?: any;
  module?: string | undefined;
}) {
  const type = module || error.type || "Unknown";
  const code =
    error.error_code ||
    error.status_code ||
    error.response.data.status.status_code ||
    500;
  const messageContent =
    error.message ||
    error.response.data.status.message ||
    error.error.message ||
    error.err.message ||
    "No Message was provided";
  const channelID = error.channelID || process.env.CONSOLE_CHANNEL_ID;
  message.send({
    client,
    embed: {
      author: {
        name: `${type} Error`,
        iconURL: client.config.bot_icon_url,
      },
      footer: {
        text: `Error Code: ${code}`,
      },
      color: "RED",
      description: messageContent,
    },
    channelID,
  });
  return;
}
