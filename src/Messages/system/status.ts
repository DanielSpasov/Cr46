import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../Client";

export const status = (client: ExtendedClient): MessageEmbedOptions => {
  return {
    description: `<@${client.user.id}> is running in \`${process.env.NODE_ENV}\` mode.`,
    color: "GREEN",
    footer: {
      text: client.user.username,
      iconURL: client.user.avatarURL(),
    },
  };
};
