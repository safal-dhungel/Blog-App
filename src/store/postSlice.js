import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  loadingPosts: true,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storePosts(state, action) {
      state.postList = action.payload;
    },
    toggleLoading(state, action) {
      state.loadingPosts = action.payload;
    },
    removePost(state, action) {
      const postId = action.payload;
      state.postList = state.postList.filter((post) => post.$id !== postId);
    },
  },
});

export const { storePosts, toggleLoading, removePost } = postSlice.actions;
export default postSlice.reducer;
