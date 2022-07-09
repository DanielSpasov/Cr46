import { Rank } from "../../../../Interfaces/League";

const mapQueueType = {
  RANKED_SOLO_5x5: "SOLO",
  RANKED_FLEX_SR: "FLEX",
};

const calcWinrate = (wins: number, losses: number): number => {
  return Math.round((wins / (wins + losses)) * 100);
};

export const ranks = (rankData: Rank[]): string[] => {
  return rankData.map((x) => {
    if (!mapQueueType[x.queueType]) return;

    const qType = mapQueueType[x.queueType];
    const rankTier = `**${x.tier} \`${x.rank}\`**`;
    const lp = `\`${x.leaguePoints} LP\``;
    const games = `**${x.wins + x.losses}** Games`;
    const winrate = `\`${calcWinrate(x.wins, x.losses)}%\` **Winrate**`;
    return `${qType} - ${rankTier} - ${lp} - ${games} - ${winrate}`;
  });
};
