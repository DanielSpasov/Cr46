import { Interaction } from "../../../../Interfaces/Core";
import { Summoner } from "../../../../Interfaces/League";
import axios from "axios";
import { get } from ".";

export const summoner = async (
  interaction: Interaction,
  summonerName: string,
  serverName: string
): Promise<Summoner> => {
  try {
    const { data: summoner } = await axios.get<Summoner>(
      get.url({ key: "summoner", summonerName, serverName }),
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    return summoner;
  } catch (error) {
    throw {
      channelID: interaction.channelId,
      ...error,
    };
  }
};
