import Wallet from "../../../../Database/Models/Wallet";
import { Interaction } from "../../../../Interfaces/Core";

export const getCoin = (interaction: Interaction): string => {
  const _coin = interaction.options._hoistedOptions
    .find((x) => x.name === "coin")
    .value.toLowerCase();
  return _coin;
};

export const getAmount = async (
  interaction: Interaction
): Promise<number | null> => {
  const enteredAmount = interaction.options._hoistedOptions.find(
    (x) => x.name === "bet-amount"
  );
  if (!enteredAmount) return null;

  const amount = Number(enteredAmount.value);
  if (isNaN(amount) || amount < 1) {
    throw {
      message: `\`${enteredAmount.value}\` is not a valid amount, please enter a number.`,
      error_code: 400,
    };
  }

  return amount;
};
