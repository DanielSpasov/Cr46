import { createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';

import { Command } from '../../Interfaces';

import { videoFinder, videoPlayer, loadChatPlayer } from './utils';



export const command: Command = {
    name: 'play',
    aliases: ['p'],
    run: async (client, message, args) => {
        try {

            message.delete()

            if (!client.music.guilds.get(message.guildId)) client.music.guilds.set(message.guildId, { queue: [] });
            if (!client.music.player) client.music.player = createAudioPlayer();

            const guild = client.music.guilds.get(message.guildId);

            const voiceChannelID = message.guild.members.cache.get(message.author.id).voice.channelId;

            if (!client.music.connection) {
                client.music.connection = joinVoiceChannel({
                    channelId: voiceChannelID,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
                client.music.connection.subscribe(client.music.player);
            }

            const video = await videoFinder(args.join(' '));
            guild.queue.push(video);

            if (guild.queue.length <= 1) {
                client.music.chatPlayer = await loadChatPlayer(client, message, false);
                videoPlayer(client, guild.queue[0]);
            } else {
                await loadChatPlayer(client, message, true);
            }



        } catch (error) { console.log(error) }
    }
}