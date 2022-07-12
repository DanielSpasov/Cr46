import { Interaction, Message, MessageEmbedOptions } from "discord.js";
import Client from "../../Client";

interface Run {
  (
    client: Client,
    message: Message | Interaction
  ): Promise<MessageEmbedOptions>;
}

export interface Option {
  name: string;
  description: string;
  required: boolean;
}

export interface SubCommand {
  name: string;
  description: string;
  options: Option[];
}

export interface Command {
  name: string;
  description: string;
  subCommands: SubCommand[];
  options: Option[];
  run: Run;
}
