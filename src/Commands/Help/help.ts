import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

import { Command } from '../../Interfaces';

import { menus as HelpMenus } from './Menus';



export const command: Command = {
    name: 'help',
    aliases: [],
    run: async (client, message, args) => {
        try {

            if (!message.content.startsWith(client.config.prefix)) return message.channel.send({ embeds: [HelpMenus.main] });
    
            const type = args.shift().toLowerCase()
    
            switch (type) {
    
                case 'music': message.channel.send({ embeds: [HelpMenus.music.main] }); break
    
                case 'league': message.channel.send({ embeds: [HelpMenus.league.main] }); break
    
                case 'other': message.channel.send({ embeds: [HelpMenus.other.main] }); break
                case 'ping': message.channel.send({ embeds: [HelpMenus.other.ping] }); break
    
                default: message.channel.send({ embeds: [HelpMenus.main] }); break
            }

        } catch(error) { console.log(error) }
    }
}