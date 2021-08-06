const intl = new Intl.DateTimeFormat('lt-LT');

export const getMonthName = (date: Date): string =>
  date.toLocaleString('en-LT', { month: 'long' });

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
  return intl.format(firstDate) === intl.format(secondDate);
};

export const isTheSameMonth = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getMonth() === secondDate.getMonth();
};

export const getWeekdayName = (dayId: number): string => {
  const weekdays: { [key: number]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  return weekdays[dayId];
};

export const getDateString = (date: Date): string => {
  return intl.format(date);
};

export const getTimeString = (date: Date): string => {
  return new Intl.DateTimeFormat('en-LT', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);
};

export const calculateDayDifference = (date1: Date, date2: Date): number => {
  const dayInMiliseconds = 86400000;

  const date1WithoutHours = new Date(getDateString(date1));
  const date2WithoutHours = new Date(getDateString(date2));

  return (
    (date2WithoutHours.getTime() - date1WithoutHours.getTime()) /
    dayInMiliseconds
  );
};

export const getFullDate = (date: string, hours: string): Date => {
  console.log(date, hours);
  return new Date(`${date} ${hours}`);
};
