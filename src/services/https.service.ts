import axios from 'axios';
import {BASE_PATH, BASE_URL} from '../APICall/constants';
import dataHandlerService from '../APICall/dataHandler.service';
import MessageHandler from '../APICall/messageHandler';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../config';
import {Auth_ROUTES, HOME_ROUTES} from '../constants';

const createAxiosInstance = (baseURL: any) => {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 60 * 1000,
  });

  // Add a request interceptor to attach the token
  api.interceptors.request.use(
    config => {
      const token = dataHandlerService?.getStore()?.getState()
        ?.AuthReducer?.userToken;
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Interceptor for response handling
  api.interceptors.response.use(
    response => {
      // MessageHandler(response?.data);
      return response;
    },
    error => {
      console.log('ssssss===>', error);
      if (error?.response?.data?.message == 'Unauthorized resource') {
        NavigationService.navigate(Auth_ROUTES.Login, {commingFrom: 'expire'});
        return;
      }

      MessageHandler(error?.response?.data);
      return Promise.reject(error);
    },
  );

  return api; 
};

const axiosInstance = createAxiosInstance(BASE_URL + BASE_PATH);
export default axiosInstance;
