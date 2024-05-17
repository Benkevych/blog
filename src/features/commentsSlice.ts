import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../types";

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}
const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commnetsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsList.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Comments are loading");
      })
      .addCase(
        getCommentsList.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload;
          console.log("Comments were loaded");
        }
      )
      .addCase(getCommentsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
        console.log("Failed to fetch comments");
      });
  },
});

export const getCommentsList = createAsyncThunk(
  "commnts/getCommentsList",
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch commnts");
    }
    const data: Comment[] = await response.json();
    return data;
  }
);

export default commnetsSlice.reducer;
