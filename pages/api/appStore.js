import activityTargetSlice from "./activityTargetSlice";

const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
  reducer: {
    activityTarget: activityTargetSlice,
  },
});
export default appStore;
