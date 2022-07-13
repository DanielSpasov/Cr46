import { Interaction, SubCommand } from "../../../Interfaces/Core";
import { Coin } from "../../../Interfaces/Crypto/Coin";
import Wallet from "../../../Database/Models/Wallet";
import errorHandler from "../../../Handlers/error";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../../Client";
import { get, wallet } from "../helpers";

export const command: SubCommand = {
  name: "flip",
  description:
    "Cr46's chooses one of the top 100 cryptocurrencies on the market.",
  options: [
    {
      name: "coin",
      description: "Cryptocurrency.",
      type: "String",
      required: true,
    },
    {
      name: "bet-amount",
      description: "The amount you want to bet.",
      type: "Integer",
      required: false,
    },
  ],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      // Intreaction Formatting & Validation
      const userChoice = get.coin(interaction);
      const amount = await get.amount(interaction);
      const userWallet = await Wallet.findOne({ userID: interaction.user.id });
      if (amount) {
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
      }

      // API Request & Validation
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

      // Matching Crypto
      const randomCrypto = topCryptos[Math.floor(Math.random() * 100)];
      const userCrypto = topCryptos.find((coin) =>
        isSymbol
          ? coin.symbol.toLowerCase() === userChoice
          : coin.name.toLowerCase() === userChoice
      );

      // Wallet Transactions
      await wallet.take(userWallet, amount);
      const isWinner = userCrypto === randomCrypto;
      if (isWinner) {
        await wallet.load(userWallet, amount * 100);
      }

      // Message Formatting
      const noAmWinnerName = "You guessed the cryptocurrency! Congratulations!";
      const noAmLoserName = "You just lost your life savings! Congratulations!";
      const amWinnerName = (am) => `Congratulations you just won $${am * 100}!`;
      const amLoserName = (am) => `You just lost $${am}! Congratulations!`;

      const winnerName = amount ? amWinnerName(amount) : noAmWinnerName;
      const loserName = amount ? amLoserName(amount) : noAmLoserName;

      const name = isWinner ? winnerName : loserName;
      const color = isWinner ? "GREEN" : "RED";
      const description = isWinner
        ? `It was \`${randomCrypto.name} (${randomCrypto.symbol})\`.\nNow touch grass.`
        : `You chose \`${userCrypto.name} (${userCrypto.symbol})\`,\nbut the crypto was \`${randomCrypto.name} (${randomCrypto.symbol})\`.`;

      return {
        author: {
          name,
          iconURL: get.url({ key: "cryptoImg", cryptoID: userCrypto.id }),
        },
        color,
        description,
        thumbnail: {
          url: get.url({ key: "cryptoImg", cryptoID: randomCrypto.id }),
        },
        footer: {
          text: "All information gathered from • CoinMarketCap API",
          iconURL: get.url({ key: "apiIcon" }),
        },
      };
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "Cryptocurrency",
      });
    }
  },
};
