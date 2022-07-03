import { Client, Guild as DiscordGuild } from "discord.js";

import Guild from "../../../Database/Models/Guild";
import { defaultValues } from "./defaultValues";
import errorHandler from "../../../Errors/handler";
import { IChannel } from "../../../Interfaces/IChannel";

export const createGuild = async (
  client: Client,
  guild: DiscordGuild,
  channels: {
    text: IChannel[];
    voice: IChannel[];
    category: IChannel[];
    news: IChannel[];
    store: IChannel[];
    stage: IChannel[];
  }
): Promise<boolean> => {
  try {
    const newGuild = await new Guild({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      channels: channels,
      ...defaultValues,
    });
    if (!newGuild) {
      console.error(`Adding Cr46 to guild with ID: ${guild.id} failed.`);
      return false;
    }
    await newGuild.save();
    return true;
  } catch (error) {
    errorHandler(client, error);
  }
};
