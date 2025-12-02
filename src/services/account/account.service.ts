import axiosInstance from "../https.service"; 
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";


// 🔹 Get accounts
export const getAccounts = async () => {
  const response = await axiosInstance('/assets', 'GET', undefined, false );
  console.log("=>services=> getAccounts", response);
  return response?.results;
};


// 🔹 Freeze / Unfreeze Account
export const AccFreeze = async (payload: any) => {

  const body = {
    status: payload.status,
    name: payload.name
  };

  const response = await axiosInstance(`/account/${payload.id}`, 'PUT', body, true);
  console.log("=>services=> AccFreeze", response);
  return response;
};


// 🔹 Delete Account
export const AccDelete = async (id: any) => {
  const response = await axiosInstance(`/account/${id}`, 'DELETE', undefined, false );
  console.log("=>services=> AccDelete", response);
  return response;
};
