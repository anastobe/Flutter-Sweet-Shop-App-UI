// import {useMutation, useQuery} from '@tanstack/react-query';
// import { useDispatch } from 'react-redux';
// import apis from '../../services';
// import QueryKey from '../queryKey';
//
// export const getUserDetail  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({
//     queryKey: [QueryKey.GET_LOGIN_USER_DETAIL],
//     initialData: [],
//     queryFn: ()=> apis.getUserDetail(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });


//   export const getCoutry  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({
//     queryKey: [QueryKey.GET_COUNTRY],
//     initialData: [],
//     queryFn: ()=> apis.getCoutry(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });



//     export const getCurrency  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({
//     queryKey: [QueryKey.GET_CURRENCY],
//     initialData: [],
//     queryFn: ()=> apis.getCurrency(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });



//     export const getAssetType  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({
//     queryKey: [QueryKey.GET_ACCOUNT_TYPE_DATA],
//     initialData: [],
//     queryFn: ()=> apis.getAssetType(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });

  
//     export const getCurrencyAccount  = (    {
//   enabled,
//   dispatch
// }: {
//   enabled?: boolean;
//   dispatch?: any
// }
// ) =>
//   useQuery({
//     queryKey: [QueryKey.GET_CURR_ACCOUNTS],
//     initialData: [],
//     queryFn: ()=> apis.getCurrencyAccount(dispatch),
//     enabled: enabled,

//     staleTime: 0, // Data will never be considered stale
//     retry: false // Disable retry on failure
//   });