import { createStore } from 'redux';
import { appReducer } from './../Reducer/Reducer.js';

let store = createStore(appReducer)