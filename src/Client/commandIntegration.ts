import { Routes } from "discord-api-types/v9";
import errorHandler from "../Errors/handler";
import { REST } from "@discordjs/rest";
import ExtendedClient from ".";
import { SlashCommandBuilder } from "@discordjs/builders";

const setupCommandIntegrations = async (client: ExtendedClient) => {
  try {
    const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

    const commands = client.commands.map((cmd) => {
      const command = new SlashCommandBuilder();
      command.setName(cmd.name);
      command.setDescription(
        cmd.description || "This command has no description"
      );

      if (cmd.arguments.length) {
        cmd.arguments.forEach((arg) =>
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

    const guilds = await client.guilds.fetch();
    guilds.forEach((guild) => {
      rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), {
        body: commands,
      });
    });
  } catch (error) {
    console.log(error);
    errorHandler(client, error);
  }
};
export default setupCommandIntegrations;
