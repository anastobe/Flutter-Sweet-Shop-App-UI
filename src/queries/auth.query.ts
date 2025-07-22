import {useMutation, useQuery} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {  storeUserToken } from '../Redux/Action/Auth/AuthActions';
import { Auth_ROUTES, HOME_ROUTES } from '../constants';
import navigationService from '../config/navigationService';
import QueryKey from './queryKey';
import { Toast } from '../utils';
import apis from '../services';
import { usePaginatedQuery } from '../hooks';



export const useLogin = ({callback} : {callback: () => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.userLogin,
    onSuccess: async (response: any) => {
      if (response.status) {
        dispatch(storeUserToken(response.data))  
        callback()
    }},
  });
};

export const sendOtpFunction = ({callback} : {callback: () => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.sendOtp,
    onSuccess: async (response: any) => {
        callback(response)
    },
  });
};

export const validateOtp = ({callback} : {callback: () => void}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: apis.validateOtp,
    onSuccess: async (response: any) => {
        callback(response)
    },
  });
};


export const userSocialLogin = ({callback} : {callback: () => void}) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: apis.userSocialLogin,
    onSuccess: async (response: any) => {
      if (response.status) {
        dispatch(storeUserToken(response.data)) 
        callback()
    }},
  });
};

export const userAppleLogin = ({callback} : {callback: () => void}) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: apis.userAppleLogin,
    onSuccess: async (response: any) => {
      if (response.status) {
        dispatch(storeUserToken(response.data)) 
        callback()
    }},
  });
};

export const getUserDetail  = (    {
  enabled,
  dispatch
}: {
  enabled?: boolean;
  dispatch?: any
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_PROFILE_DATA],
    queryFn: ()=> apis.getUserDetail(dispatch),
    enabled: enabled,

    staleTime: 0, // Data will never be considered stale
    retry: false // Disable retry on failure
  });


  // export const getNotifications  = (    {
  //   enabled,
  //   dispatch,
  // }: {
  //   enabled?: boolean;
  //   dispatch?: any
  // }
  // ) =>
  //   useQuery({
  //     queryKey: [QueryKey.GET_NOTIFICATION_DATA],
  //     queryFn: ()=> apis.getNotifications(dispatch),
  //     enabled: enabled,
  
  //     staleTime: 0, // Data will never be considered stale
  //     retry: false // Disable retry on failure
  //   });




export const getNotifications = ({enabled = true}: {enabled?: boolean}) => {
  const dispatch = useDispatch();
  const {data, ...rest} = usePaginatedQuery({
    enabled,
    queryKey: [QueryKey.GET_NOTIFICATION_DATA],
    queryFn: async ({page}) => {
      const {data, status} = await apis.getNotifications(page);  // Pass page correctly

      const totalPages = data?.postCount;

      if (!data) {
        return {data: [], count: 0};
      }

      // if (status) {
      //   dispatch(HomePostDataList(data));
      // }
      return {data: data, count: totalPages};
    },
  });

  return {...rest, data};
};
  
    export const getPostDetail  = (    {
      enabled,
      dispatch,
      postId
    }: {
      enabled?: boolean;
      dispatch?: any;
      postId?: any
    }
    ) =>
      useQuery({
        queryKey: [QueryKey.GET_POST_DETAIL],
        queryFn: (postId)=> apis.getPostDetail(postId),
        enabled: enabled,
    
        staleTime: 0, // Data will never be considered stale
        retry: false // Disable retry on failure
      });

