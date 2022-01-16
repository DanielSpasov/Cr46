import { Command } from '../../Interfaces';
import { menus as HelpMenus } from './Menus';

import Guild from '../../Models/Guild';



export const command: Command = {
    name: 'help',
    aliases: [],
    run: async (client, message, args) => {
        try {

            const guildPrefix = await (await Guild.findOne({ id: message.guildId })).prefix;

            if (!message.content.startsWith(guildPrefix)) return HelpMenus.main(message, guildPrefix);
            if (!args[0]) return HelpMenus.main(message, guildPrefix);

            const type = args.shift().toLowerCase()

            switch (type) {

                case 'music': HelpMenus.music.main(message, guildPrefix); break
                case 'play': HelpMenus.music.play(message, guildPrefix); break
                case 'p': HelpMenus.music.p(message, guildPrefix); break
                case 'skip': HelpMenus.music.skip(message, guildPrefix); break
                case 'pause': HelpMenus.music.pause(message, guildPrefix); break
                case 'stop': HelpMenus.music.stop(message, guildPrefix); break
                case 'resume': HelpMenus.music.resume(message, guildPrefix); break
                case 'unpause': HelpMenus.music.unpause(message, guildPrefix); break
                case 'loop': HelpMenus.music.loop(message, guildPrefix); break
                case 'shuffle': HelpMenus.music.shuffle(message, guildPrefix); break
                case 'disconnect': HelpMenus.music.disconnect(message, guildPrefix); break
                case 'dc': HelpMenus.music.dc(message, guildPrefix); break
                case 'clear': HelpMenus.music.clear(message, guildPrefix); break
                case 'c': HelpMenus.music.c(message, guildPrefix); break

                case 'league': HelpMenus.league.main(message, guildPrefix); break
                case 'check': HelpMenus.league.check(message, guildPrefix); break

                case 'other': HelpMenus.other.main(message, guildPrefix); break
                case 'ping': HelpMenus.other.ping(message, guildPrefix); break
                case 'coinflip': HelpMenus.other.coinflip(message, guildPrefix); break
                case 'rockpaperscissors': HelpMenus.other.rockpaperscissors(message, guildPrefix); break
                case 'rps': HelpMenus.other.rps(message, guildPrefix); break

                default: HelpMenus.main(message, guildPrefix); break
            }

        } catch (error) { console.log(error) }
    }
}