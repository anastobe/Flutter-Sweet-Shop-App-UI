import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBeneficiary, getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';
import QueryKey from '../../../queries/queryKey';
import { useQueryClient } from '@tanstack/react-query';

export const useConversionHistoryViewModel = () => {

  const navigation = useNavigation();
  const[search, setSearch] = useState();
    
  function pressBackArrow() {
    navigation.goBack();
  }


  return {
    pressBackArrow,
    search,
    setSearch


};
};
