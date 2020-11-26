import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import plantsListsReducer from './plantsListsReducer';


export default combineReducers({
  loginData: loginReducer,
  registerData: registerReducer,
  plantsListsData: plantsListsReducer,
});
