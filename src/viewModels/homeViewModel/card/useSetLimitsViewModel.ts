// SetLimitsViewModel.js
import { useState } from 'react';

export default function useSetLimitsViewModel(navigation) {
  const [limitType, setLimitType] = useState('Weekly');
  const [reason, setReason] = useState('');
  const [spendingLimit, setSpendingLimit] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  function handleSaveLimit() {
    console.log("Save Limit Pressed");
    console.log({
      limitType,
      reason,
      spendingLimit,
    });
  }

  return {
    limitType,
    setLimitType,
    reason,
    setReason,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    handleSaveLimit,
  };
}
