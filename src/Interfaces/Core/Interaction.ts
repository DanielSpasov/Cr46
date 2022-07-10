import { Message, MessagePayload, ReplyMessageOptions, User } from "discord.js";

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
  reply: (
    options: string | MessagePayload | ReplyMessageOptions
  ) => Promise<Message>;
  deferReply: Function;
  editReply: Function;
  deleteReply: Function;
}
