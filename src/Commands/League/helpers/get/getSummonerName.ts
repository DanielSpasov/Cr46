import { Interaction } from "../../../../Interfaces/Interaction";

export const getSummonerName = (interaction: Interaction): string => {
  return interaction.options._hoistedOptions.find((x) => x.name === "summoner")
    .value;
};
