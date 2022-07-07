export const getURL = ({
  key,
  version,
  summonerName,
  summonerId,
  iconID,
  server = "euw1",
}: {
  key: string;
  version?: string;
  summonerName?: string;
  summonerId?: string;
  iconID?: number;
  server?: string | undefined;
}): string => {
  switch (key) {
    case "versions":
      return `https://ddragon.leagueoflegends.com/api/versions.json`;
    case "summoner":
      return `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    case "profileIcon":
      return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconID}.png`;
    case "ranked":
      return `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    case "sumChampions":
      return `https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`;
    case "allChampions":
      return `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  }
};
