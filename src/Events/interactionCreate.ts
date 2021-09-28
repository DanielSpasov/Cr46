import axios from 'axios';

import { Event } from '../Interfaces';

import { command as pause } from '../Commands/Music/pause'
import { command as resume } from '../Commands/Music/resume'
import { command as loop } from '../Commands/Music/loop'



export const event: Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {

        if (!interaction.isButton()) return;

        const cmd = interaction.customId;

        switch (cmd) {
            case 'resume-pause':
                if (client.music.isPaused) await resume.run(client, interaction, []);
                else if (!client.music.isPaused) await pause.run(client, interaction, []);
                break;
            case 'loop': await loop.run(client, interaction, []); break;
            case 'skip':

                break;
            case 'clear':

                break;
            case 'shuffle':

                break;
            default: break;
        }

        axios.post(`${client.config.interaction_url}/${interaction.id}/${interaction.token}/callback`, { type: 7 })

    }
}