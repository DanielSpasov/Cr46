import { sendMessage } from "./sendMessage";
import { editMessage } from "./editMessage";

import { status } from "./system/status";

export const message = {
  send: sendMessage,
  edit: editMessage,
  common: {
    status,
  },
};
