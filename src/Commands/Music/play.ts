import { createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';

import { Command } from '../../Interfaces';
import Guild from '../../Models/Guild';

import { videoFinder, idleListener, loadChatPlayer } from './utils';



export const command: Command = {
    name: 'play',
    aliases: ['p'],
    run: async (client, message, args) => {
        try {

            const guildPrefix = await (await Guild.findOne({ id: message.guildId })).prefix;

            message.delete();

            if (!client.music.guilds.get(message.guildId)) client.music.guilds.set(message.guildId, {
                looping: 0,
                connection: undefined,
                player: undefined,
                chatPlayer: undefined,
                isPaused: false,
                shuffle: false,
                queue: []
            });

            const guild = client.music.guilds.get(message.guildId);

            if (!guild.player) guild.player = createAudioPlayer();
            guild.player.setMaxListeners(1);

            const voiceChannelID = message.guild.members.cache.get(message.author.id).voice.channelId;
            if (!voiceChannelID) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`You need to be in a voice channel to use ${guildPrefix}play`)
                        .setColor('PURPLE')
                ]
            });

            if (!guild.connection) {
                guild.connection = joinVoiceChannel({
                    channelId: voiceChannelID,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });

                guild.connection.on(VoiceConnectionStatus.Disconnected, () => {
                    setTimeout(async () => {
                        try {
                            if (guild.connection._state.status === 'disconnected') {
                                guild.connection.destroy();
                                guild.connection = null;
                                guild.player = null;
                                guild.queue = [];
                                await loadChatPlayer(client, message, true);
                            }
                        } catch (err) { console.log(err.message) }
                    }, 2500);
                });

                guild.connection.subscribe(guild.player);
                guild.chatPlayer = await loadChatPlayer(client, message, false);
                idleListener(client, message);
            };

            const video = await videoFinder(args.join(' '));
            if (!video) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Please provide arguments to the ${guildPrefix}play command`)
                        .setColor('PURPLE')
                ]
            });

            guild.isPaused = false;
            if (!guild.player) return;

            if (guild.queue.length === 0) {
                guild.queue.push(video);
                const resource = createAudioResource(ytdl(video.url, { filter: 'audioonly' }));
                guild.player.play(resource);
            } else {
                guild.queue.push(video);
            }
            await loadChatPlayer(client, message, true);


        } catch (error) { console.log(error.message) }
    }
}