import { MessageEmbed } from 'discord.js';

import config from '../../../config.json'



export const league = {
    main: new MessageEmbed()
        .setTitle('League Commands')
        .setColor('BLUE')
        .setDescription('`check`')
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),

    check: new MessageEmbed()
        .setTitle('League Commands')
        .setColor('BLUE')
        .setDescription(`${config.prefix}check <AccountName> - Displays information about that League of Legends account.`)
        .setFooter(`Type ${config.prefix}help <CommandName> for details on a command`),
}