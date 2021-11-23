import { MessageEmbed } from 'discord.js';

import config from '../../../config.json'



export const music = {
    main: new MessageEmbed()
        .setTitle('Music Commands')
        .setColor('PURPLE')
        .setDescription('`play`, `p`, `skip`, `stop`, `pause`, `unpause`, `resume`, `loop`, `shuffle`, `disconnect`, `dc`, `clear`, `c`')
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
    play: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}play <SongName>/<YouTubeLink>\` - The bot will join the channel and play the song for you.`),
    p: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}p <SongName>/<YouTubeLink>\` - The bot will join the channel and play the song for you.`),
    skip: new MessageEmbed()
        .setTitle('Skip Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}skip\` - Skips the current song.`),
    pause: new MessageEmbed()
        .setTitle('Pause Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}pause\` - Pauses the currently playing song.`),
    stop: new MessageEmbed()
        .setTitle('Stop Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}stop\` - Pauses the currently playing song.`),
    resume: new MessageEmbed()
        .setTitle('Resume Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}resume\` - Resumes the song if it is paused.`),
    unpause: new MessageEmbed()
        .setTitle('Unpause Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}unpause\` - Resumes the song if it is paused.`),
    loop: new MessageEmbed()
        .setTitle('Loop Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}loop\` - Toggles between looping the current song, the queue or disables looping.`),
    shuffle: new MessageEmbed()
        .setTitle('Shuffle Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}shuffle\` - Shuffles the queue.`),
    disconnect: new MessageEmbed()
        .setTitle('Disconnect Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}disconncet\` - Disconnects the bot from the Voice Channel.`),
    dc: new MessageEmbed()
        .setTitle('Disconnect Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}dc\` - Disconnects the bot from the Voice Channel.`),
    clear: new MessageEmbed()
        .setTitle('Clear Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}clear\` - Clears the queue.`),
    c: new MessageEmbed()
        .setTitle('Clear Command')
        .setColor('PURPLE')
        .setDescription(`\`${config.prefix}c\` - Clears the queue.`),
}