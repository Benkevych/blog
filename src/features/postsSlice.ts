import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";
import { RootState } from "../store";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPostsList.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(getPostsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(getPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        const post = action.payload;
        const existingPostIndex = state.posts.findIndex(
          (p) => p.id === post.id
        );
        if (existingPostIndex >= 0) {
          state.posts[existingPostIndex] = post;
        } else {
          state.posts.push(post);
        }
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete post";
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add post";
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        const updatedPosts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
        state.posts = updatedPosts;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add post";
      });
  },
});
export const getPostsList = createAsyncThunk(
  "posts/getPostsList",
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data: Post[] = await response.json();
    return data;
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data: Post = await response.json();
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    return postId;
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData: Post) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error("Failed to send data to server");
    }
    return postData;
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (postData: Post) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update data to server");
    }
    return postData;
  }
);

export const selectPostById = (postId: number) => (state: RootState) =>
  state.posts.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
