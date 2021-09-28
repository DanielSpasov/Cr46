import axios from 'axios';

import { Event } from '../Interfaces';

import { command as pause } from '../Commands/Music/pause'
import { command as resume } from '../Commands/Music/resume'



export const event: Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {

        if (!interaction.isButton()) return;

        const cmd = interaction.customId;

        switch (cmd) {
            case 'resume': resume.run(client, interaction, []); break;
            case 'pause': pause.run(client, interaction, []); break;
            case 'skip':

                break;
            case 'loop':

                break;
            case 'clear':

                break;
            default: break;
        }

        axios.post(`${client.config.interaction_url}/${interaction.id}/${interaction.token}/callback`, {
            type: 7
        })

    }
}