import {
  CategoryChannel,
  Client,
  Collection,
  NewsChannel,
  StageChannel,
  StoreChannel,
  TextChannel,
  VoiceChannel,
} from "discord.js";

import errorHandler from "../../../Errors/handler";
import { mapType, defaultValues } from "./helpers";

export const formatChannels = (
  client: Client,
  channels: Collection<
    string,
    | TextChannel
    | VoiceChannel
    | CategoryChannel
    | NewsChannel
    | StoreChannel
    | StageChannel
  >
) => {
  try {
    const result = defaultValues;
    channels.forEach((channel, id) =>
      result[mapType[channel.type]].push({
        id,
        type: channel.type,
        name: channel.name,
        parent: channel.parentId,
        position: channel.position,
      })
    );
    return result;
  } catch (error) {
    errorHandler(client, error);
  }
};
