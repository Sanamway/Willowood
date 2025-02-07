import { createSlice } from '@reduxjs/toolkit';

const orderInfoSlice = createSlice({
    name: 'orderInfo',
    initialState: {
        orderInfoData: [],
    },
    reducers: {
        setOrderInfoData: (state, action) => {
            state.orderInfoData = action.payload;
        },
    },
});

export const { setOrderInfoData } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;
