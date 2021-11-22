import { AudioPlayerStatus, createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { loadChatPlayer } from '.';



export const idleListener = async (client, message) => {
    try {

        const guild = client.music.guilds.get(message.guildId);
        guild.player.on('error', (err) => console.log(`Audio Error, ${err.message}`))

        guild.player.on(AudioPlayerStatus.Idle, async () => {

            if (guild.looping === 0) guild.queue.shift();
            if (guild.looping === 2) guild.queue.push(guild.queue.shift());

            await loadChatPlayer(client, message, true);

            if (!guild.queue[0]) {
                setTimeout(() => {
                    const hasQueuedSong = guild.queue[0] ? true : false;
                    if (!hasQueuedSong) {
                        guild.connection.destroy();
                        guild.connection = null;
                        guild.player = null;
                    }
                }, 180000);
                return;
            };

            const nextSong = createAudioResource(ytdl(guild.queue[0].url, { filter: 'audioonly' }));
            guild.player.play(nextSong);

        });

    } catch (error) { console.log(error.message) }
}