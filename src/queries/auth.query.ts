import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  handleLoader, storeUserToken, userIsLoggedIn } from '../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../constants';
import QueryKey from './queryKey';
import { Toast } from '../utils';
import apis from '../services';

export const useLogin = ({callback, onErrorCallback} : {callback: (res: any) => void, onErrorCallback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.userLogin,
    onSuccess: async (response: any) => {

        callback(response)
        
        // if (response?.results?.role == 'checker') {
        //   navigation.reset({ routes: [{ name: Auth_ROUTES.REQUEST }] });
        // }
        // else { //individual or corporate maker
        //   dispatch(userIsLoggedIn(true))  
        // }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('Login error:', error);
      onErrorCallback(error);
    }
  });
};

export const useBioMetryLogin = ({callback, onErrorCallback} : {callback: (res: any) => void, onErrorCallback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.useBioMetryLogin,
    onSuccess: async (response: any) => {

        callback(response)
        
        // if (response?.results?.role == 'checker') {
        //   navigation.reset({ routes: [{ name: Auth_ROUTES.REQUEST }] });
        // }
        // else { //individual or corporate maker
        //   dispatch(userIsLoggedIn(true))  
        // }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      console.log('Login error:', error);
      onErrorCallback(error);
    }
  });
};


// export const useLogin = ({callback} : {callback: (res: any) => void}) => {
//   const dispatch = useDispatch();

//   return useMutation({
//     mutationFn: apis.userLogin,
//     onSuccess: async (response: any) => {

//       if (response.success) {
//         dispatch(storeUserToken(response.results))  
//         dispatch(userIsLoggedIn(true))  &&
//         callback(response)
//     }
  
//   },
//     onError: (error: any) => {
//       // this is usually a network/server-side error
//       console.log('Login error:', error);
//       // onErrorCallback?.(error?.message || 'Something went wrong');
//     }
//   });
// };

export const ResetPasswordLink = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.ResetPasswordLink,
    onSuccess: async (response: any) => {
      if (response.success) {
          callback(response)
      }
  },
    onError: (error: any) => {
      // console.log('ResetPasswordLink error:', error);
    }
  });
};

export const FirstTimeEnableMFA = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.FirstTimeEnableMFA,
    onSuccess: async (response: any) => {
      if (response.success) {
          callback(response)
      }
  },
    onError: (error: any) => {
      // console.log('ResetPasswordLink error:', error);
    }
  });
};

export const resetPassword = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.resetPassword,
    onSuccess: async (response: any) => {
      if (response.success) {
          callback(response)
      }
  },
    onError: (error: any) => {
      // console.log('resetPassword error:', error);
    }
  });
};

export const uploadFile = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.uploadFile,
    onSuccess: async (response: any) => {
      if (response.success) {
          callback(response)
      }
  },
    onError: (error: any) => {
      // console.log('uploadFile error:', error);
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
      // console.log('createCard error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const cardUsedStatus = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: (res: any) => void;
  onErrorCallback?: (err: any) => void;
}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.cardUsedStatus,

    onSuccess: async (response: any) => {

      // console.log('cardUsedStatus success:', response);

      if (response?.success) {
        onSuccessCallback?.(response);
      } else {
        // backend responded but success = false
        onErrorCallback?.(response);
      }
    },

    onError: (error: any) => {
      // console.log('cardUsedStatus error:', error);
      onErrorCallback?.(error);
    },
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
      // console.log('freezUnFreezCard error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

// export const getCards  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({ 
//     queryKey: [QueryKey.GET_CARD_DATA],
//     initialData: [],
//     queryFn: ()=> apis.getCards(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });

export const getCards = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.getCards,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('getCards error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};