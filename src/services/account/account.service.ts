import axiosInstance from "../https.service"; 
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";


// 🔹 Get accounts
export const getAccounts = async () => {
  const response = await axiosInstance('/assets', 'GET', undefined, false );
  // console.log("=>services=> getAccounts", response);
  return response?.results;
};

export const getNotifications = async () => {
  const response = await axiosInstance('/notifications/expiration_based', 'GET', undefined, false );
  console.log("=>services=> getNotifications", response);
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

export const paymentHistry = async (payloadWithParams: any) => {

  console.log("=paymentHistry main function=",payloadWithParams);
  

  const response = await axiosInstance(
    `/transactions/asset/${payloadWithParams?.assetId}`,
    'POST',
    payloadWithParams?.body || {},
    false
  );
  return response;
};

export const getDashboardData = async (id: any) => {
  const response = await axiosInstance('/dashboard/asset_id', 'GET', undefined, false );
  return response?.results;
};