import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData, storeCurrArrayData } from "../../Redux/Action/Home/HomeActions";
import { CustomersResponse } from "../../models/home/customersResponse.model";
import { AssetsResponse } from "../../models/home/assetsResponse.model";


export const getUserDetail = async ( dispatch: any): Promise<CustomersResponse > => {
  const response = await axiosInstance.get('/user/detail', {
    showSuccessMessage: false
  }); 
  dispatch(storeLoginUserData(response.data.results[0]))  
  return response.data;
};


export const getCurrencyAccount = async ( dispatch: any): Promise<AssetsResponse > => {
  const response = await axiosInstance.get("/assets/all", {
    showSuccessMessage: false
  });
  dispatch(storeCurrArrayData(response.data?.results))  
  return response.data;
};