import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { storeUserToken } from '../../../Redux/Action/Auth/AuthActions';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useMoreViewModel() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  
  const [open, setopen] = useState(false);

  const cardDetailRef = useRef(null);

  function onPressCurrencyExchange() {
    navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE);
  }

  function ConversionHistory() {
    navigation.navigate(HOME_ROUTES.CONVERSION_HISTORY);
  }

  function onPressBeneficiary() {
    navigation.navigate(HOME_ROUTES.BENEFICIARY_MANAGEMENT);
  }

  function onPressAddnewBeneficiary() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onPressProfile() {
    navigation.navigate(HOME_ROUTES.PROFILE);
  }

  function onPressRequest() {
    navigation.navigate(HOME_ROUTES.REQUEST);
  }
  
  function onPressChangePassword() {
    navigation.navigate(HOME_ROUTES.UpdatePassword);
  }

  function onPresscontact() {
    navigation.navigate(HOME_ROUTES.CONTACTADDRESS);
  }

  function onPressSecurity() {
    setopen(!open)
  }

  function onPressFaqs() {
    navigation.navigate(HOME_ROUTES.FAQ);
  }

  function onPressSupport() {
    cardDetailRef?.current?.open();
  }

  function onPressPrivacyPolicy() {
    navigation.navigate(HOME_ROUTES.PRIVACY_POLICY);
  }

  function onPressTermsofUse() {
    navigation.navigate(HOME_ROUTES.TERMS_USE);
  }

  function onPressLogout() {
    dispatch(storeUserToken({}));
  }

  function onCloseHelpSheet() {
    cardDetailRef?.current?.close();
  }

  return {
    cardDetailRef,
    onPressCurrencyExchange,
    ConversionHistory,
    onPressBeneficiary,
    onPressAddnewBeneficiary,
    onPressProfile,
    onPressRequest,
    onPressChangePassword,
    onPresscontact,
    onPressSecurity,
    onPressFaqs,
    onPressSupport,
    onPressPrivacyPolicy,
    onPressTermsofUse,
    onPressLogout,
    onCloseHelpSheet,
    setopen,
    open
  };
}
