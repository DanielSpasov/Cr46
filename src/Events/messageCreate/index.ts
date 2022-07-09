import { destructureMessage, validateMessage } from "./helpers";
import { Event, Command } from "../../Interfaces/Core";
import { Message, TextChannel } from "discord.js";
import errorHandler from "../../Errors/handler";
import Guild from "../../Database/Models/Guild";
import ExtendedClient from "../../Client";

export const event: Event = {
  name: "messageCreate",
  run: async (client: ExtendedClient, message: Message) => {
    try {
      if (message.author.bot) return;

      const channel = <TextChannel>message.channel;
      const guild = await Guild.findOne({ id: channel.guildId });

      const isValid = await validateMessage(client, guild, channel.id, message);
      if (!isValid) return;

      const { cmd, args } = destructureMessage(client, guild, message.content);
      if (!cmd) return;

      const command = client.commands.get(cmd) || client.aliases.get(cmd);
      if (command) (command as Command).run(client, message, args);
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
