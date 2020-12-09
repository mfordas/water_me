const setCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth() + 1;
    const day =
      currentDate.getUTCDate() < 10
        ? `0${currentDate.getUTCDate()}`
        : currentDate.getUTCDate();

    return `${year}-${month}-${day}`;
  };

  export default setCurrentDate;