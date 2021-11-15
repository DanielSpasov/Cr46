import { MessageEmbed, TextChannel } from 'discord.js';
import { Event } from '../Interfaces';
import connectDB from '../DB/config';



export const event: Event = {
    name: 'ready',
    run: async (client) => {
        try {

            client.user.setActivity(
                process.env.NODE_ENV === 'production' ? '@Cr46' : 'Under Maintenance',
                { type: process.env.NODE_ENV === 'production' ? 'LISTENING' : 'WATCHING' }
            );

            connectDB();

            console.log('Cr46 is Online!');
            const botCommandsChannel = await <Promise<TextChannel>>client.channels.fetch(client.config.valid_channels[0]);
            botCommandsChannel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Cr46 is Running in ${process.env.NODE_ENV} mode`)
                    .setColor('GREEN')]
            });

        } catch (error) { console.log(error.message) }
    }
}