import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { storeUserToken } from "../../Redux/Action/Auth/AuthActions";
import { storeLoginUserData } from "../../Redux/Action/Home/HomeActions";
import { storeAccTypeData, storeCountryData, storeCurrenryData } from "../../Redux/Action/More/MoreActions";


export const getAccounts = async (dispatch: any) => {
  const response = await axiosInstance.get('/assets', {
    showSuccessMessage: false
  });
  return response?.data?.results;
};
