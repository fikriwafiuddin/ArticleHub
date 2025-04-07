import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import articleReducer from "./slices/articleSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
})

export default store
