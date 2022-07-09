import { Coin } from "../../../../Interfaces/Crypto/Coin";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../../../Client";
import { get } from "../get";

export const cryptoflipMessage = (
  client: ExtendedClient,
  userCrypto: Coin,
  randomCrypto: Coin
): MessageEmbedOptions => {
  const isWinner = userCrypto === randomCrypto;

  const name = isWinner
    ? "You guessed the cryptocurrency! Congratulations!"
    : "You just lost your life savings! Congratulations!";
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
    timestamp: Date.now(),
    footer: {
      text: client.user.username,
      iconURL: client.config.bot_icon_url,
    },
  };
};
