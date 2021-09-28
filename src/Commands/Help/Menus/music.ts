import { MessageEmbed } from 'discord.js';



export const music = {
    main: new MessageEmbed()
        .setTitle('Music Commands')
        .setColor('PURPLE')
        .setDescription('`play`, `skip`, `pause`, `resume`, `loop`, `shuffle`')
        .setFooter('Type /help <CommandName> for details on a command'),
    play: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription('/play <SongName>/<YouTubeLink> - The bot will join the channel and play the song for you.')
        .setFooter('Type /help <CommandName> for details on a command'),
    skip: new MessageEmbed()
        .setTitle('Skip Command')
        .setColor('PURPLE')
        .setDescription('/skip - Skips the current song.')
        .setFooter('Type /help <CommandName> for details on a command'),
    pause: new MessageEmbed()
        .setTitle('Pause Command')
        .setColor('PURPLE')
        .setDescription('/pause - Pauses the currently playing song.')
        .setFooter('Type /help <CommandName> for details on a command'),
    stop: new MessageEmbed()
        .setTitle('Stop Command')
        .setColor('PURPLE')
        .setDescription('/stop - Pauses the currently playing song.')
        .setFooter('Type /help <CommandName> for details on a command'),
    resume: new MessageEmbed()
        .setTitle('Resume Command')
        .setColor('PURPLE')
        .setDescription('/resume - Resumes the song if it is paused.')
        .setFooter('Type /help <CommandName> for details on a command'),
    unpause: new MessageEmbed()
        .setTitle('Unpause Command')
        .setColor('PURPLE')
        .setDescription('/unpause - Resumes the song if it is paused.')
        .setFooter('Type /help <CommandName> for details on a command'),
    loop: new MessageEmbed()
        .setTitle('Loop Command')
        .setColor('PURPLE')
        .setDescription('/loop - Toggles between looping the current song, the queue or disables looping.')
        .setFooter('Type /help <CommandName> for details on a command'),
    shuffle: new MessageEmbed()
        .setTitle('Shuffle Command')
        .setColor('PURPLE')
        .setDescription('/shuffle - Shuffles the queue.')
        .setFooter('Type /help <CommandName> for details on a command'),
}