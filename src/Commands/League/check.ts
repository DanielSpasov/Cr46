import { MessageEmbed } from 'discord.js';
import axios from 'axios';

import { Command } from '../../Interfaces';
import { ILeagueVersions, ISummoner } from '../../Interfaces/League';

import { getURL, getChampions, getRanked } from './getters';



export const command: Command = {
    name: 'check',
    aliases: [],
    run: async (client, message, args) => {
        try {

            if (!args.length) return;

            const username = args.join(' ');

            const versions = await axios.get<ILeagueVersions>(getURL(client, 'versions'), client.config.requestOptions);
            const latest = versions.data[0];

            const summoner = await axios.get<ISummoner>(getURL(client, 'summoner', [username]), client.config.requestOptions);

            const outputEmbed = new MessageEmbed();
            outputEmbed.setColor('BLUE');
            outputEmbed.setAuthor(
                `${summoner.data.name} - Level ${summoner.data.summonerLevel}`,
                getURL(client, 'profileIcon', [latest, summoner.data.profileIconId])
            );

            const outputMessage = await message.channel.send({ embeds: [outputEmbed] });

            const description = await getRanked(client, summoner)
            outputEmbed.setDescription(description)
            outputMessage.edit({ embeds: [outputEmbed] })

            const fields = await getChampions(client, summoner, latest, 9)
            outputEmbed.addFields(fields)
            outputMessage.edit({ embeds: [outputEmbed] })


        } catch (error) { console.log(error) }
    }
}