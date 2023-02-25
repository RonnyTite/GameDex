import axios, { AxiosPromise } from 'axios';
// export const BASE_URL = 'http://192.168.86.33:1337'; // RasberryPI or server
export const BASE_URL = 'http://localhost:1337'; // Working in localhost

export const axiosInstance = axios.create();

export default {
  get<T>(url:string):AxiosPromise<T> {
    return axiosInstance.get(url);
  },
};
