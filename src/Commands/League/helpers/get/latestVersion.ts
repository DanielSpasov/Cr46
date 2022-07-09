import { Interaction } from "../../../../Interfaces/Core";
import ExtendedClient from "../../../../Client";
import axios from "axios";
import { get } from ".";

export const latestVersion = async (
  client: ExtendedClient,
  interaction: Interaction
): Promise<string> => {
  try {
    const versionList = await axios.get<string[]>(
      get.url({ key: "versions" }),
      client.config.requestOptions
    );
    return versionList.data[0];
  } catch (error) {
    throw {
      channelID: interaction.channelId,
      ...error,
    };
  }
};
