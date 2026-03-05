import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";
import { BeneficiaryResponse } from "../../models/more/beneficiaryResponse.model";
import { CountryApiResponse } from "../../models/more/countryApiResponse.model";
import { CurrencyApiResponse } from "../../models/more/currencyApiResponse.model";
import { AssetTypeApiResponse } from "../../models/more/assetTypeApiResponse.model";
import { saveBeneficiaryData } from "../../Redux/Action/Home/HomeActions";

// Get all beneficiaries


export const getBeneficiaryDetail = async (body: any) => {

  // console.log("getBeneficiaryDetail==>",body);
  
  const response = await axiosInstance('/beneficiary/search', 'POST', body, false);
  return response;
};

export const getPendingRequest = async (body: any) => {

  // console.log("getBeneficiaryDetail==>",body);
  
  const response = await axiosInstance('/cards/request', 'POST', body, false);
  return response;
};

export const getPendingBankPayment = async (body: any) => {
  const response = await axiosInstance('/payment', 'POST', body, false);
  return response;
};

export const getFxQuote = async (body: any) => {
  const response = await axiosInstance('/fx', 'POST', body, false);
  return response;
};

// Delete a beneficiary
export const DeleteBeneficiary = async (id: string | number) => {
  const response = await axiosInstance(`/beneficiary/${id}`, 'DELETE', undefined,false);
  return response;
};

export const GetCopDetail = async (body: any) => {
  const response = await axiosInstance(`/beneficiary/account/cop`, 'POST', body,false);
  return response;
};

// Get countries
export const getCoutry = async (dispatch: any): Promise<CountryApiResponse> => {
  const response = await axiosInstance('/lov/country', 'GET', undefined,false);
  dispatch(storeCountryData(response.results));
  return response;
};

// Get currencies
export const getCurrency = async (dispatch: any): Promise<CurrencyApiResponse> => {
  const response = await axiosInstance('/lov/currency', 'GET', undefined,false);
  dispatch(storeCurrenryData(response.results));
  return response;
};

// Get asset types
export const getAssetType = async (dispatch: any): Promise<AssetTypeApiResponse> => {
  const response = await axiosInstance('/lov/asset-type', 'GET', undefined, false);
  dispatch(storeAccTypeData(response.results));
  return response;
};

// Add new beneficiary
export const AddnewBeneficiaryApi = async (body: any) => {
  const response = await axiosInstance('/beneficiary/create', 'POST', body, false);
  return response;
};

export const UpdateContactAddress = async (payloadWithParams: any) => {

  console.log("=====>",payloadWithParams);
  
  const response = await axiosInstance(`/member/${payloadWithParams?.ID}`, 'PUT', payloadWithParams.payload, false);
  return response;
};

export const changePassword = async (body: any) => {
  const response = await axiosInstance('/change-password', 'POST', body, true);
  return response;
};

export const resetPassword = async (body: any) => {
  const response = await axiosInstance('/reset-password', 'POST', body, true);
  return response;
};

export const FirstTimeEnableMFA = async (body: any) => {
  const response = await axiosInstance('/mfa', 'POST', body, true);
  return response;
};