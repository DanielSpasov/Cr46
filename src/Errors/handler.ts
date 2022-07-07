import { Client } from "discord.js";

import { unknownError, invalidErrorFormat, weirdError } from "./common";
import { IHandledError } from "./IHandledError";
import { isValidError } from "./validator";
import { message } from "../Messages";

export default async function errorHandler(
  client: Client,
  error?: IHandledError,
  channelID?: string
) {
  try {
    console.error(error);
    if (error.isAxiosError) {
      message.send({
        client,
        embed: {
          title: "Axios Error",
          footer: {
            text: `Error Code: ${error.response.data.status.status_code}`,
          },
          color: "RED",
          description: error.response.data.status.message.toString(),
        },
        channelID,
      });
      return;
    }
    if (!error) {
      message.send({ client, embed: weirdError, channelID });
      return;
    }
    if (!isValidError(error)) {
      message.send({ client, embed: invalidErrorFormat, channelID });
      return;
    }

    await message.send({
      client,
      embed: {
        title: error.type,
        description: error.message,
        color: "RED",
        footer: {
          text: `Error Code: ${error.error_code}`,
        },
      },
      channelID,
    });
    return;
  } catch (err) {
    console.error(error);
    message.send({ client, embed: unknownError, channelID });
  }
}
