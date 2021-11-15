import { createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { Command } from '../../Interfaces';

import { videoFinder, idleListener, loadChatPlayer } from './utils';



export const command: Command = {
    name: 'play',
    aliases: ['p'],
    run: async (client, message, args) => {
        try {

            message.delete()

            if (!client.music.guilds.get(message.guildId)) client.music.guilds.set(message.guildId, { queue: [] });
            if (!client.music.player) client.music.player = createAudioPlayer();
            client.music.player.setMaxListeners(1)

            const guild = client.music.guilds.get(message.guildId);
            const voiceChannelID = message.guild.members.cache.get(message.author.id).voice.channelId;

            if (!client.music.connection) {
                client.music.connection = joinVoiceChannel({
                    channelId: voiceChannelID,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
                client.music.connection.subscribe(client.music.player);
                client.music.chatPlayer = await loadChatPlayer(client, message, false);
                idleListener(client, message);
            }
            // if (client.music.connection._state.status == 'disconnected') {

            // }

            const video = await videoFinder(args.join(' '));

            if (guild.queue.length === 0) {
                guild.queue.push(video);
                const resource = createAudioResource(ytdl(video.url, { filter: 'audioonly' }));
                client.music.player.play(resource);
            } else {
                guild.queue.push(video);
            }
            await loadChatPlayer(client, message, true);


        } catch (error) { console.log(error) }
    }
}