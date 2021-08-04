export const getMonthName = (date: Date): string =>
  date.toLocaleString('default', { month: 'long' });

export const getMonthTitle = (firstDayOfWeek: Date): string => {
  const lastDayOfWeek = new Date(firstDayOfWeek.getTime());
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  const firstDayMonthName = getMonthName(firstDayOfWeek);
  const lastDayMonthName = getMonthName(lastDayOfWeek);

  return firstDayMonthName === lastDayMonthName
    ? firstDayMonthName
    : `${firstDayMonthName.substr(0, 3)} - ${lastDayMonthName.substr(0, 3)}`;
};

export const getFirstDayOfWeek = (week: Date): Date => {
  const weekCopy = new Date(week.getTime());
  weekCopy.setDate(weekCopy.getDate() - weekCopy.getDay());

  return weekCopy;
};

export const areDatesTheSame = (firstDate: Date, secondDate: Date): boolean => {
  return (
    new Intl.DateTimeFormat('en-us').format(firstDate) ===
    new Intl.DateTimeFormat('en-us').format(secondDate)
  );
};

export const isTheSameMonth = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getMonth() === secondDate.getMonth();
};
