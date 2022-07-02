import { Client, Message, TextChannel } from "discord.js";
import ExtendedClient from "../../Client";

import { command as HelpMenu } from "../../Commands/Help/help";
import errorHandler from "../../Errors/handler";
import { IGuild } from "../../Interfaces/IGuild";

export const destructureMessage = (
  client: Client,
  guild: IGuild,
  content: string
) => {
  try {
    const args = content.slice(guild.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    return { cmd, args };
  } catch (err) {
    errorHandler(client, err);
  }
};

export const validateMessage = async (
  client: ExtendedClient,
  guild: IGuild,
  channelID: string,
  message: Message
) => {
  try {
    if (!guild.validChannels.includes(channelID)) return false;
    if (message.mentions.users.get(client.user.id)) {
      HelpMenu.run(client, message, []);
      return false;
    }
    if (!message.content.startsWith(guild.prefix)) return false;
    return true;
  } catch (error) {
    errorHandler(client, error);
  }
};