export const getActivityList  = (
  {
  enabled
}: {
  enabled?: boolean;
}
) =>
  useQuery({
    queryKey: [QueryKey.GET_ACTIVITY_IST],
    queryFn: apis.getActivityList,
    initialData: () => [],
    enabled: enabled,

    staleTime: 0, // Data will never be considered stal
    retry: false
  });


  export const getFriendList  = (
    {
      enabled,
      dispatch
    }: {
      enabled?: boolean;
      dispatch?: any
    }
    ) =>
      useQuery({
        queryKey: [QueryKey.GET_FRIEND_IST],
        queryFn: ()=> apis.getFriendList(dispatch),
        initialData: () => [],
        enabled: enabled,

        staleTime: 0, // Data will never be considered stale

      });

      export const getFriendListOthers  = (
        {
        enabled,
        userId,
        myList
      }: {
        enabled?: boolean;
        userId?:any,
        myList?:any
      }) =>
        useQuery({
          queryKey: [QueryKey.GET_FRIEND_IST_OTHERS,userId],
          queryFn: ()=>apis.getFriendListOthers(userId, myList),
          initialData: () => [],
          enabled: enabled,
  
          staleTime: 0, // Data will never be considered stale

        });



    export const inviteFriendList  = (
      {
      enabled
    }: {
      enabled?: boolean;
    }
    ) =>
      useQuery({
        queryKey: [QueryKey.INVITE_FRIEND_LIST],
        queryFn: (id)=>apis.inviteFriendList(id),
        initialData: () => [],
        enabled: enabled,

        staleTime: 0, // Data will never be considered stale
    });
      

export const getEventCategories  = (
    {
    enabled,
    dispatch
  }: {
    enabled?: boolean;
    dispatch?: any
  }
  ) =>
    useQuery({
      queryKey: [QueryKey.GET_EVENT_CATEGORY],
      queryFn: ()=> apis.getEventCategories(dispatch),
      initialData: () => [],
      enabled: enabled,

      staleTime: 0, // Data will never be considered stale
    });

  export const getMyActivityQuery  = (
    {
    enabled,
    ownActivity,
    activityId
  }: {
    enabled?: boolean;
    ownActivity?: any;
    activityId?: any
  }
  ) =>
    useQuery({
      queryKey: [QueryKey.GET_MY_ACTIVITY_QUERY, activityId],
      queryFn: ()=> apis.getMyActivity(ownActivity,activityId),
      // initialData: () => [],
      enabled: enabled,

      // staleTime: 0, // Data will never be considered stale
    });
    

  export const getOtpAgain = ({callback} : {callback: (res: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.getOtpAgain,
      onSuccess: async (response: any) => {
        if (response.status) {
          callback(response)
      }},
    });
  };

  export const useForgetPassword = ({callback} : {callback: (res: any, body: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.userForgetPassword,
      onSuccess: async (response, body) => {
        if (response.status) {
          callback(response,body)
      }},
    });
  };

  export const VerifyOtpForgetPassword = ({callback} : {callback: (res: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.userVerifyForgetPassword,
      onSuccess: async (response: any) => {
        if (response.status) {
          callback(response)
      }},
    });
  };

  export const VerifyOtpSignupPassword = ({callback} : {callback: (res: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.userVerifySignPassword,
      onSuccess: async (response: any) => {
        if (response.status) {
          callback(response)
      }},
    });
  };

  export const useResetPassword = () => {
  
    return useMutation({
      mutationFn: apis.useResetPasswordApi,
      onSuccess: async (response: any) => {
        navigationService.reset_0(Auth_ROUTES.Login,{ commingFrom: "no_expire" }) 
      },
    });
  };

  
  export const authSignup = ({callback} : {callback: (res: any, body: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.authSignupApi,
      onSuccess: async (response, body) => {
        if (response.status) {
          callback(response,body)
      }},
    });
  };

  export const storeUserData = ({callback} : {callback: (res: any, body: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.storeUserDataApi,
      onSuccess: async (response, body) => {
        if (response.status) {
          callback(response,body)
      }},
    });
  };


  export const storeUserDataSocial = ({callback} : {callback: (res: any, body: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.storeUserDataSocialApi,
      onSuccess: async (response, body) => {
        if (response.status) {
          callback(response,body)
      }},
    });
  };


  export const UserSignUp = ({callback} : {callback: (res: any) => void}) => {
  
    return useMutation({
      mutationFn: apis.UserSignUpApi,
      onSuccess: async (response: any) => {
        if (response.status) {
          Toast.showToast("Sign up successfully", '', 'success');
          callback(response)
      }},
    });
  };