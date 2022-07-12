import { Message, MessagePayload, ReplyMessageOptions, User } from "discord.js";

export interface Interaction extends Message {
  commandName: string;
  user: User;
  options: {
    _group: null;
    _subcommand: null;
    _hoistedOptions: any;
  };
  reply: (
    options: string | MessagePayload | ReplyMessageOptions
  ) => Promise<Message>;
  deferReply: Function;
  editReply: Function;
  deleteReply: Function;
}
