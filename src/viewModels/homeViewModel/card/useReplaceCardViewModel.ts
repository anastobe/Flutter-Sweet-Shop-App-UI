// ReplaceCardViewModel.js
import { useState } from 'react';
import { Toast } from '../../../utils';
import { freezUnFreezCardNoMessage, useReplaceCard } from '../../../queries/card.Queries/card.query';
import { freezUnFreezCard } from '../../../queries/auth.query';
import { useSelector } from 'react-redux';

export default function useReplaceCardViewModel(navigation, props) {

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);

  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null)

  const { mutate: useReplaceCardFunc, isPending } = useReplaceCard({
    callback: (response) => {
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

  function reqReplacement() {
    if (reason === "") {
      Toast.showToast("Please Select Reason for Replacement", "", "error");
    } else if (firstName === "") {
      Toast.showToast("Please enter your name", "", "error");
    } else {
      let payload = {
        card_id: props?.route?.params?.cardDetail?.card_id,
        status: "lost", //always
        note: reason,
      };
      // console.log("payload==>",payload);
      // // return
      freezUnFreezCardFunc(payload);
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
    loginUserData
  };
}
