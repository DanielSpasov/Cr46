import { MessageEmbed } from 'discord.js';
import axios from 'axios';

import { Command } from '../../Interfaces';
import { ILeagueVersions, ISummoner } from '../../Interfaces/League';

import { getURL, getChampions, getRanked } from './getters';
import { menus } from '../Help/Menus';
import Guild from '../../Models/Guild';



export const command: Command = {
    name: 'check',
    aliases: [],
    run: async (client, message, args) => {
        try {

            const guild = await Guild.findOne({ id: message.guildId });

            if (!args.length) return menus.league.check(message, guild.prefix);
            if (!guild.league.allowed) return menus.league.checkNotAllowed(message, guild.prefix);

            const validRegions = ['br1', 'eun1', 'euw1', 'jp1', 'la1', 'la2', 'kr', 'na1', 'oc2', 'ru', 'tr1']
            const optionalRegion = args[args.length - 1]
            let region
            if (optionalRegion.includes('region:')) {
                region = args.pop().split('region:')[1];
                if (!validRegions.includes(region)) return await message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`Region **${region}** is not a valid region.`)
                            .setColor('RED')
                            .setFooter(`Valid Regions: ${validRegions.join(', ')}`)
                    ]
                });
            }

            const username = args.join(' ');

            const versions = await axios.get<ILeagueVersions>(getURL(client, 'versions'), client.config.requestOptions);
            const latest = versions.data[0];

            const summoner = await axios.get<ISummoner>(getURL(client, 'summoner', [username], region), client.config.requestOptions);

            const outputEmbed = new MessageEmbed();
            outputEmbed.setColor('BLUE');
            outputEmbed.setAuthor(
                `${summoner.data.name} - Level ${summoner.data.summonerLevel}`,
                getURL(client, 'profileIcon', [latest, summoner.data.profileIconId])
            );

            const outputMessage = await message.channel.send({ embeds: [outputEmbed] });

            const description = await getRanked(client, summoner, region)
            outputEmbed.setDescription(description)
            outputMessage.edit({ embeds: [outputEmbed] })

            const fields = await getChampions(client, summoner, latest, 9, region)
            outputEmbed.addFields(fields)
            outputMessage.edit({ embeds: [outputEmbed] })


        } catch (error) {
            await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Summoner **${args.join(' ')}** not found.`)
                        .setColor('RED')
                ]
            });
        }
    }
}