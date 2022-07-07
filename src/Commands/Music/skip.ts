import { createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";

import { Command } from "../../Interfaces";

import { loadChatPlayer } from "./utils";

export const command: Command = {
  name: "skip",
  arguments: [],
  aliases: [],
  run: async (client, message, args) => {
    try {
      if (message.interaction === null) message.delete();

      const guild = await client.music.guilds.get(message.guildId);

      if (guild.looping === 0) guild.queue.shift();
      if (guild.looping === 2) guild.queue.push(guild.queue.shift());

      if (!guild.queue[0]) {
        guild.player.stop();
      } else {
        const resource = createAudioResource(
          ytdl(guild.queue[0].url, { filter: "audioonly" })
        );
        guild.isPaused = false;
        guild.player.play(resource);
      }

      await loadChatPlayer(client, message, true);
    } catch (error) {
      console.log(error.message);
    }
  },
};
