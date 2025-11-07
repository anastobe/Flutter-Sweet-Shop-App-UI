import { useState } from 'react';
import { Toast } from '../../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

const useProfileViewModel = () => {

  const dispatch = useDispatch();
  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData)
   const personal_customers = loginUserData?.personal_customers[0]

  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState(`${personal_customers?.first_name + " " + personal_customers?.last_name }`);
  const [username, setUsername] = useState((`${personal_customers?.first_name}`));
  const [email, setEmail] = useState(`${loginUserData?.email}`);
  const [phone, setPhone] = useState(`${loginUserData?.telephone}`);
  


  // ✅ Image Picker
  function openImagePicker() {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const uri = response?.assets?.[0]?.uri;
        if (uri) setProfile(uri);
      }
    });
  }

  // ✅ Button Action
  function onPressBtn() {
    if (!email.trim()) {
      Toast.showToast('Please enter email', '', 'error');
      return;
    }
    if (!phone.trim()) {
      Toast.showToast('Please enter mobile number', '', 'error');
      return;
    }

    Toast.showToast('Profile updated successfully!', '', 'success');
  }

  return {
    profile,
    setName,
    name,
    setUsername,
    username,
    email,
    phone,
    setEmail,
    setPhone,
    openImagePicker,
    onPressBtn,
  };
};

export default useProfileViewModel;
