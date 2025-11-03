import { useState } from 'react';
import { Toast } from '../../../utils';
import { launchImageLibrary } from 'react-native-image-picker';

const useProfileViewModel = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState('William');
  const [username, setUsername] = useState('@william.harp');
  const [email, setEmail] = useState('william@gmail.com');
  const [phone, setPhone] = useState('03322778221');

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
