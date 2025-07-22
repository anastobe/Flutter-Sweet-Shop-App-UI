import {LIMIT, LIMIT_3, LIMIT_5, LIMIT_1} from '../../hooks/usePaginatedQuery';
import axiosInstance from '../https.service';

export const getTimeLinePost = async (page: number) => {
  console.log('page=>>>', page);

  if (typeof page !== 'number' || isNaN(page)) {
    console.error('page is not a valid number:', page);
    return; // Handle invalid page here
  }
  const response = await axiosInstance.get(
    `post/listing?ownPost=false&page=${page}&pageSize=${LIMIT}`,
  );

  // console.log("response aya tou=========>",response?.data);

  return response;
};

export const Like_Unlike = async (postId: any) => {
  const response = await axiosInstance.post(
    `post/likeUnlikePost/${postId}`,
    {},
  );
  return response.data;
};

export const Like_Unlike_Comnt = async (payload: any) => {
  const response = await axiosInstance.post(`post/likeUnlikeComment`, payload);
  return response.data;
};

export const ReportPost = async (payload: any) => {
  const response = await axiosInstance.post(`post/report`, payload);
  return response.data;
};

export const CommentPosting = async (payload: any) => {
  const response = await axiosInstance.post(`post/comment`, payload);
  return response.data;
};

export const SharePost = async (payload: any) => {
  const response = await axiosInstance.post(`post/share`, payload);
  return response.data;
};

export const getPostLikes = async (postId: any, page: any) => {
  const response = await axiosInstance.get(`post/likes/${postId}?page=${page}&pageSize=${LIMIT}`, {});
  return response.data;
};

export const getPostComments = async (
  id: string,
  page: number
) => {
  const response = await axiosInstance.get(
    `post/comments/${id}?page=${page}&pageSize=${LIMIT_5}`,
    {},
  );
  return response.data;
};


export const getPostCommentsPrevew = async (
  id: string,
  page: number
) => {

  console.log("axios calling page no==>",page);
  

  const response = await axiosInstance.get(
    `post/comments/${id}?page=${page}&pageSize=${LIMIT}`,
    {},
  );
  return response?.data;
};