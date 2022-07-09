import ExtendedClient from "../../../../Client";
import {
  Champion,
  ExtendedChampion,
  RawChampion,
} from "../../../../Interfaces/League";
import axios from "axios";
import { get } from ".";

export const champions = async (
  client: ExtendedClient,
  accID: string,
  version: string,
  count: number,
  serverName: string
): Promise<ExtendedChampion[]> => {
  const accountChamps = await accChampions(client, accID, serverName, count);
  const allChamps = Object.values(await allChampions(client, version));

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
  client: ExtendedClient,
  summonerID: string,
  serverName: string,
  champCount: number
): Promise<Champion[]> => {
  const { data: accountChamps } = await axios.get(
    get.url({ key: "accountChamps", summonerID, serverName }),
    client.config.requestOptions
  );
  return accountChamps.slice(0, champCount);
};

export const allChampions = async (
  client: ExtendedClient,
  version: string
): Promise<RawChampion[]> => {
  const { data: allChamps } = await axios.get(
    get.url({ key: "allChampions", version }),
    client.config.requestOptions
  );
  return allChamps.data;
};
