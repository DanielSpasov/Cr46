import errorHandler from "../Handlers/error";
import { readdirSync } from "fs";
import ExtendedClient from ".";
import path from "path";

const setupCommands = (client: ExtendedClient) => {
  try {
    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        client.commands.set(command.name, command);
      }

      readdirSync(`${commandPath}/${dir}`).forEach((innerDir) => {
        if (innerDir !== "commands") return;
        const subCommandPath = `${commandPath}/${dir}/${innerDir}`;
        const subCommands = readdirSync(subCommandPath).filter((file) =>
          file.endsWith(".ts")
        );

        for (const file of subCommands) {
          const { command: subCmd } = require(`${subCommandPath}/${file}`);
          const command = client.commands.get(dir.toLowerCase());
          command.subCommands.set(subCmd.name, subCmd);
        }
      });
    });
  } catch (error) {
    errorHandler({ client, error });
  }
};
export default setupCommands;
