import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createCard } from '../../../queries/auth.query';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useConfirmCardRequestViewModel = (route: any) => {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const FOCUS = useIsFocused()

  const [tick, settick] = useState(false);
  const [open, setOpen] = useState(false);

  const payload = route?.params?.data;


  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  const { mutate: createCardFunc, isPending } = createCard({
    callback: (response: any) => {
      if (response.success) {
        setOpen(true);
      } else {
        Alert.alert('Error', response.message || 'Something went wrong');
      }
    },
  });

  const pressBackArrow = () => navigation.goBack();

  const onPayPress = () => {
    createCardFunc(payload);
  };

  const onModalClose = () => setOpen(false);

  const onManageCardPress = () => {
    setOpen(false);
    navigation.navigate(HOME_ROUTES.TABSTACK);
  };

  return {
    navigation,
    cardDetailRef,
    tick,
    settick,
    open,
    setOpen,
    isPending,
    pressBackArrow,
    onPayPress,
    onModalClose,
    onManageCardPress,
  };
};
