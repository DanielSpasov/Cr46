import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs'
import path from 'path';

import { Command, Event, Config, Music } from '../Interfaces';

import ConfigJson from '../config.json';
import MusicConfig from '../Commands/Music/utils/music';

import dotenv from 'dotenv'
dotenv.config()



class ExtendedClient extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public music: Music = MusicConfig;
    public config: Config = ConfigJson;

    public async init() {

        this.login(process.env.BOT_TOKEN)

        this.config.requestOptions = { headers: { 'X-Riot-Token': process.env.RIOT_API_KEY } }

        // Commands
        const commandPath = path.join(__dirname, '..', 'Commands');
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
                file.endsWith('.ts')
            );

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    })
                }
            }
        })


        // Events
        const eventPath = path.join(__dirname, '..', 'Events');
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        })
    }

};

export default ExtendedClient;