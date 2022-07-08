import ExtendedClient from "../../../../Client";
import axios from "axios";
import { get } from ".";

export const getAllChamps = async (client: ExtendedClient, version: string) => {
  const { data: allChamps } = await axios.get(
    get.url({ key: "allChampions", version }),
    client.config.requestOptions
  );
  return allChamps;
};
