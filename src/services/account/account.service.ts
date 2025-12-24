import axiosInstance from "../https.service"; 
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";


// 🔹 Get accounts
export const getAccountsAndAssets = async () => {
  const response = await axiosInstance('/wallet', 'GET', undefined, false );
  // console.log("=>services=> getAccounts", response);
  return response?.results;
};

export const getNotifications = async (body: any) => {
  const response = await axiosInstance('/notifications', 'POST', body, false);
  return response;
};

// 🔹 Freeze / Unfreeze Account
export const AccFreeze = async (payload: any) => {

  const body = {
    status: payload.status
    // ,
    // name: payload.name
  };

  console.log("=>services=> AccFreeze", payload);
  const response = await axiosInstance(`/account/${payload.id}`, 'PUT', body, true);
  return response;
};


// 🔹 Delete Account
export const AccDelete = async (id: any) => {
  console.log("=>services=> AccDelete", id);
  const response = await axiosInstance(`/account/${id}`, 'DELETE', undefined, false );
  console.log("=>services=> AccDelete", response);
  return response;
};

export const paymentHistry = async (payloadWithParams: any) => {

  // console.log("=paymentHistry main function=",payloadWithParams);
  

  const response = await axiosInstance(
    `/transactions/asset/${payloadWithParams?.assetId}`,
    'POST',
    payloadWithParams?.body || {},
    false
  );
  return response;
};

export const getDashboardData = async (id: any) => {

  // console.log("=getDashboardData ID=>",id);
  
  const response = await axiosInstance('/dashboard/asset_id', 'GET', undefined, false );
  return response?.results;
};