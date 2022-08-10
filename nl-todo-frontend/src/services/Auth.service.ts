import { AxiosResponse } from "axios";
import axiosInstance from "../middleware/axios.interceptors";
import { responseStatus } from "../utils/constants";

let showReponsesInConsole = process.env.REACT_APP_SHOW_RESPONSES_IN_CONSOLE;

const baseUrlLogin = "auth/login";
const baseUrlSignUp = "user";

export const AuthService = {
  doLogin: async (data: any) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.post(baseUrlLogin, data);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log("Error in AuthService.doLogin", err);
    } finally {
      if (showReponsesInConsole) {
        console.log("AuthService.doLogin", response);
      }
    }
  },

  doSignUp: async (data: any) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.post(baseUrlSignUp, data);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log("Error in AuthService.doSignUp", err);
    } finally {
      if (showReponsesInConsole) {
        console.log("AuthService.doSignUp", response);
      }
    }
  },
};
