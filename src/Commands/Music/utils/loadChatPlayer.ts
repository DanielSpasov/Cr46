import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';



export const loadChatPlayer = (client, message, isUpdate) => {
    try {

        const queue = client.music.guilds.get(message.guildId).queue
        const loopingWord = client.music.looping ? client.music.looping === 1 ? 'Song' : 'Queue' : 'Disabled';
        const loopingColor = client.music.looping ? client.music.looping === 1 ? 'SUCCESS' : 'PRIMARY' : 'SECONDARY';

        const playerEmbed = new MessageEmbed()
            .setTitle(`Music Player`)
            .setColor('PURPLE')
            .setFooter(`Looping: ${loopingWord} | Shuffling: ${client.music.shuffle ? 'Enabled' : 'Disabled'}`)

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
                    .setCustomId('resume-pause')
                    .setLabel(client.music.isPaused ? 'Resume' : 'Pause')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('skip')
                    .setLabel('Skip')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('loop')
                    .setLabel('Loop')
                    .setStyle(loopingColor),
                new MessageButton()
                    .setCustomId('shuffle')
                    .setLabel('Shuffle')
                    .setStyle(client.music.shuffle ? 'SUCCESS' : 'SECONDARY'),
                new MessageButton()
                    .setCustomId('clear')
                    .setLabel('Clear & Disconnect')
                    .setStyle('DANGER')
            )

        if (isUpdate) return client.music.chatPlayer.edit({ embeds: [playerEmbed], components: [buttons] });
        else return message.channel.send({ embeds: [playerEmbed], components: [buttons] });

    } catch (error) { console.log(error.message) }
}