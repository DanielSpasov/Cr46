import { Command } from "../../Interfaces";
import errorHandler from "../../Errors/handler";

export const command: Command = {
  name: "test",
  aliases: [],
  run: async (client, message, args) => {
    try {
      console.log("test");
    } catch (error) {
      errorHandler(client, error);
    }
  },
};
