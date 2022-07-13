import { Summoner } from "../../../../Interfaces/League";
import axios from "axios";
import { get } from ".";

export const summoner = async (
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
    if (error.response.status === 404) {
      const urlArr = error.response.config.url.split("/");
      const username = urlArr[urlArr.length - 1];
      throw {
        customMessage: `Summoner \`${username}\` was not found.`,
        ...error,
      };
    } else {
      throw error;
    }
  }
};
