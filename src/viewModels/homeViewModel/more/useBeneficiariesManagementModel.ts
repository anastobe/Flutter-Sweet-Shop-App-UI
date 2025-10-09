import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';

export const useBeneficiariesManagementViewModel = () => {
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

  return {
    data: BENEFICIARY_MANAGEMENT_DATA,
    pressBackArrow,
    pressRightArrow,
    onBeneficiaryPress,
  };
};
