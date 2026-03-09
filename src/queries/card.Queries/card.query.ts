import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../../Redux/Action/Auth/AuthActions';
import apis from '../../services';
import QueryKey from '../queryKey';

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
      // console.log('useReplaceCard error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const CardpaymentHistry = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.CardpaymentHistry,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('AccDelete error:', error);
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
      // console.log('freezUnFreezCard error:', error);
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
      // console.log('freezUnFreezCardNoMessage error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const changeBeneficiaryStatus = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.changeBeneficiaryStatus,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('changeCardStatus error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const changeCardStatus = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.changeCardStatus,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('changeCardStatus error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const changeBankPaymentStatus = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.changeBankPaymentStatus,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('changeBankPaymentStatus error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const changeFxPaymentStatus = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.changeFxPaymentStatus,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('changeFxPaymentStatus error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};



export const setSpendLimit = (
  {callback, onError} 
  : 
  {callback: (res: any) => void, onError: (res: any) => void}
) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.setSpendLimit,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      onError(error)
      // this is usually a network/server-side error
      // console.log('setSpendLimit error:', error);
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
      // console.log('setSpendLimit error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


export const updateUsageRules = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.updateUsageRules,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('updateUsageRules error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

export const getPublicKey  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any;}
) =>
  useQuery({ 
    queryKey: [QueryKey.GET_PUBLIC_KEY],
    initialData: null,
    queryFn: ()=> apis.getPublicKey(),
    enabled: enabled,
 
    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

  
  
export const getSucureCard  = (    {
  enabled,
  dispatch,
  card_id
}: {
  enabled?: boolean;
  dispatch?: any;
  card_id?: any
}
) =>
  useQuery({ 
    queryKey: [QueryKey.GET_CARDS_RULES,card_id],
    initialData: [],
    queryFn: ()=> apis.getSucureCard(card_id),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

export const getCardsUsageRules  = (    {
  enabled,
  dispatch,
  card_id
}: {
  enabled?: boolean;
  dispatch?: any;
  card_id?: any
}
) =>
  useQuery({ 
    queryKey: [QueryKey.GET_CARDS_RULES,card_id],
    initialData: null,
    queryFn: ()=> apis.getCardsUsageRules(card_id),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });

export const getCardFees  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any;
}
) =>
  useQuery({ 
    queryKey: [QueryKey.GET_CARD_FEE],
    initialData: null,
    queryFn: ()=> apis.getCardFees(),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });