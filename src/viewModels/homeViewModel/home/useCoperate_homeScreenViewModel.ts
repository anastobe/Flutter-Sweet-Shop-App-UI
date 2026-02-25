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
import apis from '../../../services';

export const useCoperate_homeScreenViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);

  const SendoptionCorporate = [ 
    { icon: Images.paymentTab, onPress: HOME_ROUTES.REQUEST_PENDING_TRANSACTION_BANK, text: "Pending\nbank transfer\ntransaction", width: 20, height: 20 },
    { icon: Images.paymentTab, onPress: HOME_ROUTES.REQUEST_PENDING_TRANSACTION, text: "Pending\ntransaction\nInternational", width: 20, height: 20 },
    { icon: Images.accountTab, onPress: HOME_ROUTES.REQUEST_PENDING_BENEFICIARY, text: "Pending\nbeneficiary\nrequest", width: 20, height: 20 },
    { icon: Images.cardTab, onPress: HOME_ROUTES.REQUEST, text: "Pending\ncard\nrequest", width: 20, height: 20 },
  ];

  const handlePressCard = (item: any) => {
    navigation.navigate(item.onPress)
  };

  const handleNavigateNotification = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION)
  };

  const handleNavigateProfile = () => {
    navigation.navigate(HOME_ROUTES.PROFILE);
  };

  
  const onRefresh = () => {
    console.log("refrsews");
  };

  
  return {
    loginUserData,
    SendoptionCorporate,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateProfile,
    refreshing, 
    setRefreshing,
    onRefresh
  };
};
