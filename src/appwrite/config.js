import conf from "../conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";
import { showInfoAlert } from "../store/infoAlertSlice";

export class Service {
  client = new Client();
  databases;
  bucket;
  dispatch;

  constructor(dispatch) {
    this.dispatch = dispatch;
    this.client
      .setEndpoint(conf.appwrite_Url)
      .setProject(conf.appwrite_ProjectId)

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //Database service for storing blog
  //postId is unique for each blog post (UNIQUE ID)

  // get a blog post
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        postId
      );
    } catch (error) {
      console.error("Appwrite service :: getPost() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //get all documents(posts)
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  };

  //create a blog post
  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //update a blog post
  async updatePost({ postId, title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        postId,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //delete a blog post
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //Storage service for storing images
  //upload featuredImage

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_BucketId,
        ID.unique(), //generate unique id for file/image
        file
      );
    } catch (error) {
      console.error("Storage service :: uploadFile() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //delete featuredImage
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwrite_BucketId, fileId);
    } catch (error) {
      console.error("Storage service :: deleteFile() :: ", error);
      this.dispatch(
        showInfoAlert({
          message: error.message,
        })
      );
      return false;
    }
  }

  //preview featuredImage
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwrite_BucketId, fileId).href;
    } catch (error) {
      console.error("Storage service :: getFilePreview() :: ", error);
      return false;
    }
  }
}

// const dispatch = useDispatch()
// const appwriteService = new Service(dispatch);
const appwriteService = new Service();
export default appwriteService;
