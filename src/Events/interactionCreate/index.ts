import { Event } from "../../Interfaces";
import errorHandler from "../../Errors/handler";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    try {
      if (interaction.isCommand()) {
        await interaction.deferReply();
        const message = await client.commands
          .get(interaction.commandName)
          .run(client, interaction, []);
        if (!message) return await interaction.deleteReply();
        interaction.editReply({ embeds: [message] });
      }
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
