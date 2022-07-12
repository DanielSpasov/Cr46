import { SlashCommandBuilder } from "@discordjs/builders";
import { Routes } from "discord-api-types/v9";
import errorHandler from "../Errors/handler";
import { REST } from "@discordjs/rest";
import ExtendedClient from ".";

const setupSlashCommands = async (client: ExtendedClient) => {
  try {
    const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

    const commands = client.commands.map((cmd) => {
      const command = new SlashCommandBuilder();
      command.setName(cmd.name);
      command.setDescription(
        cmd.description || "This command has no description"
      );

      if (cmd.options.length) {
        cmd.options.forEach((arg) =>
          command.addStringOption((option) =>
            option
              .setName(arg.name)
              .setDescription(
                arg.description || "This argument has no description"
              )
              .setRequired(arg.required)
          )
        );
      }

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
