import { Interaction, Message, MessageEmbedOptions } from "discord.js";
import Client from "../../Client";

interface Run {
  (
    client: Client,
    message: Message | Interaction
  ): Promise<MessageEmbedOptions>;
}

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  arguments: {
    key: string;
    description?: string;
    required: boolean;
  }[];
  run: Run;
}
