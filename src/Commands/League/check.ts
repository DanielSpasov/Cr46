import { Interaction, Command } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { get, format } from "./helpers";

export const command: Command = {
  name: "check",
  description: "Displays information about a League of Legends account.",
  args: [
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
          text: client.user.username,
          iconURL: client.user.avatarURL(),
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
