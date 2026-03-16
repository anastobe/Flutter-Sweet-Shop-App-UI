import { CardIssuingFeeResponse, CardPublicKeyResponse, CardUsageResponse } from "../../models/card/CardUsageResponse.model";
import axiosInstance from "../https.service";

// Replace card
export const useReplaceCard = async (body: any) => {
  return await axiosInstance('/card/replace', 'POST', body, true);
};

export const CardpaymentHistry = async (payloadWithParams: any) => {
  return await axiosInstance(`/transactions/card/${payloadWithParams?.card_id}`, 'POST', payloadWithParams?.payload || {}, false);
};

// Set spend limit
export const setSpendLimit = async (body: any) => {
  return await axiosInstance('/card/update-usage-limit', 'POST', body, true);
};

// Freeze/Unfreeze card without showing success message
export const freezUnFreezCardNoMessage = async (body: any) => {
  return await axiosInstance('/card/status', 'POST', body, true);
};


export const changeCardStatus = async (body: any) => {
  return await axiosInstance('/cards/request/status', 'POST', body, true);
};

export const changeLimitCardStatus = async (body: any) => {
  return await axiosInstance(`/card/limit/status/${body?.paramsId}`, 'PUT', body?.payload, true);
};

export const changeBankPaymentStatus = async (body: any) => {
  console.log("=changeBankPaymentStatus==>",body);  
  return await axiosInstance(`/update/payment_status/${body?.ID}`, 'PUT', body?.payload, true);
};

export const changeFxPaymentStatus = async (body: any) => {
  console.log("=changeFxPaymentStatus==>",body);  
  return await axiosInstance(`/fx_payment/update_status/${body?.ID}`, 'PUT', body?.payload, true);
};

export const changeBeneficiaryStatus = async (body: any) => {
  return await axiosInstance(`/beneficiary/update_status/${body?.ID}`, 'PUT', body?.payload, true);
};


// Set PIN security
export const setPinSecurity = async (body: any) => {
  return await axiosInstance('/card/set-pin', 'POST', body,true);
};

// Update card usage rules without showing success message
export const updateUsageRules = async (body: any) => {
  return await axiosInstance('/card/usage-rules', 'POST', body , false);
};

export const getSucureCard = async (ID: string) => {

  console.log("getSucureCard==>",`/card/detail/${ID}`);
  const response = await axiosInstance(`/card/detail/${ID}`, 'GET', {} , false);
  if (response?.success) {
    return response?.results;
  }
};

export const getSucureCardEncrypted = async (payload: any) => {
  const response = await axiosInstance('/card/secure-details/app', 'POST', payload , false);
  if (response?.success) {
    return response?.results;
  }
};

export const getCardsUsageRules = async (ID: string): Promise<CardUsageResponse> => {
  return await axiosInstance(`/card/usage-rules/${ID}`, 'GET', undefined , false);
};

export const getCardFees = async () => {
  console.log("card fee function");
  const response = await axiosInstance(`/card/core/fee`, 'GET', {} , false);
  if (response?.success) {
    return response?.results;
  }
};

export const getPublicKey = async (): Promise<CardPublicKeyResponse> => {
  return await axiosInstance(`/card/secure/public_key`, 'GET', {} , false);
};