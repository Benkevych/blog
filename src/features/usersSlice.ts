import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Users are loading");
      })
      .addCase(
        getUsersList.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
          console.log("Users were loaded");
        }
      )
      .addCase(getUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
        console.log("Failed to fetch users");
      });
  },
});

export const getUsersList = createAsyncThunk("users/getUsersList", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: User[] = await response.json();
  return data;
});

export default usersSlice.reducer;
