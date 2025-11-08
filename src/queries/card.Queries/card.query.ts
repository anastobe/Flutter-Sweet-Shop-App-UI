import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../../Redux/Action/Auth/AuthActions';
import apis from '../../services';

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


export const freezUnFreezCard = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.freezUnFreezCard,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('freezUnFreezCard error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const freezUnFreezCardNoMessage = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.freezUnFreezCardNoMessage,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('freezUnFreezCardNoMessage error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const setSpendLimit = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.setSpendLimit,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('setSpendLimit error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const setPinSecurity = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.setPinSecurity,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('setSpendLimit error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};