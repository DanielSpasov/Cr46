import {
  Champion,
  ExtendedChampion,
  RawChampion,
} from "../../../../Interfaces/League";
import axios from "axios";
import { get } from ".";

export const champions = async (
  accID: string,
  version: string,
  count: number,
  serverName: string
): Promise<ExtendedChampion[]> => {
  const accountChamps = await accChampions(accID, serverName, count);
  const allChamps = Object.values(await allChampions(version));

  return accountChamps.map((champ: any) => {
    const { id: name } = <RawChampion>(
      allChamps.find(
        (info: RawChampion) => Number(info.key) === champ.championId
      )
    );
    return { ...champ, name };
  });
};

export const accChampions = async (
  summonerID: string,
  serverName: string,
  champCount: number
): Promise<Champion[]> => {
  const { data: accountChamps } = await axios.get(
    get.url({ key: "accountChamps", summonerID, serverName }),
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    }
  );
  return accountChamps.slice(0, champCount);
};

export const allChampions = async (version: string): Promise<RawChampion[]> => {
  const { data: allChamps } = await axios.get(
    get.url({ key: "allChampions", version }),
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    }
  );
  return allChamps.data;
};
