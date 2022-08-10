import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { routes } from "../Routes/routes";
import {
  hideSpinner,
  showSpinner,
} from "../store/slicers/globalSpinner.slicer";
import { store } from "../store/store";

import { localStorageKeys } from "../utils/constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "Nenhum-endpoint-configurado-no-arquivo-.env",
  validateStatus: (status) =>
    [400, 401, 403, 404, 409, 422, 200, 201, 204, 304].includes(status),
});

const globalSpinnerShow = () => {
  if (!store.getState()?.globalSpinnerStore?.showSpinner) {
    store.dispatch(showSpinner());
  }
};

const globalSpinnerHide = () => {
  const hide = setTimeout(() => {
    store.dispatch(hideSpinner());
  }, 500);
  return () => clearTimeout(hide);
};

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    globalSpinnerShow();
    let authorization = "";
    try {
      let userToken = localStorage.getItem(localStorageKeys.userToken);
      authorization = userToken ? userToken : "";
    } catch (e) {
      console.log("Sem autorização", e);
    }
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    globalSpinnerHide();
    if (response.status === 401) {
      window.location.href = routes.auth.login;
    } else {
      return Promise.resolve(response);
    }
  },
  async (error) => {
    globalSpinnerHide();
    if (error.status === undefined) {
    } else {
      console.log("API ERROR", error);
    }
  }
);

export default axiosInstance;
