import React from 'react';

import './scss/errorMessage.scss';

const ErrorMessage = ({ errorText }) => {
    return (
        <div className='errorMessageContainer'>
            {errorText}
        </div>
    )
};

export default ErrorMessage;