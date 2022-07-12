import { MessageEmbedOptions } from "discord.js";
import { Interaction } from "../Interfaces/Core";
import ExtendedClient from "../Client";

const handleSubCommand = (
  client: ExtendedClient,
  interaction: Interaction
): Promise<MessageEmbedOptions> => {
  return client.commands
    .get(interaction.commandName)
    .subCommands.get(interaction.options._subcommand)
    .run(client, interaction);
};

export default handleSubCommand;
