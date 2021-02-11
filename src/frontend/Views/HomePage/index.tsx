import React from 'react';

import RegisterComponent from '../../Components/Register';
import LoginComponent from '../../Components/Login';


const HomePage = () => {
  
  return (
      <div className="viewContainer">
        <p>Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz o podlewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy
          i innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz otrzymywał
           kolejne przypomnienia, które uratują Twoje rośliny. </p>
        <RegisterComponent />
        <LoginComponent />
      </div>
  );
};

export default HomePage;