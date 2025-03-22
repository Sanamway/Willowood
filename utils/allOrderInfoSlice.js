import { createSlice } from '@reduxjs/toolkit';

const allOrderInfoSlice = createSlice({
    name: 'allOrderInfo',
    initialState: {

        allOrderInfoData: [],
        pageCount: 0,
        currentpage: { selected: 0 }
    },
    reducers: {
        setAllOrderInfoData: (state, action) => {
            state.allOrderInfoData = action.payload.orderInfoData;
            state.pageCount = action.payload.count;
        },
        setPageChange: (state, action) => {
            state.currentpage = action.payload
        }
    },
});

export const { setAllOrderInfoData, setPageChange } = allOrderInfoSlice.actions;

export default allOrderInfoSlice.reducer;
