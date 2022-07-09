import { Interaction } from "../../../../Interfaces/Core";

export const coin = (interaction: Interaction): string => {
  const _coin = interaction.options._hoistedOptions
    .find((x) => x.name === "coin")
    .value.toLowerCase();
  return _coin;
};
