import { MessageEmbed } from 'discord.js';



export const other = {
    main: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Other Commands')
                .setColor('AQUA')
                .setDescription('`ping`, `coinflip`, `rps`, `rockpaperscissors`')
                .setFooter(`Type ${prefix}help <CommandName> for details on a command`)]
        })
    },
    ping: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Ping Command')
                .setColor('AQUA')
                .setDescription(`\`${prefix}ping\` - Shows the milisecons the bot takes to respond.`)]
        })
    },
    coinflip: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Coinflip Command')
                .setColor('AQUA')
                .setDescription(`\`${prefix}coinflip <Heads>/<Tails>\` - The bot will flip a coin and decide your faith.`)]
        })
    },
    rps: (message, prefix) => {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Rock Paper Scissors Command')
                    .setColor('AQUA')
                    .setDescription(`\`${prefix}rps <Rock>/<Paper>/<Scissors>\` - Play rock paper scissors with Cr46.`),
            ]
        })
    },
    rockpaperscissors: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Rock Paper Scissors Command')
                .setColor('AQUA')
                .setDescription(`\`${prefix}rockpaperscissors <Rock>/<Paper>/<Scissors>\` - Play rock paper scissors with Cr46.`)
            ]
        })
    },
    binary: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Binary Translator')
                .setColor('AQUA')
                .setDescription(`\`${prefix}binary <Bianry Code>\` - Translates the binary code to Text, Decimal number and Hex number.`)
            ]
        })
    }
}