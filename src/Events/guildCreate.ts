import { Event } from '../Interfaces';
import Guild from '../Models/Guild';



export const event: Event = {
    name: 'guildCreate',
    run: async (client, guild) => {
        try {

            const newGuild = await new Guild({
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
            if (!newGuild) return console.log(`Adding Cr46 to guild with ID: ${guild.id} failed`)
            await newGuild.save();

            console.log(`Cr46 was added to Guild with ID: ${guild.id}`);

        } catch (error) { console.log(error.message) }
    }
}