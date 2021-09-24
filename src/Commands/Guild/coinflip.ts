import { MessageEmbed } from 'discord.js';

import { Command } from '../../Interfaces';



export const command: Command = {
    name: 'coinflip',
    aliases: [],
    run: async (client, message, args) => {
        try {

            const userChoice = args[0].toLowerCase()
            const botChoice = ['Heads', 'Tails'][Math.floor(Math.random() * 2)].toLowerCase()

            const outputMessage = new MessageEmbed()
                .setTitle(botChoice)
                .setColor(userChoice === botChoice ? 'GREEN' : 'RED')
                .setFooter(userChoice === botChoice ? 'You win!' : 'You lose!')

            message.channel.send({ embeds: [outputMessage] });

        } catch (error) { console.log(error) }
    }
}