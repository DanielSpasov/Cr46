import { Client, Guild as DiscordGuild } from "discord.js";

import Guild from "../../Models/Guild";
import errorHandler from "../../Errors/handler";
import { IChannel } from "../../Interfaces/IChannel";

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
      prefix: "/",
      channels: channels,
      validChannels: [],
      league: {
        allowed: true,
      },
      moveByActivity: {
        allowed: false,
      },
      roles: {
        allowed: false,
        channel: false,
      },
      music: {
        youtube: {
          allowed: true,
          playlists: false,
          mixes: false,
        },
        spotify: {
          allowed: false,
          playlists: false,
          albums: false,
        },
      },
      gambling: {
        allowed: false,
      },
      voiceCommands: {
        allowed: false,
      },
    });
    if (!newGuild) {
      console.log(`Adding Cr46 to guild with ID: ${guild.id} failed.`);
      return false;
    }
    await newGuild.save();
    return true;
  } catch (error) {
    errorHandler(client, error);
  }
};
