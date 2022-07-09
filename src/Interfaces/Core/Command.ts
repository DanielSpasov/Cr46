import { Interaction, Message } from "discord.js";
import Client from "../../Client";

interface Run {
  (client: Client, message: Message | Interaction, args: string[]);
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
