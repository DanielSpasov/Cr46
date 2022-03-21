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

            // DELETE INITIAL MESSAGE TO KEEP CHANNEL CLEAN
            message.delete();

            // IF NO GUILD MUSIC SETTINGS ARE SET, SET SETTINGS
            if (!client.music.guilds.get(message.guildId)) client.music.guilds.set(message.guildId, {
                looping: 0,
                connection: undefined,
                player: undefined,
                chatPlayer: undefined,
                isPaused: false,
                shuffle: false,
                queue: []
            });

            // IF NO GUILD PLAYER IS SET, SET A GUILD PLAYER
            const guild = client.music.guilds.get(message.guildId);
            if (!guild.player) guild.player = createAudioPlayer();
            guild.player.setMaxListeners(1);

            // VALIDATION IF THE USER IS NOT A VOICE CHANNEL WHEN EXECUTING THE COMMAND
            const dbGuild = await Guild.findOne({ id: message.guildId });
            const voiceChannelID = message.guild.members.cache.get(message.author.id).voice.channelId;
            if (!voiceChannelID) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`You need to be in a voice channel to use ${dbGuild.prefix}play`)
                        .setColor('PURPLE')
                ]
            });

            // VALIDATION IF THE COMMAND IS GIVEN WITH NO ARGUEMENTS
            if (!args[0]) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Please provide arguments to the ${dbGuild.prefix}play command`)
                        .setColor('PURPLE')
                ]
            });

            // VALIDATION IF NO VIDEOS ARE FOUND WITH THE GIVEN ARGUMENTS
            const videos = await videoFinder(args.join(' '), dbGuild.music);
            if (typeof videos == 'string') return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(videos)
                        .setColor('PURPLE')
                ]
            });

            // VALIDATION IF NO GUILD CONNECTION IS FOUND, SET A GUILD CONNECTION
            if (!guild.connection) {
                guild.connection = joinVoiceChannel({
                    channelId: voiceChannelID,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });

                // EVENT FOR WHEN BOT IS DISCONNECTED
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

                // CONNECTION & CHAT PLAYER & IDLE LISTENDER, INITIAL SETTING
                guild.connection.subscribe(guild.player);
                guild.chatPlayer = await loadChatPlayer(client, message, false);
                idleListener(client, message);
            };

            guild.isPaused = false;

            // QUEUE EACH VIDEO FOUND
            for (const video of videos) {
                if (guild.queue.length === 0) {
                    guild.queue.push(video);
                    const resource = createAudioResource(ytdl(video.url, { filter: 'audioonly' }));
                    guild.player.play(resource);
                } else {
                    guild.queue.push(video);
                }
            }
            await loadChatPlayer(client, message, true);

        } catch (error) { console.log(error.message) }
    }
}