import errorHandler from "../Errors/handler";
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

        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            client.aliases.set(alias, command);
          });
        }
      }
    });
  } catch (error) {
    errorHandler({ client, error });
  }
};
export default setupCommands;
