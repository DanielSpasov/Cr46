export const url = ({
  key,
  cryptoID,
}: {
  key: string;
  cryptoID?: number;
}): string => {
  switch (key) {
    case "top100":
      return `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    case "cryptoImg":
      return `https://s2.coinmarketcap.com/static/img/coins/128x128/${cryptoID}.png`;
  }
};
