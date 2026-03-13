// SetLimitsViewModel.js
import { useEffect, useState } from 'react';
import { setSpendLimit } from '../../../queries/card.Queries/card.query';
import { CommonUtils, Toast } from '../../../utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { card_Screen_Refresh } from '../../../Redux/Action/Home/HomeActions';
import { HOME_ROUTES } from '../../../constants';
import { LOGIN_USER_TYPES } from '../../../utils/data';

export default function useSetLimitsViewModel({...props}) {

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const save_user_type = useSelector((state: any) => state?.AuthReducer?.save_user_type);

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
       
      setModalVisible(false)
      setTimeout(() => {
        navigation.navigate(HOME_ROUTES.TABSTACK, { screen: "CardStack" });
      }, 500);

      // dispatch(card_Screen_Refresh(Math.random()))
      // props?.navigation.goBack();
    },
    onError: (error) =>{
                      
      console.log("error ha==>",error);
    }
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
      spending_type: limitType?.toLowerCase(), // monthly | weekly | daily
      spending_limit: spendingLimit,
      is_corporate: save_user_type == LOGIN_USER_TYPES.corporate_maker ? true : false,  
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
