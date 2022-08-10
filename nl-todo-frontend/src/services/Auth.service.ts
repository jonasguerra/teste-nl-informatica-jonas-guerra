import { AxiosResponse } from "axios";
import axiosInstance from "../middleware/axios.interceptors";
import { responseStatus } from "../utils/constants";

let showReponsesInConsole = process.env.REACT_APP_SHOW_RESPONSES_IN_CONSOLE;

const baseUrl = "auth/login";

export const AuthService = {
  doLogin: async (data: any) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.post("auth/login", data);
      console.log(response);
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
};
