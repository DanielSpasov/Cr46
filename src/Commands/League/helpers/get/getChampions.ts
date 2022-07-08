import ExtendedClient from "../../../../Client";
import { get } from ".";

export const getChampions = async (
  client: ExtendedClient,
  summonerID: string,
  version: string,
  champCount: number,
  serverName: string
): Promise<any> => {
  const accountChamps = await get.accountChamps(client, summonerID, serverName);
  const allChamps = await get.allChamps(client, version);

  const allChampsInfo = Object.values(allChamps.data);
  const wantedChamps = accountChamps.slice(0, champCount);
  return wantedChamps.map((champ: any) => {
    const { id: name } = <any>(
      allChampsInfo.find((info: any) => Number(info.key) === champ.championId)
    );
    return { ...champ, name };
  });
};
