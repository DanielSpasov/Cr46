import { SlashCommandBuilder } from "@discordjs/builders";
import { SubCommand } from "../Interfaces/Core/Command";
import { setupOptions } from "./options";
import { Collection } from "discord.js";

export const setupSubCommands = (
  command: SlashCommandBuilder,
  subCommands: Collection<string, SubCommand>
) => {
  subCommands.forEach((subCmd) =>
    command.addSubcommand((subcommand) => {
      subcommand
        .setName(subCmd.name)
        .setDescription(
          subCmd.description || "This command has no description."
        );

      if (subCmd.options.length) setupOptions(subcommand, subCmd.options);
      return subcommand;
    })
  );
};
