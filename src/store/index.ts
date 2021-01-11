import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';

export const makeRootReducer = (history: History): Reducer =>
    // https://github.com/supasate/connected-react-router/issues/325
    // @ts-ignore
    combineReducers({
        router: connectRouter(history),
    });

export const initialState = {};

export default makeRootReducer;
