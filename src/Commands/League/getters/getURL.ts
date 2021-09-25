export const getURL = (client, key: string, args?: string[]): string => {
    switch (key) {
        case 'versions': return `${client.config.lol_ddragon_url}/api/versions.json`;
        case 'summoner': return `${client.config.lol_api_url}/lol/summoner/v4/summoners/by-name/${args[0]}`;
        case 'profileIcon': return `${client.config.lol_ddragon_url}/cdn/${args[0]}/img/profileicon/${args[1]}.png`;
        case 'ranked': return `${client.config.lol_api_url}/lol/league/v4/entries/by-summoner/${args[0]}`;
        case 'sumChampions': return `${client.config.lol_api_url}/lol/champion-mastery/v4/champion-masteries/by-summoner/${args[0]}`;
        case 'allChampions': return `${client.config.lol_ddragon_url}/cdn/${args[0]}/data/en_US/champion.json`;
    }
}