import { useState, useEffect } from 'react';
import setCurrentDate from './setCurrentDate';

export const useCountWatering = (
  lastWateringDate: Date,
  wateringCycle: number
) => {
  const currentDate = setCurrentDate(new Date());
  const oneDayInMiliseconds = 86400000;

  const [nextWateringIn, setNextWatering] = useState(0);

  useEffect(() => {
    const countDaysSinceLastWatering =
      (new Date(currentDate).getTime() - new Date(lastWateringDate).getTime()) /
      oneDayInMiliseconds;

    const nextWateringIn = wateringCycle - countDaysSinceLastWatering;

    setNextWatering(nextWateringIn);
  }, [lastWateringDate, currentDate, wateringCycle]);

  return { nextWateringIn, currentDate };
};
