// src/viewModels/homeViewModel/useCoperate_homeScreenViewModel.ts
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { ACCOUNT_HISTRY_VALIDATION, CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Images } from '../../../config';
import { fetchLinkedAccCards, getDashboardData, getUserDetail, paymentHistry } from '../../../queries/accountQueries/accountQuery';
import { storeLoginUserData } from '../../../Redux/Action/Home/HomeActions';
import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';

export const useCoperate_homeScreenViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);  

  const {mutate: getUserDetailFunc, isPending: isPendinggetUserDetail} = getUserDetail({
    callback: (response: any) => {
      if (response.success) {
        // console.log("get user detail fetch",response);         
          if (response?.results) {
            dispatch(storeLoginUserData(response.results));
            dispatch(handleLoader(false)); 
          }
      }
    },
  });

    useEffect(()=>{
      CallUserDetail()
    },[])

    function CallUserDetail() {
      try {
        dispatch(handleLoader(true));
        getUserDetailFunc({skip_activity_check:true})      
      }
      catch(err) {
        dispatch(handleLoader(false)); 
      }
      finally {
        dispatch(handleLoader(false)); 
      }
  
  }

  const SendoptionCorporate = [ 
    // { icon: Images.paymentTab, onPress: HOME_ROUTES.REQUEST, text: "Pending transaction request", width: 20, height: 20 },
    // { icon: Images.accountTab, onPress: HOME_ROUTES.REQUEST, text: "Pending beneficiary request", width: 20, height: 20 },
    { icon: Images.cardTab, onPress: HOME_ROUTES.REQUEST, text: "Pending card request", width: 20, height: 20 },
  ];

  const handlePressCard = (item: any) => {
  if (isPendinggetUserDetail) return 
    navigation.navigate(item.onPress)
  };

  const handleNavigateNotification = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION)
  };

  const handleNavigateProfile = () => {
    navigation.navigate(HOME_ROUTES.PROFILE);
  };
  
  return {
    userData,
    SendoptionCorporate,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateProfile,

  };
};
