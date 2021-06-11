import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import seatAmountReducer from '../features/seatAmount/seatAmountReducer.js';
import seatsReducer from '../features/seats/seatsReducer.js';

const persistConfig = {
  key: "root",
  storage
}

const reducer = combineReducers({
  seatAmount: seatAmountReducer,
  seats: seatsReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)
