import { MessageEmbed } from 'discord.js';



export const music = {
    main: new MessageEmbed()
        .setTitle('Music Commands')
        .setColor('PURPLE')
        .setDescription('`play`, `pause`, `resume`')
        .setFooter('Type /help <CommandName> for details on a command'),
    play: new MessageEmbed()
        .setTitle('Play Command')
        .setColor('PURPLE')
        .setDescription('/play <SongName>/<YouTubeLink> - The bot will join the channel and play the song for you.')
        .setFooter('Type /help <CommandName> for details on a command'),
    pause: new MessageEmbed()
        .setTitle('Pause Command')
        .setColor('PURPLE')
        .setDescription('/pause - Pauses the currently playing song.')
        .setFooter('Type /help <CommandName> for details on a command'),
    resume: new MessageEmbed()
        .setTitle('Resume Command')
        .setColor('PURPLE')
        .setDescription('/resume - Resumes the song if it is paused.')
        .setFooter('Type /help <CommandName> for details on a command'),
}