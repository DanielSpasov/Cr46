import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';



export const command: Command = {
    name: 'loop',
    aliases: [],
    run: async (client, message, args) => {
        try {
            if (client.music.looping === 2) client.music.looping = 0;
            else client.music.looping += 1;
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}