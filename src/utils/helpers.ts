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
  function serial(days: number) {
    return 86400000 * days;
  }

  function dateserial(year: number, month: number, day: number) {
    return new Date(year, month - 1, day).valueOf();
  }

  function weekday(date: number) {
    return new Date(date).getDay() + 1;
  }

  function yearserial(date: number) {
    return new Date(date).getFullYear();
  }

  var date =
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
