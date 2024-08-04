import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import priceReducer from './features/priceSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  price: priceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for non-serializable data (e.g., for `redux-persist`)
    }),
});

export const persistor = persistStore(store);
