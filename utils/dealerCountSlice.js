import { createSlice } from '@reduxjs/toolkit';

const delaerCountSlice = createSlice({
    name: 'dealerCount',
    initialState: {
        dealerCountData: [],
    },
    reducers: {
        setDelaerCountData: (state, action) => {
            state.dealerCountData = action.payload;
        },
    },
});

export const { setDelaerCountData } = delaerCountSlice.actions;

export default delaerCountSlice.reducer;
