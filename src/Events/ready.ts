import { MessageEmbed, TextChannel } from 'discord.js';
import { Event } from '../Interfaces';

import mongoose from 'mongoose';



export const event: Event = {
    name: 'ready',
    run: async (client) => {
        try {

            client.user.setActivity(
                process.env.NODE_ENV === 'production' ? '@Cr46' : 'Under Maintenance',
                { type: process.env.NODE_ENV === 'production' ? 'LISTENING' : 'WATCHING' }
            );

            console.log('Cr46 is Online!');
            const botCommandsChannel = await <Promise<TextChannel>>client.channels.fetch('931474316141416478');
            botCommandsChannel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Cr46 is Running in ${process.env.NODE_ENV} mode`)
                    .setColor('GREEN')]
            });

            mongoose.connect(process.env.DB_URI!, {});
            const db = mongoose.connection;
            db.once('error', () => console.log('Connection Error'));
            db.once('open', () => console.log('Database Connected'));

        } catch (error) { console.log(error.message) }
    }
}