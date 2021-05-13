import { renderHook } from '@testing-library/react-hooks';

import { useCountWatering, useCreatePlantsList } from '../hooks';
import { setCurrentDate } from '../setCurrentDate';

describe('useCountWatering hook', () => {
    it('Should return number of days to next watering and current date', () => {
        const currentTestDate = setCurrentDate(new Date());
        const twoDaysInMiliseconds = 2 * 24 * 60 * 60 * 1000;
        const lastWatering = new Date(
            new Date(currentTestDate).getTime() - twoDaysInMiliseconds
        );

        const hook = renderHook(() => useCountWatering(lastWatering, 3));

        expect(hook.result.current.nextWateringIn).toBe(1);
        expect(hook.result.current.currentDate).toBe(currentTestDate);
    });
});

describe('useCreatePlantsList hook', () => {
    const testData = {
        plantsListName: 'TestList',
        plantsLists: [
            {
                id: 1,
                userId: 1,
                name: 'TestPlant1',
            },
            {
                id: 2,
                userId: 2,
                name: 'TestPlant2',
            },
            {
                id: 3,
                userId: 3,
                name: 'TestPlant3',
            },
        ],
        userId: '1',
        plantsListDeleted: false,
        plants: [
            {
                id: 1,
                name: 'TestPlant1',
                plantsListId: 1,
                wateringCycle: 1,
                pictureUrl: 'test/path/1',
                wateringCycleBeginingData: new Date(),
                lastTimeWatered: new Date(),
            },
            {
                id: 2,
                name: 'TestPlant2',
                plantsListId: 1,
                wateringCycle: 1,
                pictureUrl: 'test/path/2',
                wateringCycleBeginingData: new Date(),
                lastTimeWatered: new Date(),
            },
            {
                id: 3,
                name: 'TestPlant3',
                plantsListId: 1,
                wateringCycle: 1,
                pictureUrl: 'test/path/3',
                wateringCycleBeginingData: new Date(),
                lastTimeWatered: new Date(),
            },
        ],
    };

    it('Should return array of plants', async () => {
        const hook = renderHook(() => useCreatePlantsList(testData, jest.fn(), 3));

        expect(hook.result.current.length).toBe(3);
    });
});
