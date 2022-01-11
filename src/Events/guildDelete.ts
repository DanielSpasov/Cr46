import { Event } from '../Interfaces';
import Guild from '../Models/Guild';



export const event: Event = {
    name: 'guildDelete',
    run: async (client, guild) => {
        try {

            const oldGuild = await Guild.findOneAndDelete({ id: guild.id });
            await oldGuild.save();

            console.log(`Cr46 was removed from Guild with ID: ${guild.id}`);
            
        } catch (error) { console.log(error.message) }
    }
}