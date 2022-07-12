import { SlashCommandBuilder } from "@discordjs/builders";
import { setupSubCommands } from "./subCommands";
import { Routes } from "discord-api-types/v9";
import errorHandler from "../Handlers/error";
import { setupOptions } from "./options";
import { REST } from "@discordjs/rest";
import ExtendedClient from ".";

const setupSlashCommands = async (client: ExtendedClient) => {
  try {
    const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

    const commands = client.commands.map((cmd) => {
      const command = new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description || "This command has no description.");

      setupSubCommands(command, cmd.subCommands);
      if (cmd.options.length) setupOptions(command, cmd.options);

      return command;
    });

    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });
  } catch (error) {
    errorHandler({ client, error });
  }
};

export default setupSlashCommands;
