import { channels } from "./channels";
import { createGuild } from "./create";
import { deleteGuild } from "./delete";
import { getGuild } from "./get";

export const guildService = {
  channels,
  create: createGuild,
  delete: deleteGuild,
  get: getGuild,
};
