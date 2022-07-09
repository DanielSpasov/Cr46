import { Guild as DiscordGuild } from "discord.js";
import { defaultValues } from "./guilds/helpers";
import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Channel } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";

export const createGuild = async (
  client: ExtendedClient,
  guild: DiscordGuild,
  channels: {
    text: Channel[];
    voice: Channel[];
    category: Channel[];
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
    errorHandler({ client, error });
  }
};
