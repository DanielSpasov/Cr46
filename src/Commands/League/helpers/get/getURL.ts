export const getURL = ({
  key,
  version,
  summonerName,
  serverName,
  summonerID,
  iconID,
  championName,
}: {
  key: string;
  version?: string;
  summonerName?: string;
  serverName?: string;
  summonerID?: string;
  iconID?: number;
  championName?: string;
}): string => {
  switch (key) {
    case "versions":
      return `https://ddragon.leagueoflegends.com/api/versions.json`;
    case "summoner":
      return `https://${serverName}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    case "icon":
      return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconID}.png`;
    case "ranked":
      return `https://${serverName}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}`;
    case "accountChamps":
      return `https://${serverName}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}`;
    case "allChampions":
      return `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
    case "championImg":
      return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
  }
};
