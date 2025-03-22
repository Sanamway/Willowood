import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collectionTableData: [],
    },
    reducers: {
        setCollectionTableData: (state, action) => {
            state.collectionTableData = action.payload;
        },
    },
});

export const { setCollectionTableData } = collectionSlice.actions;

export default collectionSlice.reducer;
