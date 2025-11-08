import axiosInstance from "../https.service";

export const useReplaceCard = async (body: any) => {
  const response = await axiosInstance.post('/card/replace', body);
  return response.data;
};

export const setSpendLimit = async (body: any) => {
  const response = await axiosInstance.post('/card/update-usage-limit', body);
  return response.data;
};

export const freezUnFreezCardNoMessage = async (body: any) => {
  const response = await axiosInstance.post(
    '/card/status', 
    body,
    { showSuccessMessage: false }
  );
  return response.data;
};

export const setPinSecurity = async (body: any) => {
  const response = await axiosInstance.post('/card/set-pin', body);
  return response.data;
};
