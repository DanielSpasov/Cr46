import { Command } from "../../Interfaces";

import { loadChatPlayer } from "./utils";

export const command: Command = {
  name: "resume",
  arguments: [],
  aliases: ["unpause"],
  run: async (client, message, args) => {
    try {
      const guild = await client.music.guilds.get(message.guildId);

      if (message.interaction === null) message.delete();

      guild.player.unpause();
      guild.isPaused = false;

      await loadChatPlayer(client, message, true);
    } catch (error) {
      console.log(error);
    }
  },
};
