import { MessageEmbed } from 'discord.js';



export const other = {
    main: new MessageEmbed()
        .setTitle('Other Commands')
        .setColor('AQUA')
        .setDescription('`ping`')
        .setFooter('Type /help <CommandName> for details on a command'),

    ping: new MessageEmbed()
        .setTitle('Ping Command')
        .setColor('AQUA')
        .setDescription('/ping - Shows the milisecons the bot takes to respond.')
}