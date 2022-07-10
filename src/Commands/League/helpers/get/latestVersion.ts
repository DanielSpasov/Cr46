import { Interaction } from "../../../../Interfaces/Core";
import axios from "axios";
import { get } from ".";

export const latestVersion = async (
  interaction: Interaction
): Promise<string> => {
  try {
    const versionList = await axios.get<string[]>(
      get.url({ key: "versions" }),
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    return versionList.data[0];
  } catch (error) {
    throw error;
  }
};
