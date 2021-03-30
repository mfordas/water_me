import React from 'react';

import ErrorMessage from '../ErrorMessage/errorMessage';
import './scss/plantsList.scss';

type Input = {
  formSubmitted: boolean;
  wateringCycle: number;
  setWateringCycle: React.Dispatch<React.SetStateAction<number>>;
};

export const WateringInput = ({
  formSubmitted,
  wateringCycle,
  setWateringCycle,
}: Input) => {
  const validateWateringCycle = () => {
    if (formSubmitted && wateringCycle === 0) {
      return <ErrorMessage errorText='Wpisz częstotliwość podlewania' />;
    }
  };

  return (
    <>
      <label data-test='WateringInput'>
        Podlewanie co:
        <input
          type='number'
          min={0}
          value={wateringCycle}
          onChange={(e) => {
            setWateringCycle(e.target.valueAsNumber);
          }}
        />
        {wateringCycle === 1 ? `dzień` : 'dni'}
      </label>
      {validateWateringCycle()}
    </>
  );
};

export default WateringInput;
