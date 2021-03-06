import { Rank } from "../../../../Interfaces/League";
import axios from "axios";
import { get } from ".";

export const rank = async (
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
    throw error;
  }
};
