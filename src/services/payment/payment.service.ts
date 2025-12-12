import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";
import { BeneficiaryResponse } from "../../models/more/beneficiaryResponse.model";
import { CountryApiResponse } from "../../models/more/countryApiResponse.model";
import { CurrencyApiResponse } from "../../models/more/currencyApiResponse.model";
import { AssetTypeApiResponse } from "../../models/more/assetTypeApiResponse.model";
import { saveBeneficiaryData } from "../../Redux/Action/Home/HomeActions";

// Get all beneficiaries
export const usePaymentTransfer = async (body: any) => {
  const response = await axiosInstance('/payment/ibft', 'POST', body, false);
  return response;
};

export const useFXConversion = async (body: any) => {
  const response = await axiosInstance('/fx/quote', 'POST', body, false);
  return response;
};
  
export const useMyAccount_InternationalTransfer = async (body: any) => {
  const response = await axiosInstance('/payment/fx', 'POST', body, false);
  return response;
};
