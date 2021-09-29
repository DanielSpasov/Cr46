import { AudioPlayerStatus, createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';
import { loadChatPlayer } from '.';



export const idleListener = async (client, message) => {
    try {

        client.music.player.on(AudioPlayerStatus.Idle, async () => {

            const guild = client.music.guilds.get(message.guildId);
            guild.queue.shift();

            await loadChatPlayer(client, message, true);
            if (!guild.queue[0]) return;

            const nextSong = createAudioResource(ytdl(guild.queue[0].url, { filter: 'audioonly' }));
            client.music.player.play(nextSong);

        });

    } catch (error) { console.log(error.message) }
}