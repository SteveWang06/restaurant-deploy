import { combineReducers } from "@reduxjs/toolkit";
import app from './app';
import restaurant from './restaurant';
interface AsyncReducerProps {
  [key: string]: any;
}

export const rootReducer = {
    app,
    restaurant,
};

const createReducer = (asyncReducer?: AsyncReducerProps) =>
  combineReducers({
    ...asyncReducer,
    ...rootReducer,
  });

export default createReducer;
