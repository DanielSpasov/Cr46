import { command as HelpMenu } from "../../Commands/Help/help";
import errorHandler from "../../Errors/handler";
import { Guild } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { Message } from "discord.js";

export const destructureMessage = (
  client: ExtendedClient,
  guild: Guild,
  content: string
) => {
  try {
    const args = content.slice(guild.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    return { cmd, args };
  } catch (error) {
    errorHandler({ client, error });
  }
};

export const validateMessage = async (
  client: ExtendedClient,
  guild: Guild,
  channelID: string,
  message: Message
) => {
  try {
    if (
      !guild.validChannels.includes(channelID) &&
      !!guild.validChannels.length
    )
      return false;
    if (message.mentions.users.get(client.user.id)) {
      HelpMenu.run(client, message, []);
      return false;
    }
    if (!message.content.startsWith(guild.prefix)) return false;
    return true;
  } catch (error) {
    errorHandler({ client, error });
  }
};
