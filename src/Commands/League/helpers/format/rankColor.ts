import { Rank } from "../../../../Interfaces/League";

const ranks = [
  "UNRANKED",
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "MASTER",
  "GRANSMASTER",
  "CHALLENGER",
];

const mapColor = [
  "BLUE",
  "#4d4d4d",
  "DARK_ORANGE",
  "GREY",
  "GOLD",
  "AQUA",
  "BLUE",
  "#a025b0",
  "LUMINOUS_VIVID_PINK",
  "YELLOW",
];

export const rankColor = (rankData: Rank[]): string => {
  let highestRank = 0;
  rankData.forEach((rank) => {
    if (ranks.indexOf(rank.tier) > highestRank) {
      highestRank = ranks.indexOf(rank.tier);
    }
  });
  return mapColor[highestRank];
};
