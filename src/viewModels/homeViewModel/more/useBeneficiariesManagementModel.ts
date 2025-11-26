import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBeneficiary, getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';
import QueryKey from '../../../queries/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useBeneficiariesManagementViewModel = () => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [clickableBeneficiaryObject, setclickableBeneficiaryObject] = useState({});
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const FOCUS = useIsFocused()

  useEffect(()=>{
    if (FOCUS) {
      StatusBar.setBackgroundColor(THEME.darkSecondary)
    }
  },[FOCUS]) 

  function pressBackArrow() {
    navigation.goBack();
  }

  function pressRightArrow() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onBeneficiaryPress() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onPressDelete(item:any) {
    setclickableBeneficiaryObject(item)
    setOpen(!open)
  }

  function onPressDeleteBtn() {
    DeleteBeneficiaryFunc(clickableBeneficiaryObject?.id)
  }

  function onPressView() {
    setOpen2(!open2)
  }

  function onRefresh() {
    refetchgetBeneficiaryDetail()
  }
  
  const { mutate: DeleteBeneficiaryFunc, isPending: isPendingDeleteBeneficiary } = DeleteBeneficiary({
    callback: (res: any) => {
      setOpen(false)  

      
    const deletedId = res?.results?.update_payments_beneficiary_by_pk?.id;
    console.log("delete Id=>",deletedId);
    
    if (!deletedId) return;

    queryClient.setQueryData([QueryKey.GET_BENEFICIARY], (oldData: any) => {
      if (!oldData?.results) return oldData;

      return {
        ...oldData,
        results: oldData.results.filter((item: any) => item.id !== deletedId),
      };
    });


    },
  });

  // get me
  const {data: getBeneficiaryDetail_Data, refetch: refetchgetBeneficiaryDetail, isFetching: isFetchingBeneficiary } = getBeneficiaryDetail({
    enabled: false,
    dispatch,
  });

  useEffect(()=>{
    refetchgetBeneficiaryDetail()
  },[])

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
    onPressDeleteBtn,
    onPressView,
    refetchgetBeneficiaryDetail,
    getBeneficiaryDetail_Data,
    isFetchingBeneficiary,
    DeleteBeneficiaryFunc,
    isPendingDeleteBeneficiary,
    onRefresh,
    refreshing,
    setrefreshing
  };
};
