import { Event } from '../Interfaces';
import Guild from '../Models/Guild';



export const event: Event = {
    name: 'channelCreate',
    run: async (client, channel) => {
        try {

            const clientGuilds = await client.guilds.fetch();
            const currentGuild = await clientGuilds.get(channel.guildId).fetch()
            const guildChannels = Array.from(await currentGuild.channels.fetch())

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

            await Guild.findOneAndUpdate({ id: currentGuild.id }, { channels: channels });

        } catch (error) { console.log(error.message) }
    }
}