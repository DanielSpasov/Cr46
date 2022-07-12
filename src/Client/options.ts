import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { Option } from "../Interfaces/Core/Command";

export const setupOptions = (
  command: SlashCommandBuilder | SlashCommandSubcommandBuilder,
  options: Option[]
) => {
  options.forEach((option) =>
    command[`add${option.type}Option`]((props) =>
      props
        .setName(option.name)
        .setDescription(option.description || "This option has no description.")
        .setRequired(option.required)
    )
  );
};
