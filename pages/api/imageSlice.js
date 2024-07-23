import { categoryData } from "@/components/Dashboard/sampleData";
import { createSlice } from "@reduxjs/toolkit";

const imageData = createSlice({
  name: "AddImage",
  initialState: {
    imageData: "",
  },

  reducers: {
    addImage: (state, action) => {
      state.imageData = action.payload;
    },
  },
});

export const { addImage } = imageData.actions;
export default imageData.reducer;
