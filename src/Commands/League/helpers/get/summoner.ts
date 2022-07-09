import { Interaction } from "../../../../Interfaces/Core";
import { Summoner } from "../../../../Interfaces/League";
import ExtendedClient from "../../../../Client";
import axios from "axios";
import { get } from ".";

export const summoner = async (
  client: ExtendedClient,
  interaction: Interaction,
  summonerName: string,
  serverName: string
): Promise<Summoner> => {
  try {
    const { data: summoner } = await axios.get<Summoner>(
      get.url({ key: "summoner", summonerName, serverName }),
      client.config.requestOptions
    );
    return summoner;
  } catch (error) {
    throw {
      channelID: interaction.channelId,
      ...error,
    };
  }
};
