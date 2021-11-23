import { Command } from '../../Interfaces';

import { menus as HelpMenus } from './Menus';



export const command: Command = {
    name: 'help',
    aliases: [],
    run: async (client, message, args) => {
        try {

            if (!message.content.startsWith(client.config.prefix)) return message.channel.send({ embeds: [HelpMenus.main] });
            if (!args[0]) return message.channel.send({ embeds: [HelpMenus.main] });

            const type = args.shift().toLowerCase()

            switch (type) {

                case 'music': message.channel.send({ embeds: [HelpMenus.music.main] }); break
                case 'play': message.channel.send({ embeds: [HelpMenus.music.play] }); break
                case 'p': message.channel.send({ embeds: [HelpMenus.music.p] }); break
                case 'skip': message.channel.send({ embeds: [HelpMenus.music.skip] }); break
                case 'pause': message.channel.send({ embeds: [HelpMenus.music.pause] }); break
                case 'stop': message.channel.send({ embeds: [HelpMenus.music.stop] }); break
                case 'resume': message.channel.send({ embeds: [HelpMenus.music.resume] }); break
                case 'unpause': message.channel.send({ embeds: [HelpMenus.music.unpause] }); break
                case 'loop': message.channel.send({ embeds: [HelpMenus.music.loop] }); break
                case 'shuffle': message.channel.send({ embeds: [HelpMenus.music.shuffle] }); break
                case 'disconnect': message.channel.send({ embeds: [HelpMenus.music.disconnect] }); break
                case 'dc': message.channel.send({ embeds: [HelpMenus.music.dc] }); break
                case 'clear': message.channel.send({ embeds: [HelpMenus.music.clear] }); break
                case 'c': message.channel.send({ embeds: [HelpMenus.music.c] }); break

                case 'league': message.channel.send({ embeds: [HelpMenus.league.main] }); break
                case 'check': message.channel.send({ embeds: [HelpMenus.league.check] }); break

                case 'other': message.channel.send({ embeds: [HelpMenus.other.main] }); break
                case 'ping': message.channel.send({ embeds: [HelpMenus.other.ping] }); break
                case 'coinflip': message.channel.send({ embeds: [HelpMenus.other.coinflip] }); break

                default: message.channel.send({ embeds: [HelpMenus.main] }); break
            }

        } catch (error) { console.log(error) }
    }
}