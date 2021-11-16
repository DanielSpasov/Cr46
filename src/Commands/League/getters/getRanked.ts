import axios from 'axios';

import { IElo } from '../../../Interfaces/League';

import { getURL } from './getURL';



export const getRanked = async (client, summoner, region): Promise<string> | null => {
    try {
        let output = '';
        const ranked = await axios.get<IElo[]>(getURL(client, 'ranked', [summoner.data.id], region), client.config.requestOptions)
        if (ranked.data.length) {
            for (const league of ranked.data) {
                output += `${league.queueType === 'RANKED_SOLO_5x5' ? 'Solo' : 'Flex'}`;
                output += ` - **${league.tier} \`${league.rank}\`**`;
                output += ` - \`${league.leaguePoints} LP\``;
                output += ` - **${league.wins + league.losses}** Games`;
                output += ` - \`${Math.round((league.wins / (league.wins + league.losses)) * 100)}%\` **Winrate**\n`;
            };
        }
        return output
    } catch { return null }
}