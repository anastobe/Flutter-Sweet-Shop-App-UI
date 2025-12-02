import { CardUsageResponse } from "../../models/card/CardUsageResponse.model";
import axiosInstance from "../https.service";

// Replace card
export const useReplaceCard = async (body: any) => {
  return await axiosInstance('/card/replace', 'POST', body, true);
};

// Set spend limit
export const setSpendLimit = async (body: any) => {
  return await axiosInstance('/card/update-usage-limit', 'POST', body, true);
};

// Freeze/Unfreeze card without showing success message
export const freezUnFreezCardNoMessage = async (body: any) => {
  return await axiosInstance('/card/status', 'POST', body, true);
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
  return await axiosInstance(`/card/detail/${ID}`, 'GET', undefined , false);
};

export const getCardsUsageRules = async (ID: string): Promise<CardUsageResponse> => {
  return await axiosInstance(`/card/usage-rules/${ID}`, 'GET', undefined , false);
};
