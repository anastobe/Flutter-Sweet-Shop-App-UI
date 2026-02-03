import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apis from '../../services';
import QueryKey from '../queryKey';

export const getAccountsAndAssets  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_ACCOUNTS_AND_ASSETS],
    initialData: [],
    queryFn: ()=> apis.getAccountsAndAssets(dispatch),
    enabled: enabled,
    
    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

  
  export const getDashboardData  = (    {
  enabled,
  dispatch,
  ID
}: {
  enabled?: boolean;
  dispatch?: any;
  ID?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_DASHBOARD_DATA],
    initialData: [],
    queryFn: ()=> apis.getDashboardData(ID),
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

export const fetchLinkedAccCards = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.fetchLinkedAccCards,
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

export const getTransactionAttachement  = (    {
  enabled,
  id
}: {
  enabled?: boolean;
  id?: any;
}
) =>
  useQuery({ 
    queryKey: [QueryKey.GET_TRANSACTIONS,id],
    initialData: [],
    queryFn: ()=> apis.getTransactionAttachement(id),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

  
export const getUserDetail = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.getUserDetail,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('getUserDetail error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};