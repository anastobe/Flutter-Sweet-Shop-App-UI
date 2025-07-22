import { BASE_PATH, BASE_URL } from './constants';
import axios from 'axios';
import dataHandlerService from './dataHandler.service';

const api = async (path, params, method,dispatch) => {

  let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken 
  let url = BASE_URL + BASE_PATH + path;

  console.log("====[][]]=====",url,"-", params,"-", "method", method,"---00===",authToken);

  let options;
  options = {
    headers: 
    authToken ? {
      'Content-Type': 'application/json',
      Authorization: authToken,
    }
    :
    {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    ...(params && { data: JSON.stringify(params) }),
  };
  return axios(url, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      console.log("==error===",error);
      return error.response;
    });
};

export default api;