import { MessageEmbed } from 'discord.js';



export const other = {
    main: new MessageEmbed()
        .setTitle('Other Commands')
        .setColor('AQUA')
        .setDescription('`ping`, `coinflip`')
        .setFooter('Type /help <CommandName> for details on a command'),

    ping: new MessageEmbed()
        .setTitle('Ping Command')
        .setColor('AQUA')
        .setDescription('/ping - Shows the milisecons the bot takes to respond.'),

    coinflip: new MessageEmbed()
        .setTitle('Coinflip Command')
        .setColor('AQUA')
        .setDescription('/coinflip <Heads>/<Tails> - The bot will flip a coin and decide your faith.')
}