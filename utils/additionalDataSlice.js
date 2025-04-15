import { createSlice } from '@reduxjs/toolkit';

const additionalDataSlice = createSlice({
    name: 'additionalData',
    initialState: {
        additionalData: [],
    },
    reducers: {
        setAdditionalData: (state, action) => {
            state.additionalData = action.payload;
        },
    },
});

export const { setAdditionalData } = additionalDataSlice.actions;

export default additionalDataSlice.reducer;
