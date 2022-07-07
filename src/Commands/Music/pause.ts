import { Command } from "../../Interfaces";

import { loadChatPlayer } from "./utils";

export const command: Command = {
  name: "pause",
  arguments: [],
  aliases: ["stop"],
  run: async (client, message, args) => {
    try {
      const guild = await client.music.guilds.get(message.guildId);

      if (message.interaction === null) message.delete();

      guild.player.pause();
      guild.isPaused = true;

      await loadChatPlayer(client, message, true);
    } catch (error) {
      console.log(error);
    }
  },
};
