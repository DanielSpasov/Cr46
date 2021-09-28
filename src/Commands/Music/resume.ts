import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';



export const command: Command = {
    name: 'resume',
    aliases: [],
    run: async (client, message, args) => {
        try {
            await client.music.player.unpause();
            client.music.isPaused = false;
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}