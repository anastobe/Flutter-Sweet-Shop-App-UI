// import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
// import { SaveEventCategoryData } from "../../Redux/Action/Create/CreateActions";
// import { getMyCurrentuserData, savedMyFriendsData } from "../../Redux/Action/Auth/AuthActions";
// import { LIMIT, LIMIT_15, LIMIT_5 } from "../../hooks";


export const userLogin = async (body: any) => {
  const response = await axiosInstance.post('/login', body);
  return response.data;
};

export const createCard = async (body: any) => {
  const response = await axiosInstance.post('/card/create', body);
  return response.data;
};

export const freezUnFreezCard = async (body: any) => {
  const response = await axiosInstance.post('/card/status', body);
  return response.data;
};

export const getCards = async (body: any) => {
  const response = await axiosInstance.get('/card', {});
  return response.data;
};
