import { Client } from "discord.js";

import { unknownError, invalidErrorFormat, weirdError } from "./common";
import { sendMessage } from "../Client/sendMessage";
import { IHandledError } from "./IHandledError";
import { isValidError } from "./validator";

export default async function errorHandler(
  client: Client,
  error?: IHandledError
) {
  try {
    if (!error) {
      sendMessage({ client, embed: weirdError });
    }
    if (!isValidError(error)) {
      sendMessage({ client, embed: invalidErrorFormat });
    }

    await sendMessage({
      client,
      embed: {
        title: error.type,
        description: error.message,
        color: "RED",
        footer: {
          text: `Error Code: ${error.error_code}`,
        },
      },
    });
  } catch (err) {
    sendMessage({ client, embed: unknownError });
  }
}
