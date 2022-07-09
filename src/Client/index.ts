import { Client, Collection } from "discord.js";
import dotenv from "dotenv";

import { Command, Event, Config } from "../Interfaces/Core";
import ConfigJson from "../config.json";

import setupCommandIntegrations from "./commandIntegration";
import setupCommands from "./commands";
import setupEvents from "./events";

dotenv.config();
class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public config: Config = ConfigJson;

  public async init() {
    this.config.requestOptions = {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY,
      },
    };

    await this.login(process.env.BOT_TOKEN);

    setupCommands(this);
    setupEvents(this);
    setupCommandIntegrations(this);
  }
}

export default ExtendedClient;
