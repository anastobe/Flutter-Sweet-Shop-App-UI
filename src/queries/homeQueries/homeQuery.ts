import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apis from '../../services';
import QueryKey from '../queryKey';

export const getNotifications = ({
  callback,
}: {
  callback: (res: any) => void;
}) => {
  return useMutation({
    mutationFn: apis.getNotifications,
    onSuccess: (response: any) => {
      if (response?.success) {
        callback(response);
      }
    },
    onError: (error: any) => {
      console.log('getNotifications error:', error);
    },
  });
};


export const useaddAsset = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useaddAsset,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('useaddAsset error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};