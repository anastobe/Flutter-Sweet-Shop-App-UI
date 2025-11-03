import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';
import { useState } from 'react';

export const useBeneficiariesManagementViewModel = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigation = useNavigation();

  function pressBackArrow() {
    navigation.goBack();
  }

  function pressRightArrow() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onBeneficiaryPress() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onPressDelete() {
    setOpen(!open)
  }

  function onPressView() {
    setOpen2(!open2)
  }

  return {
    data: BENEFICIARY_MANAGEMENT_DATA,
    pressBackArrow,
    pressRightArrow,
    onBeneficiaryPress,
    open,
    setOpen,
    open2,
    setOpen2,
    onPressDelete,
    onPressView,
  };
};
