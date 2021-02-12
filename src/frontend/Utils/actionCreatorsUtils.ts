import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../redux_reducers';
import { middleware } from '../redux_store/reduxStore';

type InitialState = {};

export const testStore = (initialState: InitialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
