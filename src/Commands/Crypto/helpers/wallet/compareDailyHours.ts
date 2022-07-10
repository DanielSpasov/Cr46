export const compareDailyHours = (dateOne: Date, dateTwo: Date): boolean => {
  if (!dateOne) return false;

  const msBetweenDates = Math.abs(dateOne.getTime() - dateTwo.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  if (hoursBetweenDates < 24) {
    return true;
  }
  return false;
};
