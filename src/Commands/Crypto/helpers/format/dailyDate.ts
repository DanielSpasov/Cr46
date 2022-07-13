export const formatDailyDate = (date: Date): string => {
  const textMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [day, month, year, rawHour, rawMinute] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ];

  const hour = rawHour < 10 ? `0${rawHour}` : rawHour;
  const minute = rawMinute < 10 ? `0${rawMinute}` : rawMinute;

  return `\`${day + 1}-${textMonth[month]}-${year} ${hour}:${minute}\``;
};
