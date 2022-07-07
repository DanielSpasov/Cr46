import { Routes } from "discord-api-types/v9";
import errorHandler from "../Errors/handler";
import { REST } from "@discordjs/rest";
import ExtendedClient from ".";

const setupCommandIntegrations = async (client: ExtendedClient) => {
  try {
    const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

    const commands = [
      {
        name: "ping",
        description: "Shows the latency.",
      },
    ];

    const guilds = await client.guilds.fetch();
    guilds.forEach((guild) => {
      rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), {
        body: commands,
      });
    });
  } catch (error) {
    errorHandler(client, error);
  }
};
export default setupCommandIntegrations;
