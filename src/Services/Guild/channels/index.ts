import { createChannel } from "./createChannel";
import { deleteChannel } from "./deleteChannel";
import { updateChannel } from "./updateChannel";
import { formatChannels } from "./formatChannels";

export const channels = {
  create: createChannel,
  delete: deleteChannel,
  format: formatChannels,
  update: updateChannel,
};
