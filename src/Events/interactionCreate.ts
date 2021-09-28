import axios from 'axios';

import { Event } from '../Interfaces';

import { loadChatPlayer } from '../Commands/Music/utils';



export const event: Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {

        if (!interaction.isButton()) return;

        const cmd = interaction.customId;

        switch (cmd) {
            case 'resume':
                client.music.player.unpause();
                client.music.isPaused = !client.music.isPaused;
                break;
            case 'pause':
                client.music.player.pause();
                client.music.isPaused = !client.music.isPaused;
                break;
            case 'skip':

                break;
            case 'loop':

                break;
            case 'clear':

                break;
            default: break;
        }

        await loadChatPlayer(client, interaction, true);
        axios.post(`${client.config.interaction_url}/${interaction.id}/${interaction.token}/callback`, {
            type: 7
        })

    }
}