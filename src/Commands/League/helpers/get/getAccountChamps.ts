import ExtendedClient from "../../../../Client";
import axios from "axios";
import { get } from ".";

export const getAccountChamps = async (
  client: ExtendedClient,
  summonerID: string,
  serverName: string
): Promise<any> => {
  const { data: accountChamps } = await axios.get(
    get.url({ key: "accountChamps", summonerID, serverName }),
    client.config.requestOptions
  );
  return accountChamps;
};
