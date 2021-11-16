import axios from 'axios';

import { IChampion, IDDragonChampions } from '../../../Interfaces/League';

import { getURL } from './getURL';



export const getChampions = async (
    client,
    summoner,
    version,
    count,
    region
): Promise<Array<{
    name: string,
    value: string,
    inline: boolean
}>> | null => {
    try {

        let fields = [];
        const sumChampions = await axios.get<IChampion[]>(getURL(client, 'sumChampions', [summoner.data.id], region), client.config.requestOptions);
        const allChampions = await axios.get<IDDragonChampions>(getURL(client, 'allChampions', [version]), client.config.requestOptions)
        const topChampions = sumChampions.data.slice(0, count);
        const topChampionsIDs = sumChampions.data.slice(0, count).map(<IChampion>(x) => x = x.championId);
        const champNameById = new Map()

        Object.values(allChampions.data.data)
            .filter(<IDDragonChampion>(x) => topChampionsIDs.includes(Number(x.key)))
            .forEach(<IDDragonChampion>(x) => champNameById.set(x.key, x.name))

        for (const champ of topChampions) {
            fields.push({
                name: champNameById.get(champ.championId.toString()),
                value: `Points: \`${champ.championPoints}\`\nLevel: \`${champ.championLevel}\``,
                inline: true
            })
        }

        return fields

    } catch { return null }
}