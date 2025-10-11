// ReplaceCardViewModel.js
import { useState } from 'react';
import { Toast } from '../../../utils';
import { useReplaceCard } from '../../../queries/card.query';
import { freezUnFreezCard } from '../../../queries/auth.query';

export default function useReplaceCardViewModel(navigation, props) {
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");

  const { mutate: useReplaceCardFunc, isPending } = useReplaceCard({
    callback: (response) => {
      navigation.goBack();
    },
  });

  const { mutate: freezUnFreezCardFunc, isPending: isPendingFreezUnFreezCard } = freezUnFreezCard({
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

  function reqReplacement() {
    if (reason === "") {
      Toast.showToast("Please Select Reason for Replacement", "", "error");
    } else if (firstName === "") {
      Toast.showToast("Please enter your name", "", "error");
    } else {
      let payload = {
        card_id: props?.route?.params?.cardDetail?.card_id,
        status: "lost",
        note: "Card is lost",
      };
      console.log("payload==>", payload);
      // freezUnFreezCardFunc(payload);
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
  };
}
