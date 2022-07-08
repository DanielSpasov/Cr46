import { Interaction } from "../../../../Interfaces/Interaction";

export const getChampionsCount = (interaction: Interaction): number => {
  const championsData = interaction.options._hoistedOptions.find(
    (x) => x.name === "champions"
  );
  return championsData ? Number(championsData.value.toLowerCase()) : 3;
};
