import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  handleLoader, storeUserToken } from '../../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../../constants';
import QueryKey from '../queryKey';
import { Toast } from '../../utils';
import apis from '../../services';

export const usePaymentTransfer = (
  {callback, onError} 
  : 
  {callback: (res: any) => void, onError: (res: any) => void}
) => {
  const dispatch = useDispatch();

  return useMutation({
  onMutate: () => {
    dispatch(handleLoader(true));
  },
    mutationFn: apis.usePaymentTransfer,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      onError(error)
    },
    onSettled: () => {
      dispatch(handleLoader(false));
    }
  });
};

export const useFXConversion = (
  {callback, onError} 
  : 
  {callback: (res: any) => void, onError: (res: any) => void}
) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useFXConversion,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      onError(error)
    },
  });
};


export const useMyAccount_InternationalTransfer = (
  {callback, onError} 
  : 
  {callback: (res: any) => void, onError: (res: any) => void}
) => {
  const dispatch = useDispatch();

  return useMutation({
  onMutate: () => {
    console.log("start");
    
    dispatch(handleLoader(true));
  },
    mutationFn: apis.useMyAccount_InternationalTransfer,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
      }
  },
    onError: (error: any) => {
      onError(error)
    },
    onSettled: () => {
          console.log("end");
      dispatch(handleLoader(false));
    }
  });
};