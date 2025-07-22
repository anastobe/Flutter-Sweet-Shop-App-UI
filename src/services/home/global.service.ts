import { useDispatch } from "react-redux";
import axiosInstance from "../https.service";
import { SaveEventCategoryData } from "../../Redux/Action/Create/CreateActions";
import { getMyCurrentuserData } from "../../Redux/Action/Auth/AuthActions";
import { HomePostDataList } from "../../Redux/Action/Home/HomeActions";
import { BASE_URL } from "../../APICall/constants";
import axios from "axios";


// export const UploaderMedia = async (body: string) => {
//   const url = `${BASE_URL}v1/`;

//   console.log("body check=========>",body?._parts);

//   const response = await axios.post(`${url}media/upload/array`, body, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       // Add any other headers you might need, e.g., authorization token
//     },
//   });

//     return response.data;
// };


export const UploaderMedia = async (body: any) => {
  const url = `${BASE_URL}v1/`;

  try {
    console.log("body check=========>", body._parts);

    const response = await axios.post(`${url}media/upload/array`, body, {
      // Optionally remove the Content-Type header
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};



// export const UploaderMedia = async (body: any) => {  
//   const response = await axiosInstance.post(`media/upload/array`, body);  

//   console.log("response aya tou=========>",response?.data);

//   return response.data;
// };