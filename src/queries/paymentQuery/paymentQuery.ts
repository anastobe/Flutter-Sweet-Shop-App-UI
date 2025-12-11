import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../../constants';
import QueryKey from '../queryKey';
import { Toast } from '../../utils';
import apis from '../../services';

export const useBankTransfer = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useBankTransfer,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('useBankTransfer error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

