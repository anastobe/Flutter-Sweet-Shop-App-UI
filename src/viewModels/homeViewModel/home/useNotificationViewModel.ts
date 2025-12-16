import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { getAccounts, getNotifications } from '../../../queries/accountQueries/accountQuery';
import { useDispatch } from 'react-redux';

export const useNotificationViewModel = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();

  const [notifications] = useState([
    { id: '1', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
    { id: '2', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
    { id: '3', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
    { id: '4', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
    { id: '5', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
    { id: '6', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
    { id: '7', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
    { id: '8', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
    { id: '9', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
    { id: '10', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
    { id: '11', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
    { id: '12', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
  ]);

  
  const { data: getNotifications_Data, refetch: refetchgetNotifications, isPending: isFetchedNotification } = getNotifications({
    enabled: false, 
    dispatch
  });

  useEffect(()=>{
    if (FOCUS) {
      refetchgetNotifications()
    }
  },[FOCUS])
  

  const pressBackArrow = () => {
    navigation.goBack();
  };

  // Logic for icon & color mapping
  // const getNotificationIconAndColor = (type: string) => {
  //   switch (type) {
  //     case 'sent':
  //       return { icon: 'card-outline', color: 'green' };
  //     case 'sent':
  //       return { icon: 'card-outline',  color: 'red' };
  //     case 'sent':
  //       return { icon: 'card-outline',  color: 'orange' };
  //     default:
  //       return { icon: 'card-outline',  color: '#888' };
  //   }
  // };

    const getNotificationIconAndColor = (type: string) => {
    switch (type) {
      case 'sent':
        return { icon: 'card-outline', color: THEME.white };
      case 'sent':
        return { icon: 'card-outline',  color: THEME.white };
      case 'sent':
        return { icon: 'card-outline',  color: THEME.white };
      default:
        return { icon: 'card-outline',  color: THEME.white };
    }
  };

  return {
    notifications,
    pressBackArrow,
    getNotificationIconAndColor,
    getNotifications_Data,
    isFetchedNotification
    
  };
};
