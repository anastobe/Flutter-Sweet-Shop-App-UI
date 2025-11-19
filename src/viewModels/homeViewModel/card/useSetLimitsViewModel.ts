// SetLimitsViewModel.js
import { useEffect, useState } from 'react';
import { setSpendLimit } from '../../../queries/card.Queries/card.query';
import { CommonUtils, Toast } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

export default function useSetLimitsViewModel({...props}) {

  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [limitType, setLimitType] = useState('Weekly');
  const [selectedCards, setselectedCards] = useState({
    card_id: "",
    card_name: "",
    pan: ""
  });
  const [spendingLimit, setSpendingLimit] = useState('');

  const{ cardDetail } = props?.route?.params

  const {mutate: setSpendLimitFunc, isPending: isPendingsetSpendLimit} = setSpendLimit({
    callback: (response: any) => {
      console.log("setSpendLimit==>",setSpendLimit);
      props?.navigation.goBack();
    },
  });

  function pressBackArrow() {
    props?.navigation.goBack();
  }



  useEffect(()=>{
   
    setselectedCards({
      card_id: cardDetail?.card_id,
      card_name: `${ CommonUtils.capitalizeFirstLetter(cardDetail?.format)} (.... .... .... ${cardDetail?.pan})`,
      pan:  cardDetail.pan
    })
    setSpendingLimit(cardDetail?.spending_limit)
    let setFormat = CommonUtils.capitalizeFirstLetter(cardDetail?.spending_type)
    setLimitType(setFormat)
  },[])

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  function SaveLimit() {
    if (!selectedCards?.card_id) {
      Toast.showToast("Invalid card id", '', 'error');
    } else if (!limitType){
      Toast.showToast("Select limit type", '', 'error');
    } else if (!spendingLimit){
      Toast.showToast("Enter Spending limit", '', 'error');
    }
    else{
      let payload = {
      card_id: selectedCards.card_id,
      spending_type: limitType, // monthly | weekly | daily
      spending_limit: spendingLimit
      }
      console.log("payload===>",payload);
      // return
      setSpendLimitFunc(payload)
    }

  }

  function handleSaveLimit() {
      setModalVisible(true)
  }

  return {
    limitType,
    setLimitType,
    selectedCards,
    setselectedCards,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    handleSaveLimit,
    toggleDropdown,
    openDropdown, 
    setOpenDropdown,
    isPendingsetSpendLimit,
    modalVisible, 
    setModalVisible,
    SaveLimit
  };
}
