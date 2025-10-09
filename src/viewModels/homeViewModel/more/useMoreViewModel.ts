import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { storeUserToken } from '../../../Redux/Action/Auth/AuthActions';

export default function useMoreViewModel() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  function onPressChangePassword() {
    navigation.navigate(HOME_ROUTES.UpdatePassword);
  }

  function onPresscontact() {
    navigation.navigate(HOME_ROUTES.CONTACTADDRESS);
  }

  function onPressSecurity() {
    navigation.navigate(HOME_ROUTES.PIN_SECURITY);
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
    onPressChangePassword,
    onPresscontact,
    onPressSecurity,
    onPressFaqs,
    onPressSupport,
    onPressPrivacyPolicy,
    onPressTermsofUse,
    onPressLogout,
    onCloseHelpSheet,
  };
}
