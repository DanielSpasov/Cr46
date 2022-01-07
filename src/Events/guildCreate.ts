import { Event } from '../Interfaces';
import axios from 'axios';



export const event: Event = {
    name: 'guildCreate',
    run: async (client, guild) => {
        try {
            
            const req = await axios.post(`${process.env.API_URL}/guild`, {
                id: guild.id,
                icon: guild.icon,
                prefix: '/',
                validChannels: ['botspam'],
                leagueModule: true,
                tftModule: true,
                moveByActivityModule: false,
                rolesModule: false,
                music: {
                    youtubeModule: true,
                    spotifyModule: false,
                    soundcloudModule: false,
                },
                gamblingModule: false,
                voiceCommands: false,
            });

            if (req.data.status === 'CREATED') {
                console.log(`Cr46 was added to Guild with ID: ${guild.id}`);
            }

        } catch (error) { console.log(error.message) }
    }
}