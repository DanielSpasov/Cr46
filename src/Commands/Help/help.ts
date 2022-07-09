import { Command } from "../../Interfaces/Core";

export const command: Command = {
  name: "help",
  arguments: [],
  aliases: [],
  run: async (client, message, args) => {
    try {
      console.log("help");
    } catch (error) {
      console.log(error);
    }
  },
};
