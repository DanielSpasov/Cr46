import { MessageEmbed, TextChannel } from 'discord.js';
import { Event } from '../Interfaces';



export const event: Event = {
    name: 'ready',
    run: async (client) => {
        try {
            console.log('Cr46 is Online!');
    
            client.user.setActivity(
                process.env.NODE_ENV === 'production' ? '@Cr46' : 'Under Maintenance',
                { type: process.env.NODE_ENV === 'production' ? 'LISTENING' : 'WATCHING' }
            );
    
            const botCommandsChannel = await <Promise<TextChannel>>client.channels.fetch(client.config.valid_channels[0]);
            botCommandsChannel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Cr46 is Running in ${process.env.NODE_ENV} mode`)
                    .setColor('#78ff66')]
            });
        } catch(error) { console.log(error.message) }
    }
}