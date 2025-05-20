import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'modules/reducers';

export default function setupStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}