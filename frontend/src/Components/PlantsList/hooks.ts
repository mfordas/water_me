import { useState, useEffect } from 'react';

import { setCurrentDate } from './setCurrentDate';
import { PlantsListsState } from '../../redux_actions/plantsListsTypes';
import { Plant } from '../../redux_actions/plantsTypes';

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

export const useCreatePlantsList = (
    plantsListsData: PlantsListsState,
    showPlantsList: (plantsListId: number) => void,
    listIndex: number
) => {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        const getPlantsFromList = async () => {
            if (plantsListsData.userId) {
                await showPlantsList(plantsListsData.plantsLists[listIndex].id);

                setPlants(plantsListsData.plants);
            } else {
                console.error('User id not found');
            }
        };

        getPlantsFromList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPlants(plantsListsData.plants);
    }, [plantsListsData.plants]);

    return plants;
};
