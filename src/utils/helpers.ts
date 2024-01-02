export const sameDate = (a: Date, b: Date) => {
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return a.getTime() === b.getTime();
};

export const weekNumber = (
  year: number | Date | string,
  month?: number,
  day?: number
) => {
  const serial = (days: number) => 86400000 * days;

  const dateserial = (year: number, month: number, day: number) =>
    new Date(year, month - 1, day).valueOf();

  const weekday = (date: number) => new Date(date).getDay() + 1;

  const yearserial = (date: number) => new Date(date).getFullYear();

  const date =
      year instanceof Date
        ? year.valueOf()
        : typeof year === "string"
        ? new Date(year).valueOf()
        : dateserial(year, month, day),
    date2 = dateserial(
      yearserial(date - serial(weekday(date - serial(1))) + serial(4)),
      1,
      3
    );

  return ~~((date - date2 + serial(weekday(date2) + 5)) / serial(7));
};
