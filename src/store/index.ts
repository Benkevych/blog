import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/usersSlice";
import postReducer from "../features/postsSlice";
import commentReducer from "../features/commentsSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
