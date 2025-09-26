import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../Redux/Action/Auth/AuthActions';
import apis from '../services';

export const useReplaceCard = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useReplaceCard,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('useReplaceCard error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};