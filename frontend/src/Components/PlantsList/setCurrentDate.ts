const setCurrentDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month =
    date.getUTCMonth() < 9
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1;

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${year}-${month}-${day}`;
};

export default setCurrentDate;
