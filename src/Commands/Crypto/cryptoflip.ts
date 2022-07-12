import { Command, Interaction } from "../../Interfaces/Core";
import { Coin } from "../../Interfaces/Crypto/Coin";
import Wallet from "../../Database/Models/Wallet";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import { format, get, wallet } from "./helpers";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "cryptoflip",
  description:
    "Cr46's chooses one of the top 100 cryptocurrencies on the market.",
  subCommands: [],
  options: [
    {
      name: "coin",
      description: "Cryptocurrency.",
      required: true,
    },
    {
      name: "bet-amount",
      description: "The amount you want to bet.",
      required: false,
    },
  ],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const userChoice = get.coin(interaction);
      const amount = await get.amount(interaction);
      const topCryptos = await get.topHundred();

      const validSymbols = topCryptos.map((x: Coin) => x.symbol.toLowerCase());
      const validNames = topCryptos.map((x: Coin) => x.name.toLowerCase());
      const isSymbol = validSymbols.includes(userChoice);
      const isName = validNames.includes(userChoice);

      if (!isSymbol && !isName) {
        throw {
          message: `\`${userChoice}\` was not found in the top 100 Cryptocurrencies.`,
          error_code: 404,
        };
      }

      const randomCrypto = topCryptos[Math.floor(Math.random() * 100)];
      const userCrypto = topCryptos.find((coin) =>
        isSymbol
          ? coin.symbol.toLowerCase() === userChoice
          : coin.name.toLowerCase() === userChoice
      );

      if (amount) {
        const userID = interaction.user.id;
        const userWallet = await Wallet.findOne({ userID });
        if (!userWallet) {
          throw {
            message: "Failed to find a wallet. Type `/wallet` to create one.",
            error_code: 404,
          };
        }
        if (amount > userWallet.balance) {
          throw {
            message: `Insufficient funds.`,
            error_code: 401,
          };
        }

        await wallet.take(userWallet, amount);
        const isWinner = userCrypto === randomCrypto;
        if (isWinner) {
          await wallet.load(userWallet, amount * 100);
        }
      }

      return format.cryptoflipMessage(client, userCrypto, randomCrypto, amount);
    } catch (error) {
      console.log(error);
      errorHandler({
        client,
        interaction,
        error,
        module: "Cryptocurrency",
      });
    }
  },
};
