import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  
  return (
      <div className="viewContainer">
        <p>Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz o podelewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy
          i innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz otrzymywał
           kolejne przypomnienia, które uratują Twoje rośliny. </p>
        <Link className="button" to="/register">Zarejestruj nowe konto</Link>
        <Link className="button" to="/login">Zaloguj</Link>
      </div>
  );
};

export default HomePage;