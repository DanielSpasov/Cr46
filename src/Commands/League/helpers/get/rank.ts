import { Interaction } from "../../../../Interfaces/Core";
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
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw {
      channelID: interaction.channelId,
      ...error,
    };
  }
};
