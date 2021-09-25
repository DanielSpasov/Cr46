import { MessageEmbed } from 'discord.js';



export const league = {
    main: new MessageEmbed()
        .setTitle('League Commands')
        .setColor('BLUE')
        .setDescription('`check`')
        .setFooter('Type /help <CommandName> for details on a command'),

    check: new MessageEmbed()
        .setTitle('League Commands')
        .setColor('BLUE')
        .setDescription('/check <AccountName> - Displays information about that League of Legends account.')
        .setFooter('Type /help <CommandName> for details on a command'),
}