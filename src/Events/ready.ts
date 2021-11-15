import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { Event } from '../Interfaces';



export const event: Event = {
    name: 'ready',
    run: async (client) => {
        try {
            console.log('Cr46 is Online!');

            client.user.setActivity(
                process.env.NODE_ENV === 'production' ? '@Cr46' : 'Under Maintenance',
                { type: process.env.NODE_ENV === 'production' ? 'LISTENING' : 'WATCHING' }
            );

            const botCommandsChannel = await <Promise<TextChannel>>client.channels.fetch(client.config.valid_channels[0]);
            botCommandsChannel.send({
                embeds: [new MessageEmbed()
                    .setDescription(`Cr46 is Running in ${process.env.NODE_ENV} mode`)
                    .setColor('GREEN')]
            });

            const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);
            const emojis = {
                league: 'League of Legends',
                tft: 'TFT',
                valorant: 'VALORANT',
                minecraft: 'Minecraft',
                gtav: 'Grand Theft Auto V',
            }

            let embedDescription = 'By reacting with a certain game emoji you will be notified everytime someone is looking to play and moved to the specific channel when playing the game.\n\n'
            const reactions = []

            for (const key in emojis) {
                const emoji = getEmoji(key)
                reactions.push(emoji)

                const role = emojis[key]
                embedDescription += `${emoji} --- ${role}\n`
            }

            const content = new MessageEmbed()
                .setTitle('React to get the role.')
                .setDescription(embedDescription)
                .setColor('BLURPLE')

            firstMessage(client, content, reactions);

        } catch (error) { console.log(error.message) }
    }
}


const firstMessage = async (client, content, reactions = []) => {
    try {
        const rolesChannel = await <Promise<TextChannel>>client.channels.fetch(client.config.roles_channel);
        const messages = await rolesChannel.messages.fetch();

        if (messages.size === 0) {
            const message = await <Promise<Message>>rolesChannel.send({ embeds: [content] });
            addReactions(message, reactions);
        } else {
            for (const msg of messages) {
                msg[1].edit({ embeds: [content] });
                addReactions(msg[1], reactions);
            };
        }
    } catch (error) { console.log(error.message) }
}

const addReactions = (message, reactions) => {
    try {
        message.react(reactions[0]);
        reactions.shift();
        if (reactions.length > 0) {
            setTimeout(() => addReactions(message, reactions), 750);
        };
    } catch(error) { console.log(error.message) }
}