"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Loading } from "./loading";

// là 1 cái kho chứa các reducer.
export const store = configureStore({
  reducer: {
    // tên reducer: hàm_reducer.reducer
    setIsLoading: Loading.reducer,
  },
});

// => các loại RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;

// => type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
