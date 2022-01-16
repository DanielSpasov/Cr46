import { Event } from '../Interfaces';
import Guild from '../Models/Guild';



export const event: Event = {
    name: 'guildCreate',
    run: async (client, guild) => {
        try {

            const guildChannels = Array.from(await guild.channels.fetch())

            let channels = {
                text: [],
                voice: [],
                categories: []
            }
            for (const kvp of guildChannels) {
                const channel = {
                    id: kvp[1].id,
                    type: kvp[1].type,
                    name: kvp[1].name,
                    parent: kvp[1].parentId,
                    position: kvp[1].rawPosition
                }
                if (kvp[1].type === 'GUILD_VOICE') channels.voice.push(channel)
                if (kvp[1].type === 'GUILD_TEXT') channels.text.push(channel)
                if (kvp[1].type === 'GUILD_CATEGORY') channels.categories.push(channel)
            }

            const newGuild = await new Guild({
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                prefix: '/',
                channels: channels,
                validChannels: [],
                league: {
                    allowed: true
                },
                moveByActivity: {
                    allowed: false
                },
                roles: {
                    allowed: false,
                    channel: false
                },
                music: {
                    youtube: {
                        allowed: true,
                        playlists: false,
                    },
                    spotify: {
                        allowed: false,
                        playlists: false,
                        albums: false
                    },
                },
                gambling: {
                    allowed: false
                },
                voiceCommands: {
                    allowed: false
                },
            });
            if (!newGuild) return console.log(`Adding Cr46 to guild with ID: ${guild.id} failed`)
            await newGuild.save();

            console.log(`Cr46 was added to Guild with ID: ${guild.id}`);

        } catch (error) { console.log(error.message) }
    }
}