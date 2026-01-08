import { useEffect, useMemo, useState } from 'react';
import { Toast } from '../../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

const useProfileViewModel = () => {

  const dispatch = useDispatch();

  const loginUserData = useSelector(
    (state: any) => state?.HomeReducer?.loginUserData
  );

  // ✅ SAFE user extraction (never undefined)
  const user = useMemo(() => {
    return loginUserData?.members?.[0]?.user ?? null;
  }, [loginUserData]);

  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // ✅ Update state ONLY when user is available
  useEffect(() => {
    if (!user) return;

    setName(`${user.first_name ?? ''} ${user.last_name ?? ''}`.trim());
    setUsername(user.first_name ?? '');
    setEmail(user.email ?? '');
    setPhone(user.mobile ?? '');
    setProfile(user.profile_image ?? null); // if exists
  }, [user]);

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
