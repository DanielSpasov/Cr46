import { Client, Guild as DiscordGuild } from "discord.js";

import Guild from "../../../Database/Models/Guild";
import { defaultValues } from "./helpers";
import errorHandler from "../../../Errors/handler";
import { IChannel } from "../../../Interfaces/IChannel";

export const createGuild = async (
  client: Client,
  guild: DiscordGuild,
  channels: {
    text: IChannel[];
    voice: IChannel[];
    category: IChannel[];
  }
) => {
  try {
    const newGuild = await new Guild({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      channels: channels,
      ...defaultValues,
    });
    await newGuild.save();
    if (!newGuild) {
      console.error(`Adding Cr46 to guild with ID: ${guild.id} failed.`);
      throw {
        type: "Database Error",
        message: `Failed to add Cr46 in guild with ID: ${guild.id}.`,
        error_code: 400,
      };
    }
  } catch (error) {
    errorHandler(client, error);
  }
};
