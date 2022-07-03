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
import { defaultValues } from "./defaultValues";

const mapType = {
  GUILD_TEXT: "text",
  GUILD_CATEGORY: "category",
  GUILD_VOICE: "voice",
  GUILD_NEWS: "news",
  GUILD_STORE: "store",
  GUILD_STAGE: "stage",
};

export const formatGuildChannels = (
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
        parent: channel.parent?.id,
        position: channel.position,
      })
    );
    return result;
  } catch (error) {
    errorHandler(client, error);
  }
};
