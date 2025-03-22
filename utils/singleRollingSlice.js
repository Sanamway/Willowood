import { createSlice } from '@reduxjs/toolkit';

const singleRollingSlice = createSlice({
    name: 'singleRolling',
    initialState: {
        singleRollingTableData: [],
    },
    reducers: {
        setSingleRollingTableData: (state, action) => {
            state.singleRollingTableData = action.payload;
        },
    },
});

export const { setSingleRollingTableData } = singleRollingSlice.actions;

export default singleRollingSlice.reducer;
