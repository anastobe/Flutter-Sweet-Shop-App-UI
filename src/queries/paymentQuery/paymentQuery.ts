import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../../constants';
import QueryKey from '../queryKey';
import { Toast } from '../../utils';
import apis from '../../services';

export const usePaymentTransfer = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.usePaymentTransfer,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('usePaymentTransfer error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};



export const useFXConversion = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useFXConversion,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('usePaymentTransfer error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

