import { Rank } from "../../../../Interfaces/League";
import ExtendedClient from "../../../../Client";
import { getURL } from "./getURL";
import axios from "axios";

export const getRank = async (
  client: ExtendedClient,
  summonerID: string,
  serverName: string
): Promise<Rank[]> => {
  const response = await axios.get<Rank[]>(
    getURL({ key: "ranked", summonerID, serverName }),
    client.config.requestOptions
  );
  return response.data;
};
