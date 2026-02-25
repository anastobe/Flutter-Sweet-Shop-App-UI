import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeLoginUserData, storeCurrArrayData } from "../../Redux/Action/Home/HomeActions";
import { CustomersResponse } from "../../models/home/customersResponse.model";
import { AssetsResponse } from "../../models/home/assetsResponse.model";

// Get user details
export const getUserDetail = async (): Promise<CustomersResponse> => {
  const response = await axiosInstance('/user/detail', 'POST', {}, false);
  // if (response?.results) {
  //   dispatch(storeLoginUserData(response.results));
  // }
  return response;
};

// Get all currency accounts
export const getCurrencyAccount = async (body: any , dispatch: any): Promise<AssetsResponse> => {
  const response = await axiosInstance('/assets/all', 'POST', body, false);
  if (response?.success) {
    dispatch(storeCurrArrayData(response?.results?.values));
  } 
  return response;
};

export const useaddAsset = async (body: any) => {
  const response = await axiosInstance("/assets/create", 'POST', body, false);
  return response;
};

