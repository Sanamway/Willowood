

import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import rollingReducer from './rollingSlice';
import dealerCountReducer from './dealerCountSlice'
import rspAnalyticalReducer from './rspAnalyticalSlice'
import singleRollingReducer from './singleRollingSlice'


const appStore = configureStore({
    reducer: {
        collection: collectionReducer,
        rolling: rollingReducer,
        dealer: dealerCountReducer,
        rspAnalytics: rspAnalyticalReducer,
        singleRolling: singleRollingReducer
    },
});

export default appStore;