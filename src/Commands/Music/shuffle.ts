import { Command } from '../../Interfaces';

import { loadChatPlayer } from './utils';



export const command: Command = {
    name: 'shuffle',
    aliases: [],
    run: async (client, message, args) => {
        try {
            if (message.interaction === null) message.delete();
            client.music.shuffle = !client.music.shuffle;
            await loadChatPlayer(client, message, true);
        } catch (error) { console.log(error) }
    }
}