import axiosInstance from "../https.service";

export const useReplaceCard = async (body: any) => {
  const response = await axiosInstance.post('/card/replace', body);
  return response.data;
};
