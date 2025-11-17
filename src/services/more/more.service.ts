import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";
import { BeneficiaryResponse } from "../../models/more/beneficiaryResponse.model";
import { CountryApiResponse } from "../../models/more/countryApiResponse.model";
import { CurrencyApiResponse } from "../../models/more/currencyApiResponse.model";
import { AssetTypeApiResponse } from "../../models/more/assetTypeApiResponse.model";


export const getBeneficiaryDetail = async (): Promise<BeneficiaryResponse[]> => {
  const response = await axiosInstance.get('/beneficiary', {
    showSuccessMessage: false
  });
  return response.data;
};

export const DeleteBeneficiary = async (id: any) => {
  const response = await axiosInstance.delete(`/beneficiary/${id}`, {});
  return response.data;
};

export const getCoutry = async ( dispatch: any): Promise<CountryApiResponse> => {
  const response = await axiosInstance.get("lov/country", {
    showSuccessMessage: false
  });
  dispatch(storeCountryData(response.data.results))  
  return response.data;
};

export const getCurrency = async ( dispatch: any): Promise<CurrencyApiResponse> => {
  const response = await axiosInstance.get("lov/currency", {
    showSuccessMessage: false
  });
  dispatch(storeCurrenryData(response.data.results))  
  return response.data;
};

export const getAssetType = async ( dispatch: any): Promise<AssetTypeApiResponse> => {
  const response = await axiosInstance.get("lov/asset-type", {
    showSuccessMessage: false
  });
  dispatch(storeAccTypeData(response.data.results))  
  return response.data;
};

export const AddnewBeneficiaryApi = async (body: any) => {
  const response = await axiosInstance.post('/beneficiary/create', body);
  return response.data;
};

