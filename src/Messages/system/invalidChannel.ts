import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../Client";

export const invalidChannel = (client: ExtendedClient): MessageEmbedOptions => {
  return {
    description: `I'm not allowed to respond in this channel.`,
    color: "GREEN",
    timestamp: Date.now(),
    footer: {
      text: client.user.username,
      iconURL: client.config.bot_icon_url,
    },
  };
};
