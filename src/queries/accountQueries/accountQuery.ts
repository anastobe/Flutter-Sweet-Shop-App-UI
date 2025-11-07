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