import { ExtendedChampion } from "../../../../Interfaces/League";
import { EmbedField } from "discord.js";

export const champions = (champions: ExtendedChampion[]): EmbedField[] => {
  return champions.map((champ: ExtendedChampion) => {
    return {
      name: champ.name,
      value: `Points: \`${champ.championPoints.toLocaleString()}\`\nMastery Level: \`${
        champ.championLevel
      }\``,
      inline: true,
    };
  });
};
