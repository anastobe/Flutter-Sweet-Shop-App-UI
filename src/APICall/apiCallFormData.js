import { BASE_PATH, BASE_URL } from './constants';
import axios from 'axios';
import dataHandlerService from './dataHandler.service';

export const ApiCallFormData = async (formData, path, customHeaders = {}) => {

    let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken 
    let url = BASE_URL + BASE_PATH + path;
  
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...customHeaders, // Spread in any custom headers
        },
      });
  
      return response;
    } catch (error) {

        console.log("==error===",error);
        return error.response;
    
    }
};