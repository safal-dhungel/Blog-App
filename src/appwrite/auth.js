import conf from "../conf";
import { Client, Account, ID } from "appwrite";
import { showInfoAlert } from "../store/infoAlertSlice";
export class AuthService {
  client = new Client();
  account;
  dispatch ;

  constructor(dispatch) {
    this.dispatch = dispatch;
    this.client
      .setEndpoint(conf.appwrite_Url)
      .setProject(conf.appwrite_ProjectId);

    this.account = new Account(this.client);
  }

  //create a new account
  async createAccount({ email, password, username }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), // generate unique id for user
        email,
        password,
        username
      );
      //if new account is created , login
      if (userAccount) {
        return this.login(email, password);
      } else {
        return false;
      }
    } catch (error) {
      console.error("Appwrite service :: createAccount() :: ", error);
      this.dispatch(
        showInfoAlert({
          message:error.message,
        })
      );
      throw error;
    }
  }

  // log into account
  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Appwrite service :: login() :: ", error);
      this.dispatch(
        showInfoAlert({
          message:error.message,
        })
      );
      throw error;
    }
  }

  // get current logged in user's info
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser() :: ", error);
      // this.dispatch(
      //   showInfoAlert({
      //     message:error.message,
      //   })
      // );
      return false;
    }
  }

  // log out from current account
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout() :: ", error);
      this.dispatch(
        showInfoAlert({
          message:error.message,
        })
      );
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
