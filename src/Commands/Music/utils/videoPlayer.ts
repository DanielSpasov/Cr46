import { createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';



export const videoPlayer = async (client, video) => {
    try {
        const resource = createAudioResource(ytdl(video.url, { filter: 'audioonly' }));
        client.music.player.play(resource);
    } catch(error) { console.log(error) }
}