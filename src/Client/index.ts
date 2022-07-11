import { Client, Collection } from "discord.js";
import dotenv from "dotenv";

import { Command, Event, Config } from "../Interfaces/Core";

import setupCommandIntegrations from "./commandIntegration";
import setupCommands from "./commands";
import setupEvents from "./events";

dotenv.config();
class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public config: Config;

  public async init() {
    this.config = {
      default_league_server: "euw1",
      default_number_of_champs: 3,
      startup_wallet_balance: 500,
      ephemeral_commands: ["wallet", "setupwallet", "daily"],
    };

    await this.login(process.env.BOT_TOKEN);

    setupCommands(this);
    setupEvents(this);
    setupCommandIntegrations(this);
  }
}

export default ExtendedClient;
