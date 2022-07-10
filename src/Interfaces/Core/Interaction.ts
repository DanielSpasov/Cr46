import { Message, User } from "discord.js";

export interface Interaction extends Message {
  user: User;
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
