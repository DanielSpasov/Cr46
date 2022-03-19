import { MessageEmbed } from 'discord.js';



export const league = {
    main: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('League Commands')
                .setColor('BLUE')
                .setDescription('`check`')
                .setFooter(`Type ${prefix}help <CommandName> for details on a command`)]
        })
    },
    check: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('League Commands')
                .setColor('BLUE')
                .setDescription(`\`${prefix}check <AccountName> region:<Region(optional)>\` (Default region is EUW) - Displays information about that League of Legends account.\n
            \`${prefix}check Babus\` - Checks 'Babus' in EUW\n\`${prefix}check Yassuo region:na1\` - Checks 'Yassuo' in NA`)]
        })
    },
    checkNotAllowed: (message, prefix) => {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle('League Commands')
                .setColor('BLUE')
                .setDescription(`\`${prefix}check\` Command is not allowed in this server.\n
            if you have Administrator permissions, you can turn it on here: **Dashboard coming soon**`)]
        })
    },
}