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
    
            const command = interaction.customId;
            const guild = client.music.guilds.get(interaction.guildId);
    
            switch (command) {
                case 'resume-pause':
                    if (guild.isPaused) await resume.run(client, interaction, []);
                    else if (!guild.isPaused) await pause.run(client, interaction, []);
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