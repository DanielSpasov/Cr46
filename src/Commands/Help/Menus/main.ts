import { MessageEmbed } from 'discord.js';

import config from '../../../config.json'



export default new MessageEmbed()
    .setTitle('Bot Help Menus')
    .setColor('GREEN')
    .setDescription('`music`, `league`, `other`')
    .setFooter(`Type ${config.prefix}help <HelpMenu> for details on a command`)