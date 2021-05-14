import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { rootReducer } from '../redux_reducers';

export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  typeof rootReducer,
  unknown,
  Action<string>
>;

export type AppThunkWithReturn<ReturnType = Promise<string>> = ThunkAction<
  ReturnType,
  typeof rootReducer,
  unknown,
  Action<string>
>;
    
const initialState = {};

export const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
