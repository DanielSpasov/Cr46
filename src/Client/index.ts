import { Command, Event, Config } from "../Interfaces/Core";
import { Client, Collection } from "discord.js";
import setupSlashCommands from "./slashCommands";
import setupCommands from "./commands";
import setupEvents from "./events";
import dotenv from "dotenv";

dotenv.config();
class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config = {
    default_league_server: "euw1",
    default_number_of_champs: 3,
    startup_wallet_balance: 500,
    ephemeral_commands: ["wallet", "setupwallet", "daily"],
  };

  public async init() {
    await this.login(process.env.BOT_TOKEN);
    setupEvents(this);
    setupCommands(this);
    setupSlashCommands(this);
  }
}

export default ExtendedClient;
