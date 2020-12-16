import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../redux_reducers';
import { middleware } from '../redux_store/reduxStore';

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState);
};