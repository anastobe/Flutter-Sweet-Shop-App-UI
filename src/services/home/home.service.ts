import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeLoginUserData, storeCurrArrayData } from "../../Redux/Action/Home/HomeActions";
import { CustomersResponse } from "../../models/home/customersResponse.model";
import { AssetsResponse } from "../../models/home/assetsResponse.model";

// Get user details
export const getUserDetail = async (dispatch: any): Promise<CustomersResponse> => {
  const response = await axiosInstance('/user/detail', 'GET', undefined, false);


  if (response?.results) {
    dispatch(storeLoginUserData(response.results));
  }
  return response;
};

// Get all currency accounts
export const getCurrencyAccount = async (dispatch: any): Promise<AssetsResponse> => {
  const response = await axiosInstance('/assets/all', 'GET', undefined, false);
  if (response?.success) {
    dispatch(storeCurrArrayData(response.results));
  } 
  return response;
};
