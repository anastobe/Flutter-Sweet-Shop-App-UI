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