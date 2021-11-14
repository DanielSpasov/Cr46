import { Event, Command } from '../Interfaces';
import { Message } from 'discord.js';

import { command as MainMenu } from '../Commands/Help/help';



export const event: Event = {
    name: 'messageCreate',
    run: (client, message: Message) => {
        try {
            if (!client.config.valid_channels.includes(message.channel.id)) return;
            if (message.author.bot) return;
            if (message.mentions.users.get('890877562404884531')) return MainMenu.run(client, message, []);
            if (!message.content.startsWith(client.config.prefix)) return;
            
            const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (!cmd) return;
            
            const command = client.commands.get(cmd) || client.aliases.get(cmd);
            if (command) (command as Command).run(client, message, args);
        } catch(error) { console.log(error.message) }
    }
}