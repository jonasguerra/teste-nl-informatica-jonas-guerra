import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  hideSpinner,
  showSpinner,
} from "../store/slicers/globalSpinner.slicer";
import { store } from "../store/store";

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
  }, 700);
  return () => clearTimeout(hide);
};

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    globalSpinnerShow();
    let authorization = "";
    try {
      authorization = JSON.parse(localStorage.getItem("userDetails"));
    } catch (e) {
      console.log("Sem autorização", e);
    }
    if (authorization) {
      config.headers.Authorization = "Bearer " + authorization.access;
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
      window.location.href = "/brasdiesel/login";
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
