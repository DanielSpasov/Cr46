import { Champion } from "../../../Interfaces/League";

export const formatChamps = (champions: Champion[]) => {
  return champions.map((champ: Champion) => {
    return {
      name: champ.name,
      value: `Points: \`${champ.championPoints.toLocaleString()}\`\nMastery Level: \`${
        champ.championLevel
      }\``,
      inline: true,
    };
  });
};
