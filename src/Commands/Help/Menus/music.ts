import { MessageEmbed } from 'discord.js';



export const music = {
    main: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Music Commands')
                .setColor('PURPLE')
                .setDescription('`play`, `p`, `skip`, `stop`, `pause`, `unpause`, `resume`, `loop`, `shuffle`, `disconnect`, `dc`, `clear`, `c`')
                .setFooter(`Type ${prefix}help <CommandName> for details on a command`)]
        })
    },
    play: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Play Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}play <SongName>/<YouTubeLink>\` - The bot will join the channel and play the song for you.`)]
        })
    },
    p: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Play Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}p <SongName>/<YouTubeLink>\` - The bot will join the channel and play the song for you.`)]
        })
    },
    skip: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Skip Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}skip\` - Skips the current song.`)]
        })
    },
    pause: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Pause Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}pause\` - Pauses the currently playing song.`)]
        })
    },
    stop: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Stop Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}stop\` - Pauses the currently playing song.`)]
        })
    },
    resume: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Resume Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}resume\` - Resumes the song if it is paused.`)]
        })
    },
    unpause: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Unpause Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}unpause\` - Resumes the song if it is paused.`)]
        })
    },
    loop: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Loop Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}loop\` - Toggles between looping the current song, the queue or disables looping.`)]
        })
    },
    shuffle: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Shuffle Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}shuffle\` - Shuffles the queue.`)]
        })
    },
    disconnect: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Disconnect Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}disconncet\` - Disconnects the bot from the Voice Channel.`)]
        })
    },
    dc: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Disconnect Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}dc\` - Disconnects the bot from the Voice Channel.`)]
        })
    },
    clear: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Clear Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}clear\` - Clears the queue.`)]
        })
    },
    c: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('Clear Command')
                .setColor('PURPLE')
                .setDescription(`\`${prefix}c\` - Clears the queue.`)]
        })
    },
}