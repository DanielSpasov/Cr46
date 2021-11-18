import { Event } from '../Interfaces';

import Guild from '../DB/Models/Guild';



export const event: Event = {
    name: 'guildCreate',
    run: async (client, guild) => {
        try {
            const newGuild = new Guild({ id: guild.id });
            await newGuild.save();
            console.log(`Cr46 was added to Guild with ID: ${guild.id}`);
        } catch (error) { console.log(error.message) }
    }
}