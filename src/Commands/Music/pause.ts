import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';



export const command: Command = {
    name: 'pause',
    aliases: ['stop'],
    run: async (client, message, args) => {
        try {
            if (message.interaction === null) message.delete();
            client.music.player.pause();
            client.music.isPaused = true;
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}