import { CardUsageResponse } from "../../models/card/CardUsageResponse.model";
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

export const getCardsUsageRules = async (ID: string): Promise<CardUsageResponse> => {
  return await axiosInstance(`/card/usage-rules/${ID}`, 'GET', undefined , false);
};
