import { GoogleRegisterConnected } from '../../Components/Register/googleRegister';
import { GoogleAuthConnected } from '../../Components/Login/googleAuth';

export const HomePage = () => {
  return (
    <div className='viewContainer' data-test='homePage'>
      <p>
        Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz
        o podlewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy i
        innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci
        znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz
        otrzymywał kolejne przypomnienia, które uratują Twoje rośliny.{' '}
      </p>
      <GoogleRegisterConnected />
      <GoogleAuthConnected />
    </div>
  );
};
