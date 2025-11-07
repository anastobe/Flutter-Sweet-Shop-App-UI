import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apis from '../../services';
import QueryKey from '../queryKey';

export const getBeneficiaryDetail  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_BENEFICIARY],
    initialData: [],
    queryFn: ()=> apis.getBeneficiaryDetail(dispatch),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });


  
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
      console.log('DeleteBeneficiary error:', error);
      // onErrorCallback?.(error?.message || 'Something went wrong');
    }
  });
};


  export const AddnewBeneficiaryApi = ({callback} : {callback: (res: any) => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.AddnewBeneficiaryApi,
    onSuccess: async (response: any) => {

      console.log("useMutation==>",response);
      

      if (response.success) {
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
