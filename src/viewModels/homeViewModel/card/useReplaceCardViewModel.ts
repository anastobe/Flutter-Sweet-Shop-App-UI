// ReplaceCardViewModel.js
import { useEffect, useState } from 'react';
import { Toast } from '../../../utils';
import { freezUnFreezCardNoMessage, useReplaceCard } from '../../../queries/card.Queries/card.query';
import { freezUnFreezCard } from '../../../queries/auth.query';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export default function useReplaceCardViewModel(navigation, props) {

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);

  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null)
 

  const { mutate: useReplaceCardFunc, isPending } = useReplaceCard({
    callback: (response) => {
      setModalVisible(false)
      navigation.goBack();
    },
  });

  const { mutate: freezUnFreezCardFunc, isPending: isPendingFreezUnFreezCard } = freezUnFreezCardNoMessage({
    callback: (response) => {
      let payload = {
        card_id: props?.route?.params?.cardDetail?.card_id,
        emboss_name: firstName,
        format: "virtual",
      };
      useReplaceCardFunc(payload);
    },
  });

  function pressBackArrow() {
    navigation.goBack();
  }

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  function openConfirmationModal() {
    let payload = {
      card_id: props?.route?.params?.cardDetail?.card_id,
      status: "lost", //always
      note: reason,
    };
    freezUnFreezCardFunc(payload);
  }

  function reqReplacement() {
    if (reason === "") {
      Toast.showToast("Please Select Reason for Replacement", "", "error");
    } else if (firstName === "") {
      Toast.showToast("Please enter your name", "", "error");
    } else {
      setModalVisible(true)
    }
  }

  return {
    reason,
    setReason,
    firstName,
    setFirstName,
    isPending,
    isPendingFreezUnFreezCard,
    pressBackArrow,
    reqReplacement,
    toggleDropdown,
    openDropdown,
    loginUserData,
    modalVisible, 
    setModalVisible,
    openConfirmationModal,
  };
}
