import { Coin } from "../../../../Interfaces/Crypto/Coin";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../../../Client";
import { get } from "../get";

export const cryptoflipMessage = (
  client: ExtendedClient,
  userCrypto: Coin,
  randomCrypto: Coin,
  amount: number | null
): MessageEmbedOptions => {
  const isWinner = userCrypto === randomCrypto;

  const noAmountWinnerName = "You guessed the cryptocurrency! Congratulations!";
  const noAmountLoserName = "You just lost your life savings! Congratulations!";
  const amountWinnerName = (am) => `Congratulations you just won $${am * 100}!`;
  const amountLoserName = (am) => `You just lost $${am}! Congratulations!`;

  const winnerName = amount ? amountWinnerName(amount) : noAmountWinnerName;
  const loserName = amount ? amountLoserName(amount) : noAmountLoserName;

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
      text: "All data provided by CoinMarketCap",
      iconURL: get.url({ key: "apiIcon" }),
    },
  };
};
