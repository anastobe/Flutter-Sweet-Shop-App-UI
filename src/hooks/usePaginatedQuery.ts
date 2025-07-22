// import {useInfiniteQuery} from '@tanstack/react-query';

// export const LIMIT: number = 10;
// export const LIMIT_5: number = 5;
// export const LIMIT_4: number = 4;
// export const LIMIT_1: number = 1;
// export const LIMIT_3: number = 3;
// export const LIMIT_8: number = 8;
// export const LIMIT_15: number = 15;

// type QueryFnParams = {
//   page: number;
// };

// type usePaginatedQueryParams<T, R = T> = {
//   queryKey: string[];
//   enabled?: boolean;
//   queryFn: ({page}: QueryFnParams) => Promise<{data: T[]; count: number}>;
//   limit?: number;
//   // onSuccess?: (data: { pages: { data: T[] }[]; pageParams: number[] }) => void;
//   // select?: (data: { pages: { data: T[] }[]; pageParams: number[] }) => any;
// };

// // export const usePaginatedQuery = <T>({
// //   queryKey,
// //   queryFn,
// //   enabled = true,
// //   limit = LIMIT,
// // }: usePaginatedQueryParams<T>) => {
// //   const {data, ...rest} = useInfiniteQuery({
// //     queryKey,
// //     enabled: enabled,
// //     queryFn: async ({pageParam = 1}: {pageParam: number}) => {
// //       const data = await queryFn({page: pageParam});
// //       console.log("page---<>in ", pageParam, Math.ceil(data?.count / limit));
// //       // console.log("data---<>in ", data);
// //       return {
// //         data: data.data,
// //         count: data?.count,
// //         nextPage: pageParam + 1,
// //         pagesCount: Math.ceil(data?.count / limit),
// //       };
// //     },
// //     getNextPageParam: ({
// //       data,
// //       pagesCount,
// //       nextPage,
// //       lastPageParam,
// //     }: {
// //       data: any;
// //       pagesCount: any;
// //       nextPage: any;
// //       lastPageParam: any;
// //     }) => {
// //       // console.log("Tstinnnn", {
// //       //   data: data?.length,
// //       //   pagesCount,
// //       //   nextPage,
// //       //   lastPageParam,
// //       // });
// //       // if (pagesCount < nextPage) return undefined;
// //       if (data?.length == 0) return undefined;
// //       return nextPage;
// //     },
// //   });

// //   return {...rest, data: data?.pages?.map(page => page?.data).flat()};
// // };

// export const usePaginatedQuery = <T>({
//   queryKey,
//   queryFn,
//   enabled = true,
//   limit = LIMIT,
// }: usePaginatedQueryParams<T>) => {
//   const {data, ...rest} = useInfiniteQuery({
//     enabled,
//     queryKey,
//     queryFn: async ({pageParam = 1}: {pageParam: number}) => {
//       const response = await queryFn({page: pageParam});
//       // console.log('page---<>in ', pageParam); // Log to check correct page number
//       return {
//         data: response.data,
//         count: response?.count,
//         nextPage: pageParam + 1,
//         pagesCount: Math.ceil(response?.count / limit),
//       };
//     },
//     getNextPageParam: ({
//       data,
//       pagesCount,
//       nextPage,
//       lastPageParam,
//     }: {
//       data: any;
//       pagesCount: any;
//       nextPage: any;
//       lastPageParam: any;
//     }) => {
//       // console.log("Tstinnnn", {
//       //   data: data?.length,
//       //   pagesCount,
//       //   nextPage,
//       //   lastPageParam,
//       // });
//       // if (pagesCount < nextPage) return undefined;
//       if (data?.length == 0) return undefined;
//       return nextPage;
//     },
//   });

//   return {
//     ...rest,
//     data: data?.pages?.map(page => page?.data).flat(),
//   };
// };

// export const usePaginatedQuerystartsZero = <T>({
//   queryKey,
//   queryFn,
//   enabled = true,
//   limit = LIMIT,
// }: usePaginatedQueryParams<T>) => {
//   const {data, ...rest} = useInfiniteQuery({
//     enabled,
//     queryKey,
//     queryFn: async ({pageParam = 0}: {pageParam: number}) => {
//       const response = await queryFn({page: pageParam});
//       // console.log('page---<>in ', pageParam); // Log to check correct page number
//       return {
//         data: response.data,
//         count: response?.count,
//         nextPage: pageParam + 1,
//         pagesCount: Math.ceil(response?.count / limit),
//       };
//     },
//     getNextPageParam: ({
//       data,
//       pagesCount,
//       nextPage,
//       lastPageParam,
//     }: {
//       data: any;
//       pagesCount: any;
//       nextPage: any;
//       lastPageParam: any;
//     }) => {
//       // console.log("Tstinnnn", {
//       //   data: data?.length,
//       //   pagesCount,
//       //   nextPage,
//       //   lastPageParam,
//       // });
//       // if (pagesCount < nextPage) return undefined;
//       if (data?.length == 0) return undefined;
//       return nextPage;
//     },
//   });

//   return {
//     ...rest,
//     data: data?.pages?.map(page => page?.data).flat(),
//   };
// };
