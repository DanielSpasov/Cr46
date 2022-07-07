import { Event } from "../../Interfaces";

import { command as pause } from "../../Commands/Music/pause";
import { command as resume } from "../../Commands/Music/resume";
import { command as skip } from "../../Commands/Music/skip";
import { command as loop } from "../../Commands/Music/loop";
import { command as shuffle } from "../../Commands/Music/shuffle";
import { command as clear } from "../../Commands/Music/clear";
import { command as disconnect } from "../../Commands/Music/disconnect";
import errorHandler from "../../Errors/handler";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    try {
      interaction.reply("\\\\\n");
      if (interaction.isCommand()) {
        client.commands
          .get(interaction.commandName)
          .run(client, interaction, []);
      } else if (interaction.isButton()) {
        const guild = client.music.guilds.get(interaction.guildId);
        const command = interaction.customId;

        if (guild.chatPlayer.id !== interaction.message.id) return;

        switch (command) {
          case "resume":
            await resume.run(client, interaction, []);
            break;
          case "pause":
            await pause.run(client, interaction, []);
            break;
          case "loop":
            await loop.run(client, interaction, []);
            break;
          case "shuffle":
            await shuffle.run(client, interaction, []);
            break;
          case "skip":
            await skip.run(client, interaction, []);
            break;
          case "clear":
            await clear.run(client, interaction, []);
            break;
          case "disconnect":
            await disconnect.run(client, interaction, []);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
