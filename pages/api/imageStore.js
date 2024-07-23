import imageSlice from "./imageSlice";

const { configureStore } = require("@reduxjs/toolkit");

const imageStore = configureStore({
  reducer: {
    image: imageSlice,
  },
});
export default imageStore;
