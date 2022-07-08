import { getMessageColorByRank } from "./getMessageColorByRank";
import { getChampionsCount } from "./getChampionsCount";
import { getLatestVersion } from "./getLatestVersion";
import { getAccountChamps } from "./getAccountChamps";
import { getSummonerName } from "./getSummonerName";
import { getServerName } from "./getServerName";
import { getAllChamps } from "./getAllChamps";
import { getChampions } from "./getChampions";
import { getSummoner } from "./getSummoner";
import { getRank } from "./getRank";
import { getURL } from "./getURL";

export const get = {
  messageColorByRank: getMessageColorByRank,
  championsCount: getChampionsCount,
  accountChamps: getAccountChamps,
  latestVersion: getLatestVersion,
  summonerName: getSummonerName,
  serverName: getServerName,
  allChamps: getAllChamps,
  champions: getChampions,
  summoner: getSummoner,
  rank: getRank,
  url: getURL,
};
