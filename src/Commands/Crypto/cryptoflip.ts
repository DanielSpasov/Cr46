import { Command, Interaction } from "../../Interfaces/Core";
import { Coin } from "../../Interfaces/Crypto/Coin";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { format, get } from "./helpers";

export const command: Command = {
  name: "cryptoflip",
  description:
    "Cr46's chooses one of the top 100 cryptocurrencies on the market.",
  arguments: [
    {
      key: "coin",
      description: "Cryptocurrency.",
      required: true,
    },
  ],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const userChoice = get.coin(interaction);
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

      return format.cryptoflipMessage(client, userCrypto, randomCrypto);
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
