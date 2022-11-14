import useUserInfoStoreStore from "../stores/hooks/useUserInfoStoreStore";
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const RequestHandler = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = useUserInfoStoreStore.getState().access_token;
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
};

const authHttp = applyCaseMiddleware(axios.create());

authHttp.interceptors.request.use(RequestHandler);

export default authHttp;
