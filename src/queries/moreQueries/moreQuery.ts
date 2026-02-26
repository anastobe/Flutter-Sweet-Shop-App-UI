import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apis from '../../services';
import QueryKey from '../queryKey';


export const getBeneficiaryDetail = ({
  callback,
}: {
  callback: (res: any) => void;
}) => {
  return useMutation({
    mutationFn: apis.getBeneficiaryDetail,
    onSuccess: (response: any) => {
      if (response?.success) {
        callback(response);
      }
    },
    onError: (error: any) => {
      // console.log('getBeneficiaryDetail error:', error);
    },
  });
};


export const getPendingBankPayment = ({
  callback,
}: {
  callback: (res: any) => void;
}) => {
  return useMutation({
    mutationFn: apis.getPendingBankPayment,
    onSuccess: (response: any) => {
      if (response?.success) {
        callback(response);
      }
    },
    onError: (error: any) => {
      // console.log('getPendingBankPayment error:', error);
    },
  });
};


export const getPendingRequest = ({
  callback,
}: {
  callback: (res: any) => void;
}) => {
  return useMutation({
    mutationFn: apis.getPendingRequest,
    onSuccess: (response: any) => {
      if (response?.success) {
        callback(response);
      }
    },
    onError: (error: any) => {
      // console.log('getPendingRequest error:', error);
    },
  });
};

export const getFxQuote = ({
  callback,
}: {
  callback: (res: any) => void;
}) => {
  return useMutation({
    mutationFn: apis.getFxQuote,
    onSuccess: (response: any) => {
      if (response?.success) {
        callback(response);
      }
    },
    onError: (error: any) => {
      // console.log('getFxQuote error:', error);
    },
  });
};

  
export const DeleteBeneficiary = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.DeleteBeneficiary,
    onSuccess: async (response: any) => {
      if (response.success) {
        callback(response)
    }  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('DeleteBeneficiary error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

  export const GetCopDetail = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.GetCopDetail,
    onSuccess: async (response: any) => {

      // console.log("useMutation==>",response);
      

      if (response.success) {
        callback(response)
    }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('Login error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


  export const AddnewBeneficiaryApi = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.AddnewBeneficiaryApi,
    onSuccess: async (response: any) => {

      // console.log("useMutation==>",response);
      

      if (response.success) {
        callback(response)
    }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('Login error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};

  export const UpdateContactAddress = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.UpdateContactAddress,
    onSuccess: async (response: any) => {

      // console.log("useMutation==>",response);
      

      if (response.success) {
        callback(response)
    }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('UpdateContactAddress error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};




  export const changePassword = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.changePassword,
    onSuccess: async (response: any) => {

      console.log("useMutation==>",response);
      

      if (response.success) {
        callback(response)
    }
  
  },
    onError: (error: any) => {
      // this is usually a network/server-side error
      // console.log('Login error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};
