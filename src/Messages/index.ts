import { sendMessage } from "./sendMessage";
import { editMessage } from "./editMessage";

import { invalidChannel } from "./system/invalidChannel";
import { status } from "./system/status";

export const message = {
  send: sendMessage,
  edit: editMessage,
  common: {
    status,
    invalidChannel,
  },
};
