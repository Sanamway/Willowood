import { categoryData } from "@/components/Dashboard/sampleData";
import { createSlice } from "@reduxjs/toolkit";

const chartReports = createSlice({
  name: "Activity",
  initialState: {
    brandItems: [],
    categoryItems: [],
  },

  reducers: {
    addRSPData: (state, action) => {},
    addCollectionData: (state, action) => {
      state.collectionData = action.payload;
    },
  },
});

export const { addCollectionData } = chartReports.actions;
export default chartReports.reducer;
