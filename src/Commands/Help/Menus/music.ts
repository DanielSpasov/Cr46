import { MessageEmbed } from 'discord.js';

import config from '../../../config.json'



export const music = {
    main: new MessageEmbed()
        .setTitle('Music Commands')
        .setColor('PURPLE')
        .setDescription('`play`, `p`, `skip`, `stop`, `pause`, `unpause`, `resume`, `loop`, `shuffle`')
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    play: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}play <SongName>/<YouTubeLink> - The bot will join the channel and play the song for you.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    p: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}p <SongName>/<YouTubeLink> - The bot will join the channel and play the song for you.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    skip: new MessageEmbed()
        .setTitle('Skip Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}skip - Skips the current song.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    pause: new MessageEmbed()
        .setTitle('Pause Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}pause - Pauses the currently playing song.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    stop: new MessageEmbed()
        .setTitle('Stop Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}stop - Pauses the currently playing song.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    resume: new MessageEmbed()
        .setTitle('Resume Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}resume - Resumes the song if it is paused.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    unpause: new MessageEmbed()
        .setTitle('Unpause Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}unpause - Resumes the song if it is paused.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    loop: new MessageEmbed()
        .setTitle('Loop Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}loop - Toggles between looping the current song, the queue or disables looping.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    shuffle: new MessageEmbed()
        .setTitle('Shuffle Command')
        .setColor('PURPLE')
        .setDescription(`${config.prefix}shuffle - Shuffles the queue.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
}