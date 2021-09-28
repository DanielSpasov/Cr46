import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';
import { videoPlayer } from './utils/videoPlayer';



export const command: Command = {
    name: 'skip',
    aliases: [],
    run: async (client, message, args) => {
        try {
            if (message.interaction === null) message.delete();
            const guild = client.music.guilds.get(message.guildId);
            guild.queue.shift();
            videoPlayer(client, guild.queue[0]);
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}