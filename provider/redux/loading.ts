import { createSlice } from "@reduxjs/toolkit";

// 1 hàm_reducer => có tên name, khởi tạo các state, khai báo các func xử lý state (gọi là action)
export const Loading = createSlice({
  name: "isLoading",
  initialState: {
    isLoading: true,
  },
  reducers: {
    // action
    // payload: giatri truyen vao
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

//setIsLoading là 1 action trong Loading reducer
export const { setIsLoading } = Loading.actions;
