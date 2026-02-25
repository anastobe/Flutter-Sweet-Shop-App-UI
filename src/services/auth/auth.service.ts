import axiosInstance from "../https.service"; // Ye tumhare global SSL pinning wrapper hai

export const userLogin = async (body: any) => {
  // POST axiosInstance using global wrapper
  const response = await axiosInstance('/login', 'POST', body, false);
  return response;
};

export const useBioMetryLogin = async (body: any) => {
  const response = await axiosInstance('/biometric-login', 'POST', body, false);
  return response;
};

export const LogoutApi = async (body: any) => {
  const response = await axiosInstance('/logout', 'POST', body, false);
  return response;
};

export const ResetPasswordLink = async (body: any) => {
  const response = await axiosInstance('/forgot-password', 'POST', body, true);
  return response;
};

export const uploadFile = async (body: any) => {
  const response = await axiosInstance('/payment/attachment/upload', 'POST', body, true);
  return response;
};


export const createCard = async (body: any) => {
  const response = await axiosInstance('/card/create', 'POST', body, true);
  return response;
};

export const cardUsedStatus = async (body: any) => {
  const response = await axiosInstance('/oob/result', 'POST', body, true);
  return response;
};

export const freezUnFreezCard = async (body: any) => {
  const response = await axiosInstance('/card/status', 'POST', body, true);
  return response;
};

export const getCards = async (body: any) => {
  const response = await axiosInstance('/card', 'POST', body, false); // showSuccessMessage = false
  return response;
};
