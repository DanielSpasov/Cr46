import { Message, MessageEmbedOptions } from "discord.js";

export const editMessage = async ({
  message,
  embed,
}: {
  message: Message;
  embed: MessageEmbedOptions;
}) => {
  message.edit({ embeds: [{ ...message.embeds[0], ...embed }] });
};
