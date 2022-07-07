import { Command } from "../../Interfaces";

import { loadChatPlayer } from "./utils";

export const command: Command = {
  name: "disconnect",
  arguments: [],
  aliases: ["dc"],
  run: async (client, message, args) => {
    try {
      const guild = await client.music.guilds.get(message.guildId);

      if (message.interaction === null) message.delete();

      guild.queue = [];
      guild.player.stop();
      guild.player = null;
      guild.connection.destroy();
      guild.connection = null;

      await loadChatPlayer(client, message, true);
    } catch (error) {
      console.log(error);
    }
  },
};
