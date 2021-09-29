import { AudioPlayerStatus, createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { loadChatPlayer } from '.';
import music from './music';



export const idleListener = async (client, message) => {
    try {

        client.music.player.on(AudioPlayerStatus.Idle, async () => {

            const guild = client.music.guilds.get(message.guildId);

            if (music.looping === 0) guild.queue.shift();
            if (music.looping === 1) { }
            if (music.looping === 2) {
                const firstSong = guild.queue.shift();
                guild.queue.push(firstSong);
            }

            await loadChatPlayer(client, message, true);

            if (!guild.queue[0]) {
                setTimeout(() => {
                    const hasQueuedSong = guild.queue[0] ? true : false;
                    if (!hasQueuedSong) {
                        client.music.connection.destroy();
                        client.music.connection = null;
                        client.music.player = null;
                    }
                }, 180000);
                return;
            };

            const nextSong = createAudioResource(ytdl(guild.queue[0].url, { filter: 'audioonly' }));
            client.music.player.play(nextSong);

        });

    } catch (error) { console.log(error.message) }
}