import { Client } from "discord.js";

import { sendMessage } from "../../Services/Core/sendMessage";

export const status = async (client: Client) => {
  sendMessage({
    client,
    embed: {
      description: `<@${client.user.id}> is running in **${
        process.env.NODE_ENV
      }** mode.\n\n\`${getDate()}\``,
      color: "GREEN",
    },
  });
  console.log("Cr46 is Online!");
};

const getDate = (): string => {
  const mapMonth = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const date = new Date();
  const [initialDay, month, year, initialHour, initialMinute, initialSecond] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getUTCSeconds(),
  ];
  const day = initialDay < 10 ? `0${initialDay}` : initialDay;
  const hour = initialHour < 10 ? `0${initialHour}` : initialHour;
  const minute = initialMinute < 10 ? `0${initialMinute}` : initialMinute;
  const second = initialSecond < 10 ? `0${initialSecond}` : initialSecond;
  return `${day}-${mapMonth[month]}-${year} ${hour}:${minute}:${second}`;
};
