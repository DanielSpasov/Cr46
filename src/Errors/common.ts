import { MessageEmbedOptions } from "discord.js";

export const unknownError: MessageEmbedOptions = {
  title: "Unknown Error",
  color: "RED",
  footer: {
    text: "Error Code: 500",
  },
};

export const invalidErrorFormat: MessageEmbedOptions = {
  title: "Invalid Error Format",
  color: "RED",
  footer: {
    text: "Error Code: 500",
  },
};

export const weirdError: MessageEmbedOptions = {
  title: "Weird Error",
  description:
    "Somehow you was able to pass 'null' (nothing) to the error handler...\n Congratulations!",
  color: "RED",
  footer: {
    text: "Error Code: 500",
  },
};
