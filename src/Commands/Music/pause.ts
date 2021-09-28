import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';



export const command: Command = {
    name: 'pause',
    aliases: [],
    run: async (client, message, args) => {
        try {
            await client.music.player.pause();
            client.music.isPaused = true;
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}