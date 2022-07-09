import {
  CategoryChannel,
  Collection,
  NewsChannel,
  StageChannel,
  StoreChannel,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import ExtendedClient from "../../../Client";
import errorHandler from "../../../Errors/handler";
import { mapType, defaultValues } from "./helpers";

export const formatChannels = (
  client: ExtendedClient,
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
    errorHandler({ client, error });
  }
};
