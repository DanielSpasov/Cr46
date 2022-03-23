import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';



export const loadChatPlayer = async (client, message, isUpdate) => {
    try {

        const guild = await client.music.guilds.get(message.guildId);
        const loopingWord = guild.looping ? guild.looping === 1 ? 'Song' : 'Queue' : 'Disabled';
        const loopingColor = guild.looping ? guild.looping === 1 ? 'SUCCESS' : 'PRIMARY' : 'SECONDARY';

        const playerEmbed = new MessageEmbed()
            .setTitle(`Music Player`)
            .setColor('PURPLE')
            .setFooter(`Looping: ${loopingWord} | Shuffling: ${guild.shuffle ? 'Enabled' : 'Disabled'}`)

        if (!guild.queue.length) {
            playerEmbed.addField(
                'No songs left in the Queue:',
                guild.connection ? `Bot will disconnect in 3 minutes` : `Listening party is over`,
                true);
        } else {
            playerEmbed.addField(
                'Currently Playing:',
                `\`Title:\` [${guild.queue[0].title}](${guild.queue[0].url})\n
                \`Duration:\` ${guild.queue[0].duration}\n
                \`Songs in Queue:\` ${guild.queue.length}`,
                true);

            let songList: string = '';
            const playlistLength: number = guild.queue.length > 5 ? 5 : guild.queue.length;
            for (let i = 0; i < playlistLength; i++) {
                if (i == 4) songList += `**${i + 1}**:  [${guild.queue[i].title}](${guild.queue[i].url})\n...`
                else songList += `**${i + 1}**:  [${guild.queue[i].title}](${guild.queue[i].url})\n`
            }

            playerEmbed.addField(
                'Queue',
                songList,
                true);
        }

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(guild.isPaused ? 'resume' : 'pause')
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
                    .setCustomId(guild.queue.length == 0 ? 'disconnect' : 'clear')
                    .setLabel(guild.queue.length == 0 ? 'Disconnect' : 'Clear')
                    .setStyle('DANGER')
            )

        if (isUpdate) return guild.chatPlayer.edit({ embeds: [playerEmbed], components: [buttons] });
        else return message.channel.send({ embeds: [playerEmbed], components: [buttons] });

    } catch (error) { console.log(error.message) }
}