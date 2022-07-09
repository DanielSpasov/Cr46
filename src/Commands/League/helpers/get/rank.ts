import { Interaction } from "../../../../Interfaces/Interaction";
import { Rank } from "../../../../Interfaces/League";
import ExtendedClient from "../../../../Client";
import axios from "axios";
import { get } from ".";

export const rank = async (
  client: ExtendedClient,
  interaction: Interaction,
  summonerID: string,
  serverName: string
): Promise<Rank[]> => {
  try {
    const response = await axios.get<Rank[]>(
      get.url({ key: "ranked", summonerID, serverName }),
      client.config.requestOptions
    );
    return response.data;
  } catch (error) {
    throw {
      channelID: interaction.channelId,
      ...error,
    };
  }
};
