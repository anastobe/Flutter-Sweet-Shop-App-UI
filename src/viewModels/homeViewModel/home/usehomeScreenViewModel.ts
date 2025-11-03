// src/viewModels/homeViewModel/useHomeViewModel.ts
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { HOME_ROUTES } from '../../../constants';
import { CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import { Alert } from 'react-native';

export const useHomeViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const Sendoption = [
    { icon: 'add-outline', onPress: HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT, text: `New Currency\nAccount` },
    { icon: 'wallet-outline', onPress: HOME_ROUTES.MAKE_PAYMENT, text: 'Send Money' },
  ];

  const handleLogout = () => {
    navigation.navigate(HOME_ROUTES.NOTIFICATION);
  };

  const handlePressCard = (item: any) => {
    navigation.navigate(item.onPress)
  };

  const handleNavigateNotification = () => {
    Alert.alert("Api Needed")
  };

  const handleNavigateTransactionHistory = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY);
  };

  const handleNavigateTransaction = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
  };
  

  const handleNavigateProfile = () => {
    navigation.navigate(HOME_ROUTES.PROFILE);
  };

  return {
    Sendoption,
    DATA,
    CURRENT_ACCOUNT,
    handleLogout,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    handleNavigateProfile
  };
};
