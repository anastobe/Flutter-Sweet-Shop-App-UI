import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { Toast } from '../../../utils';
import { useSelector } from 'react-redux';

export function useCreatePhysicalCardViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const countryList = useSelector((state: any) => state?.MoreReducer?.countryList);
  const currencyList = useSelector((state: any) => state?.MoreReducer?.currencyList);
  const accountTypeList = useSelector((state: any) => state?.MoreReducer?.accountTypeList);

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [design, setdesign] = useState({id: "", name: ""});
  const [cardName, setcardName] = useState('');
  const [currency, setCurrency] = useState({
    __typename: "",
    id: "",
    iso_code: "",
    num_code: ""
  });
  const [linkedAccount, setLinkedAccount] = useState({
    __typename: "",
    id: "",
    name: "",
    description: "",
    created_at: ""
  });
  const [limitType, setLimitType] = useState('Weekly');
  const [spendingLimit, setSpendingLimit] = useState('');

  const pressBackArrow = () => navigation.goBack();

  const toggleDropdown = (key: any) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const onPressBtn = () => {
    if (!cardName) {
      Toast.showToast('Please Enter Name', '', 'error');
    }else if (currency?.iso_code?.length === 0) {
      Toast.showToast('Please Select Currency', '', 'error');
    } else if (linkedAccount?.name?.length === 0) {
      Toast.showToast('Please Select Linked Account Type', '', 'error');
    } else if (!limitType) {
      Toast.showToast('Please Select Limit Type', '', 'error');
    } else if (!spendingLimit) {
      Toast.showToast('Please Enter Spending Limit', '', 'error');
    } else {

      console.log("ASdasdsasa====>",cardName,currency,linkedAccount,limitType,spendingLimit);
      

      cardDetailRef?.current?.open();
    }
  };

  const yesConfirm = () => {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      const payload = {
        format: 'physical',
        card_name: cardName,
        spending_limits: spendingLimit,
        limit_type: limitType,
        currency_type: currency.iso_code,
        linked_account: linkedAccount.name,
        card_desgin: 'steel',
        pin: "4567"
      };
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }, 800);
  };

  const updateLocation = () => {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      navigation.navigate(HOME_ROUTES.UPDATE_ADDRESS);
    }, 800);
  };

  return {
    cardDetailRef,
    cardName,
    setcardName,
    currency,
    setCurrency,
    linkedAccount,
    setLinkedAccount,
    limitType,
    setLimitType,
    spendingLimit,
    setSpendingLimit,
    pressBackArrow,
    onPressBtn,
    yesConfirm,
    updateLocation,
    countryList,
    currencyList,
    accountTypeList,
    design, 
    setdesign,
    openDropdown, 
    setOpenDropdown,
    toggleDropdown
  };
}
