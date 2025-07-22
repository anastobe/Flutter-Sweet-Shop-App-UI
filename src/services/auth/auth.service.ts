// import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
// import { SaveEventCategoryData } from "../../Redux/Action/Create/CreateActions";
// import { getMyCurrentuserData, savedMyFriendsData } from "../../Redux/Action/Auth/AuthActions";
// import { LIMIT, LIMIT_15, LIMIT_5 } from "../../hooks";


export const userLogin = async (body: any) => {
  const response = await axiosInstance.post('auth/login', body);
  return response.data;
};

export const userSocialLogin = async (body: any) => {
  const response = await axiosInstance.post('auth/signup/google', body);
  return response.data;
};



