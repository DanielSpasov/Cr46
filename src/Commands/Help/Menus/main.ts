import { MessageEmbed } from 'discord.js';



export default (message, prefix) => {
    message.channel.send({
        embeds: [
            new MessageEmbed()
                .setTitle('Bot Help Menus')
                .setColor('GREEN')
                .setDescription('`music`, `league`, `other`')
                .setFooter(`Type ${prefix}help <HelpMenu> for details on a command`)
        ]
    })
}