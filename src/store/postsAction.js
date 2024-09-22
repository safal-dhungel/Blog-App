import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { showAlert } from "./alertSlice";
import { storePosts, toggleLoading } from "./postSlice";

export const fetchPosts = (dispatch) => {
  
    appwriteService.dispatch = dispatch ;
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    dispatch(
      showAlert({
        message: "Fetching Posts",
        type: "loading",
      })
    );

    try {
      const response = await appwriteService.getPosts([]);
      if (response) {
        dispatch(storePosts(response.documents));
        dispatch(
          showAlert({
            message: "Posts Fetched",
            type: "success",
          })
        );
      } else {
        dispatch(
          showAlert({
            message: "Posts were not fetched",
            type: "warning",
          })
        );
      }
    } catch (error) {
      dispatch(
        showAlert({
          message: error.message || "Error fetching posts",
          type: "error",
        })
      );
    } finally {
      dispatch(toggleLoading(false));
    }
  };
};
