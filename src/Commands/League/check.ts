import { validServers, get, formatRanks, formatChamps } from "./helpers";
import { Interaction } from "../../Interfaces/Interaction";
import errorHandler from "../../Errors/handler";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "check",
  description: "Displays information about a League of Legends account.",
  aliases: [],
  arguments: [
    {
      key: "summoner",
      description: "The League of Legends account name.",
      required: true,
    },
    {
      key: "server",
      description: "The League of Legends server (EUW1, NA1, etc.)",
      required: false,
    },
    {
      key: "champions",
      description:
        "The Number of champions you want to display information for",
      required: false,
    },
  ],
  run: async (client, message) => {
    try {
      const interaction = message as Interaction;
      const summonerName = get.summonerName(interaction);
      const championCount = get.championsCount(interaction);
      const serverName = get.serverName(client, interaction);

      const version = await get.latestVersion(client);

      const summoner = await get.summoner(client, summonerName, serverName);
      if (!summoner) {
        throw {
          message: `Summoner \`${summonerName}\` Not Found`,
          error_code: 404,
        };
      }

      const rankData = await get.rank(client, summoner.id, serverName);
      const champData = await get.champions(
        client,
        summoner.id,
        version,
        championCount,
        serverName
      );

      if (!validServers.includes(serverName)) {
        throw {
          message: `Server not Found: \`${serverName}\`\nValid Servers: \`${validServers.join(
            "`, `"
          )}\``,
          error_code: 404,
        };
      }

      const accountIcon = get.url({
        key: "icon",
        version,
        iconID: summoner.profileIconId,
      });
      const basicAccountInfo = `${summoner.name} - Level ${summoner.summonerLevel}`;
      const rankedMessageInfo = formatRanks(rankData).join("\n");
      const champMessageInfo = formatChamps(champData);
      const color = get.messageColorByRank(rankData);

      const hasChampHistory = Boolean(champData[0]);
      const thumbnailURL = hasChampHistory
        ? get.url({
            key: "championImg",
            version,
            championName: champData[0].name,
          })
        : null;

      return {
        author: {
          name: basicAccountInfo,
          iconURL: accountIcon,
        },
        description: rankedMessageInfo,
        color: color,
        fields: champMessageInfo,
        thumbnail: {
          url: thumbnailURL,
        },
        timestamp: Date.now(),
        footer: {
          text: "Cr46",
          iconURL: "https://i.imgur.com/xn5SseQ.png",
        },
      };
    } catch (error) {
      errorHandler({
        client,
        error,
        module: "League of Legends",
        channelID: "511624993105379329",
      });
    }
  },
};
