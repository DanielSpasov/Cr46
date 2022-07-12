import { Interaction, SubCommand } from "../../../Interfaces/Core";
import errorHandler from "../../../Handlers/error";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../../Client";
import { get, format } from "../helpers";

export const command: SubCommand = {
  name: "check",
  description: "Displays information about a League of Legends account.",
  options: [
    {
      name: "summoner",
      description: "The League of Legends account name.",
      type: "String",
      required: true,
    },
    {
      name: "server",
      description: "The League of Legends server (EUW1, NA1, etc.)",
      type: "String",
      required: false,
    },
    {
      name: "champions",
      description:
        "The Number of champions you want to display information for",
      type: "Integer",
      required: false,
    },
  ],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      // Command arguments
      const summonerName = get.summonerName(interaction);
      const serverName = get.serverName(client, interaction);
      const championCount = get.championsCount(client, interaction);

      // API Requests
      const version = await get.latestVersion(interaction);
      const summoner = await get.summoner(
        interaction,
        summonerName,
        serverName
      );
      const rankData = await get.rank(summoner.id, serverName);
      const champData = await get.champions(
        summoner.id,
        version,
        championCount,
        serverName
      );

      // Message Formatting
      const basicAccountInfo = `${summoner.name} - Level ${summoner.summonerLevel}`;
      const rankedMessageInfo = format.ranks(rankData).join("\n");
      const champMessageInfo = format.champions(champData);
      const color = format.rankColor(rankData);
      const hasChampHistory = Boolean(champData[0]);
      const thumbnailURL = hasChampHistory
        ? get.url({
            key: "championImg",
            version,
            championName: champData[0].name,
          })
        : null;

      const accountIcon = get.url({
        key: "icon",
        version,
        iconID: summoner.profileIconId,
      });
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
        footer: {
          text: "All information gathered from • Riot Games API",
          iconURL: get.url({ key: "apiIcon" }),
        },
      };
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "League of Legends",
      });
    }
  },
};
