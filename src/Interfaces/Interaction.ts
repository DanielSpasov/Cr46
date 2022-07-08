import { Message } from "discord.js";

export interface Interaction extends Message {
  options: {
    _group: null;
    _subcommand: null;
    _hoistedOptions: {
      name: string;
      type: string;
      value: string;
    }[];
  };
}
