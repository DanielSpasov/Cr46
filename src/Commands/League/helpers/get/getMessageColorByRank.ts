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
  "#5b1973",
  "#4d4d4d",
  "#7a5c2f",
  "#999897",
  "#f5db49",
  "#39cc91",
  "#05adf5",
  "#a025b0",
  "#ad2a5a",
  "#05f5ed",
];

export const getMessageColorByRank = (rankData: Rank[]): string => {
  let highestRank = 0;
  rankData.forEach((rank) => {
    if (ranks.indexOf(rank.tier) > highestRank) {
      highestRank = ranks.indexOf(rank.tier);
    }
  });
  return mapColor[highestRank];
};
