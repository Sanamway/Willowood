import { createSlice } from '@reduxjs/toolkit';

const rspAnalyticalSlice = createSlice({
    name: 'rspAnalytics',
    initialState: {
        rspAnalyticalData: [],
    },
    reducers: {
        setRSPAnalyticalData: (state, action) => {
            state.rspAnalyticalData = action.payload;
        },
    },
});

export const { setRSPAnalyticalData } = rspAnalyticalSlice.actions;

export default rspAnalyticalSlice.reducer;
