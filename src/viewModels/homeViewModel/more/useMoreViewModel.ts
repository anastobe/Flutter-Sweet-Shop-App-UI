import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { storeUserToken } from '../../../Redux/Action/Auth/AuthActions';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { logoutUser } from '../../../utils/logout.helper';
import apis from '../../../services';

export default function useMoreViewModel() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
   const userData = useSelector((state: any) => state?.AuthReducer?.userData);
  
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

  async function onPressLogout() {
    // await apis.LogoutApi({})
    logoutUser()

    // dispatch(storeUserToken({}));
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
    open,
    userData
  };
}
