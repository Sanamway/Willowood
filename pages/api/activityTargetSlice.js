import { createSlice } from "@reduxjs/toolkit";

const activityTarget = createSlice({
  name: "Activity",
  initialState: {
    type: "Add",
    id: "",
    cId: "",
    bgId: "",
    buId: "",
    mCatId: "",
  },
  reducers: {
    viewForm: (state, action) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
      action.cId = action.payload.cId;
      action.bgId = action.payload.bgId;
      action.buId = action.payload.buId;
      action.mCatId = action.payload.mCatId;
    },
    editForm: (state, action) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
      action.cId = action.payload.cId;
      action.bgId = action.payload.bgId;
      action.buId = action.payload.buId;
      action.mCatId = action.payload.mCatId;
    },
  },
});

export const { viewForm, editForm } = activityTarget.actions;
export default activityTarget.reducer;
