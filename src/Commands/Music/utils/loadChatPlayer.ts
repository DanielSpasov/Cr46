import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';



export const loadChatPlayer = (client, message, isUpdate) => {
    try {

        const guild = client.music.guilds.get(message.guildId);
        const loopingWord = guild.looping ? guild.looping === 1 ? 'Song' : 'Queue' : 'Disabled';
        const loopingColor = guild.looping ? guild.looping === 1 ? 'SUCCESS' : 'PRIMARY' : 'SECONDARY';

        const playerEmbed = new MessageEmbed()
            .setTitle(`Music Player`)
            .setColor('PURPLE')
            .setFooter(`Looping: ${loopingWord} | Shuffling: ${guild.shuffle ? 'Enabled' : 'Disabled'}`)

        if (!guild.queue.length) {
            playerEmbed.addField(
                'No songs left in the Queue:',
                `Bot will disconnect in 3 minutes`,
                true);
        } else {
            playerEmbed.addField(
                'Currently Playing:',
                `\`Title:\` [${guild.queue[0].title}](${guild.queue[0].url})\n\`Duration:\` ${guild.queue[0].duration}`,
                true);
            playerEmbed.addField(
                'Queue',
                guild.queue.map(s => s = `**${guild.queue.indexOf(s) + 1}**:  [${s.title}](${s.url})`).join('\n'),
                true);
        }

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('resume-pause')
                    .setLabel(guild.isPaused ? 'Resume' : 'Pause')
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
                    .setStyle(guild.shuffle ? 'SUCCESS' : 'SECONDARY'),
                new MessageButton()
                    .setCustomId('clear')
                    .setLabel('Clear & Disconnect')
                    .setStyle('DANGER')
            )

        if (isUpdate) return guild.chatPlayer.edit({ embeds: [playerEmbed], components: [buttons] });
        else return message.channel.send({ embeds: [playerEmbed], components: [buttons] });

    } catch (error) { console.log(error.message) }
}