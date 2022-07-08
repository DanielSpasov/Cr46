import { Client } from "discord.js";

import { unknownError, invalidErrorFormat, weirdError } from "./common";
import { IHandledError } from "./IHandledError";
import { isValidError } from "./validator";
import ExtendedClient from "../Client";
import { message } from "../Messages";

export default async function errorHandler({
  client,
  error,
  module,
  channelID,
}: {
  client: Client | ExtendedClient;
  error?: IHandledError;
  module?: string | undefined;
  channelID?: string;
}) {
  try {
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
        title: `${module || error.type} Error`,
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
