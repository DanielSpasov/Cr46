import { MessageEmbed } from 'discord.js';

import { Command } from '../../Interfaces';

import Guild from '../../Models/Guild';

import { menus } from '../Help/Menus';



export const command: Command = {
    name: 'binary',
    aliases: [],
    run: async (client, message, args) => {
        try {

            const guild = await Guild.findOne({ id: message.guildId });

            if (!args[0]) menus.other.binary(message, guild.prefix);

            const convertToNumber = (code: string): number => {
                let sum: number = 0;
                for (let i = 0; i < code.split('').reverse().join('').length; i++) {
                    sum += Number(code.split('').reverse().join('')[i]) * Math.pow(2, i);
                }
                return sum - 1;
            }

            const alphabet = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ]

            let result: string = '';
            for (let i = 0; i < args.length; i++) {
                if (args[i].slice(0, 3) === '010') {
                    result += alphabet[convertToNumber(args[i].slice(3, 8))].toUpperCase();
                } else if (args[i].slice(0, 3) === '011') {
                    result += alphabet[convertToNumber(args[i].slice(3, 8))].toLowerCase();
                } else {
                    result += ' ';
                }
            }

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Binary Translator')
                        .setDescription(result)
                        .setColor('BLURPLE')
                ]
            })

        } catch (error) { console.log(error) }
    }
}