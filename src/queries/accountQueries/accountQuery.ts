import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apis from '../../services';
import QueryKey from '../queryKey';

export const getAccounts  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_ACCOUNTS],
    initialData: [],
    queryFn: ()=> apis.getAccounts(dispatch),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

  export const getNotifications  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_NOTIFICATIONS],
    initialData: [],
    queryFn: ()=> apis.getNotifications(dispatch),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

  
export const AccFreeze = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.AccFreeze,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('AccDelete error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const paymentHistry = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.paymentHistry,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('AccDelete error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const AccDelete = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.AccDelete,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('AccDelete error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

  

  