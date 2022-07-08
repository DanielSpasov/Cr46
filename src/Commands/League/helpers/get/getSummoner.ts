import { Summoner } from "../../../../Interfaces/League";
import errorHandler from "../../../../Errors/handler";
import ExtendedClient from "../../../../Client";
import { getURL } from "./getURL";
import axios from "axios";

export const getSummoner = async (
  client: ExtendedClient,
  summonerName: string,
  serverName: string
): Promise<Summoner> => {
  try {
    const response = await axios.get<Summoner>(
      getURL({ key: "summoner", summonerName, serverName }),
      client.config.requestOptions
    );
    return response.data;
  } catch (error) {
    errorHandler({ client, error });
  }
};
