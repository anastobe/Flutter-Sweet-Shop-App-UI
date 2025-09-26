import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../constants';
import QueryKey from './queryKey';
import { Toast } from '../utils';
import apis from '../services';

export const useLogin = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.userLogin,
    onSuccess: async (response: any) => {

      console.log("useMutation==>",response);
      

      if (response.success) {
        dispatch(storeUserToken(response.results))  
        callback(response)
    }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('Login error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const createCard = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.createCard,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('createCard error:', error);
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

// export const unfreezCard = ({callback} : {callback: (res: any) => void}) => {
//   const dispatch = useDispatch();

//   return useMutation({
//     mutationFn: apis.unfreezCard,
//     onSuccess: async (response: any) => {
//       if (response.success) {
//         callback(response)
//     }  
//   },
//     onError: (error: any) => {
//       // this is usually a network/server-side error
//       console.log('unfreezCard error:', error);
//       // onErrorCallback?.(error?.message || 'Something went wrong');
//     }
//   });
// };



export const getCards  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_CARD_DATA],
    initialData: [],
    queryFn: ()=> apis.getCards(dispatch),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });