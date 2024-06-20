import chartSlice from "./chartSlice";

const { configureStore } = require("@reduxjs/toolkit");

const chartStore = configureStore({
  reducer: {
    chart: chartSlice,
  },
});
export default chartStore;
