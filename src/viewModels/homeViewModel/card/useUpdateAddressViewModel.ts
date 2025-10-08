import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';

export default function useUpdateAddressViewModel() {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);

  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [country, setCountry] = useState('');

  function pressBackArrow() {
    navigation.goBack();
  }

  function validateAndProceed() {
    if (!streetAddress.trim()) {
      Toast.showToast('Please Enter Street Address', '', 'error');
    } else if (!apartment.trim()) {
      Toast.showToast('Please Enter Apartment Details', '', 'error');
    } else if (!city.trim()) {
      Toast.showToast('Please Select City', '', 'error');
    } else if (!postalAddress.trim()) {
      Toast.showToast('Please Enter Postal Address', '', 'error');
    } else if (!country.trim()) {
      Toast.showToast('Please Select Country', '', 'error');
    } else {
      cardDetailRef?.current?.open();
      navigation.goBack();
    }
  }

  function yesConfirm() {
    cardDetailRef?.current?.close();
    setTimeout(() => {
      const payload = {
        format: 'physical',
        card_name: 'My Card',
        spending_limits: '500',
        limit_type: 'monthly',
        currency_type: 'EUR',
        linked_account: 'account_1',
        card_desgin: 'steel',
      };
      navigation.navigate(HOME_ROUTES.ConfirmCardRequest, { data: payload });
    }, 1000);
  }

  return {
    navigation,
    pressBackArrow,
    validateAndProceed,
    yesConfirm,
    streetAddress,
    setStreetAddress,
    apartment,
    setApartment,
    city,
    setCity,
    postalAddress,
    setPostalAddress,
    country,
    setCountry,
    cardDetailRef,
  };
}
