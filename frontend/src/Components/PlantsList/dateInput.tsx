import React from 'react';

import './scss/plantsList.scss';

type Input = {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
};

export const DateInput = ({ startDate, setStartDate }: Input) => {
    return (
        <>
            <label data-test='DateInput'>
        Data startu:
                <input
                    type='date'
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                    }}
                />
            </label>
        </>
    );
};
