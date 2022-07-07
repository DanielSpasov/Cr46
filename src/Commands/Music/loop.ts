import { Command } from "../../Interfaces";

import { loadChatPlayer } from "./utils";

export const command: Command = {
  name: "loop",
  arguments: [],
  aliases: [],
  run: async (client, message, args) => {
    try {
      const guild = await client.music.guilds.get(message.guildId);

      if (message.interaction === null) message.delete();
      if (guild.looping === 2) guild.looping = 0;
      else guild.looping += 1;

      await loadChatPlayer(client, message, true);
    } catch (error) {
      console.log(error);
    }
  },
};
