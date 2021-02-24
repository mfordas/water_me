import { useCountWatering } from '../hooks';
import setCurrentDate from '../setCurrentDate';
import { renderHook } from '@testing-library/react-hooks';

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
