const setCurrentDate = (): string => {
  const currentDate = new Date();

  const year = currentDate.getUTCFullYear();
  const month =
    currentDate.getUTCMonth() < 9
      ? `0${currentDate.getUTCMonth() + 1}`
      : currentDate.getUTCMonth();

  const day =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : currentDate.getUTCDate();

  return `${year}-${month}-${day}`;
};

export default setCurrentDate;
