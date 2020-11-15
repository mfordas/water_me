import React from 'react';
import { Link } from 'react-router-dom';

import './scss/google.scss';


const ConfirmGoogle = () => {
    return (
        <>
            <p>Konto założone!</p>
            <p> Możesz teraz się zalogować.</p>
            <Link className="button" to="/home" >Strona główna</Link>
        </>
    );
}

export default ConfirmGoogle;