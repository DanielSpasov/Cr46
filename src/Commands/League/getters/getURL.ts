



export const getURL = (client, key: string, args?: string[], region = 'euw1'): string => {
    switch (key) {
        case 'versions': return `https://ddragon.leagueoflegends.com/api/versions.json`;
        case 'summoner': return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${args[0]}`;
        case 'profileIcon': return `https://ddragon.leagueoflegends.com/cdn/${args[0]}/img/profileicon/${args[1]}.png`;
        case 'ranked': return `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${args[0]}`;
        case 'sumChampions': return `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${args[0]}`;
        case 'allChampions': return `https://ddragon.leagueoflegends.com/cdn/${args[0]}/data/en_US/champion.json`;
    }
}