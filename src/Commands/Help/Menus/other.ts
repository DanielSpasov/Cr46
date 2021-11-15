import { MessageEmbed } from 'discord.js';

import config from '../../../config.json'



export const other = {
    main: new MessageEmbed()
        .setTitle('Other Commands')
        .setColor('AQUA')
        .setDescription('`ping`, `coinflip`')
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),

    ping: new MessageEmbed()
        .setTitle('Ping Command')
        .setColor('AQUA')
        .setDescription(`${config.prefix}ping - Shows the milisecons the bot takes to respond.`),

    coinflip: new MessageEmbed()
        .setTitle('Coinflip Command')
        .setColor('AQUA')
        .setDescription(`${config.prefix}coinflip <Heads>/<Tails> - The bot will flip a coin and decide your faith.`)
}