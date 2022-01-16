import { Event, Command } from '../Interfaces';
import { Message, TextChannel } from 'discord.js';

import { command as MainMenu } from '../Commands/Help/help';

import Guild from '../Models/Guild';



export const event: Event = {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        try {

            const channel = <TextChannel>message.channel;
            const guild = await Guild.findOne({ id: channel.guildId });

            if (message.author.bot) return;
            if (guild.validChannels.length && !guild.validChannels.includes(channel.id)) return;
            if (message.mentions.users.get('890877562404884531')) return MainMenu.run(client, message, []);
            if (!message.content.startsWith(guild.prefix)) return;

            const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (!cmd) return;

            const command = client.commands.get(cmd) || client.aliases.get(cmd);
            if (command) (command as Command).run(client, message, args);
        } catch (error) { console.log(error.message) }
    }
}