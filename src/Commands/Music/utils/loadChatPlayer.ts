import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';



export const loadChatPlayer = (client, message, isUpdate) => {

    const queue = client.music.guilds.get(message.guildId).queue

    const playerEmbed = new MessageEmbed()
        .setTitle(`Music Player`)
        .setColor('PURPLE')

    if (!queue.length) {
        playerEmbed.addField(
            'No songs left in the Queue:',
            `Bot will disconnect in 3 minutes`,
            true);
    } else {
        playerEmbed.addField(
            'Currently Playing:',
            `\`Title:\` [${queue[0].title}](${queue[0].url})\n\`Duration:\` ${queue[0].duration}`,
            true);
        playerEmbed.addField(
            'Queue',
            queue.map(s => s = `**${queue.indexOf(s) + 1}**:  [${s.title}](${s.url})`).join('\n'),
            true);
    }

    const buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('play')
                .setLabel('Play')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('pause')
                .setLabel('Pause')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('skip')
                .setLabel('Skip')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('loop')
                .setLabel('Loop')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('clear')
                .setLabel('Clear & Disconnect')
                .setStyle('DANGER')
        )

    if (isUpdate) return client.music.chatPlayer.edit({ embeds: [playerEmbed], components: [buttons] });
    else return message.channel.send({ embeds: [playerEmbed], components: [buttons] });
}