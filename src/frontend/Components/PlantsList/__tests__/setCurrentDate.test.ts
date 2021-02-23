import setCurrentDate from '../setCurrentDate';

describe('It should return date string', () => {
  it('Should return date string without adding 0 if day and month > 9', () => {
    const date = setCurrentDate(new Date(2021, 9, 10));

    expect(date).toBe('2021-10-10');
  });

  it('Should return date string with adding 0 if day and month <= 9', () => {
    const date = setCurrentDate(new Date(2021, 8, 9));

    expect(date).toBe('2021-09-09');
  });
});
