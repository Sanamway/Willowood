import { createSlice } from '@reduxjs/toolkit';

const rollingSlice = createSlice({
    name: 'rolling',
    initialState: {
        rollingTableData: [],
    },
    reducers: {
        setRollingTableData: (state, action) => {
            state.rollingTableData = action.payload;
        },
    },
});

export const { setRollingTableData } = rollingSlice.actions;

export default rollingSlice.reducer;
