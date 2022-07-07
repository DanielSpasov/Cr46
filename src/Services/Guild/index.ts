import { channels } from "./channels";
import { guilds } from "./guilds";

export const guildService = {
  channels,
  ...guilds,
};
