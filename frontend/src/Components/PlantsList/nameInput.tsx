import React from 'react';

import { ErrorMessage } from '../ErrorMessage/errorMessage';

import './scss/plantsList.scss';

type Input = {
  formSubmitted: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const NameInput = ({ formSubmitted, name, setName }: Input) => {
  const validateName = () => {
    if (formSubmitted && !name) {
      return <ErrorMessage errorText='Wpisz imię' />;
    } else if (formSubmitted && name.length <= 3) {
      return <ErrorMessage errorText='Imię powinno być dłuższe niż 3 znaki' />;
    }
  };

  return (
    <>
      <label data-test='nameInput'>
        Imię
        <input
            type='text'
            value={name}
            onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      {validateName()}
    </>
  );
};
