import { createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';
import music from './utils/music';



export const command: Command = {
    name: 'skip',
    aliases: [],
    run: async (client, message, args) => {
        try {

            if (message.interaction === null) message.delete();

            const guild = client.music.guilds.get(message.guildId);

            if (music.looping === 0) guild.queue.shift();
            if (music.looping === 1) { }
            if (music.looping === 2) {
                const firstSong = guild.queue.shift();
                guild.queue.push(firstSong);
            }

            if (!guild.queue[0]) {
                client.music.player.stop();
            } else {
                const resource = createAudioResource(ytdl(guild.queue[0].url, { filter: 'audioonly' }));
                client.music.player.play(resource);
            }

            await loadChatPlayer(client, message, true);

        } catch (error) { console.log(error.message) }
    }
}