import axios from 'axios';

import { Event } from '../Interfaces';

import { command as pause } from '../Commands/Music/pause'
import { command as resume } from '../Commands/Music/resume'
import { command as skip } from '../Commands/Music/skip'
import { command as loop } from '../Commands/Music/loop'
import { command as shuffle } from '../Commands/Music/shuffle'



export const event: Event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        try {
            if (!interaction.isButton()) return;
    
            const cmd = interaction.customId;
    
            switch (cmd) {
                case 'resume-pause':
                    if (client.music.isPaused) await resume.run(client, interaction, []);
                    else if (!client.music.isPaused) await pause.run(client, interaction, []);
                    break;
                case 'loop': await loop.run(client, interaction, []); break;
                case 'shuffle': await shuffle.run(client, interaction, []); break;
                case 'skip': await skip.run(client, interaction, []); break;
                case 'clear':
    
                    break;
                default: break;
            }
    
            axios.post(`${client.config.interaction_url}/${interaction.id}/${interaction.token}/callback`, { type: 7 })
        } catch(error) { console.log(error.message) }
    }
}