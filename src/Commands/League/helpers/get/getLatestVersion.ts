import { ILeagueVersions } from "../../../../Interfaces/League";
import ExtendedClient from "../../../../Client";
import { getURL } from "./getURL";
import axios from "axios";

export const getLatestVersion = async (
  client: ExtendedClient
): Promise<string> => {
  const versionList = await axios.get<ILeagueVersions>(
    getURL({ key: "versions" }),
    client.config.requestOptions
  );
  return versionList.data[0];
};
