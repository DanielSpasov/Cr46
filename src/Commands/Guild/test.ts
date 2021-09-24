import { MessageEmbed } from 'discord.js';

import { Command } from '../../Interfaces';



export const command: Command = {
    name: 'test',
    aliases: [],
    run: async (client, message, args) => {
        try {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Cr46 is Running in ${process.env.NODE_ENV} mode`)
                        .setColor('#78ff66')
                ]
            });
        } catch (error) { console.log(error) }
    }
}