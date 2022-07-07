import { Interaction, MessageEmbed } from "discord.js";
import axios from "axios";

import { Command } from "../../Interfaces";
import { ILeagueVersions, ISummoner } from "../../Interfaces/League";

import { getURL, getChampions, getRanked } from "./getters";
import { menus } from "../Help/Menus";
import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { message as messageService } from "../../Messages";

const validServers = [
  "br1",
  "eun1",
  "euw1",
  "jp1",
  "la1",
  "la2",
  "kr",
  "na1",
  "oc2",
  "ru",
  "tr1",
];

export const command: Command = {
  name: "check",
  description:
    "Sends a message with information about a specific League of Legends account.",
  arguments: [
    {
      key: "summoner",
      description: "The League of Legends account name.",
      required: true,
    },
    {
      key: "server",
      description: `Valid Servers: ${validServers.join(", ")}`,
      required: false,
    },
  ],
  aliases: [],
  run: async (client, message, args) => {
    try {
      const guild = await Guild.findOne({ id: message.guildId });
      if (!guild.league.allowed) {
        return menus.league.checkNotAllowed(message, guild.prefix);
      }

      const interaction = message as any;
      const summonerName = interaction.options._hoistedOptions.find(
        (x) => x.name === "summoner"
      ).value;
      const serverProps = interaction.options._hoistedOptions.find(
        (x) => x.name === "server"
      );
      const server = serverProps
        ? { value: serverProps.value.toLowerCase() }
        : { value: "euw1" };

      if (server && !validServers.includes(server.value)) {
        throw {
          type: "League of Legends Error (Common)",
          message: "Invalid Server",
          error_code: 404,
        };
      }

      const versions = await axios.get<ILeagueVersions>(
        getURL({ key: "versions" }),
        client.config.requestOptions
      );
      const latest = versions.data[0];

      const summoner = await axios.get<ISummoner>(
        getURL({ key: "summoner", summonerName, server: server.value }),
        client.config.requestOptions
      );

      const accMessage = await messageService.send({
        client,
        channelID: message.channel.id,
        embed: {
          color: "BLUE",
          author: {
            name: `${summoner.data.name} - Level ${summoner.data.summonerLevel}`,
            iconURL: getURL({
              key: "profileIcon",
              version: latest,
              iconID: summoner.data.profileIconId,
            }),
          },
        },
      });

      const description = await getRanked(client, summoner, server.value);
      messageService.edit({
        message: accMessage,
        embed: {
          description: description,
        },
      });

      const fields = await getChampions(
        client,
        summoner,
        latest,
        9,
        server.value
      );
      messageService.edit({
        message: accMessage,
        embed: {
          fields: fields,
        },
      });
    } catch (error) {
      errorHandler(client, error, "511624993105379329");
    }
  },
};
