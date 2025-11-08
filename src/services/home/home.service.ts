import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData, storeCurrArrayData } from "../../Redux/Action/Home/HomeActions";


export const getUserDetail = async (dispatch: any) => {
  const response = await axiosInstance.get('/user/detail', {
    showSuccessMessage: false
  }); 
  dispatch(storeLoginUserData(response.data.results[0]))  
  return response.data;
};


export const getCurrencyAccount = async (dispatch: any) => {
  const response = await axiosInstance.get("/assets/all", {
    showSuccessMessage: false
  });
  dispatch(storeCurrArrayData(response.data?.results))  
  return response.data;
};