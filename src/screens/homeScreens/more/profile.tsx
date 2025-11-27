import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { Images } from '../../../config';
import useProfileViewModel from '../../../viewModels/homeViewModel/more/useProfileViewModel';
import { CommonUtils } from '../../../utils';

const Profile = () => {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

  const {
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
  } = useProfileViewModel();

  function pressBackArrow() {
    navigation.goBack();
  }

  function renderProfileFields() {
    return (
      <View>
        <View style={styles.leftCard}>
          <TouchableOpacity onPress={openImagePicker}>
            <View
              style={{
                backgroundColor: THEME.SlateBlue,
                justifyContent: 'center',
                alignItems: 'center',
                width: 95,
                height: 95,
               borderRadius: 200,
                borderColor: THEME.white,
                // borderWidth: 1
              }}
            >
              {/* <Icon name="person-circle-outline" size={22} color={THEME.white} /> */}
              <Text style={styles.profiletxt} >{CommonUtils.getInitials(name)}</Text>
            </View>
          </TouchableOpacity>
          {/* <Text style={styles.selectimgTxt}>
            For best results, upload a square image (400x400px, JPG or PNG, max 2MB).
          </Text> */}
        </View>

        <InputField
          disabled={false}
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}         
          placeholder="Full Name"
          value={name}
          keyboardType={'default'}
          margBtm={15}
          onChangeText={setName}
          customInpStyle={{ backgroundColor: THEME.whitergba,borderWidth: 0, borderRadius: 10,  }}
        />

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          disabled={false}
          placeholder="Username"
          value={username}
          keyboardType={'default'}
          margBtm={15}
          onChangeText={setUsername}
          customInpStyle={{ backgroundColor: THEME.whitergba,borderWidth: 0, borderRadius: 10,  }}
        />

        <InputField
          marginTp={20}
          disabled={false}
          blurOnSubmit={false}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
          margBtm={15}
          customInpStyle={{ backgroundColor: THEME.whitergba, borderWidth: 0, borderRadius: 10, }}
        />
        <InputField
          marginTp={20}
          disabled={false}
          placeholder="Phone"
          autoCapital={'none'}
          blurOnSubmit={false}
          value={phone}
          onChangeText={setPhone}
          keyboardType={'numeric'}
          margBtm={15}
          customInpStyle={{ backgroundColor: THEME.whitergba, borderWidth: 0, borderRadius: 10, }}
        />
      </View>
    );
  }

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20, paddingBottom: 60 }}>
        <Text style={styles.title}>Profile</Text>
        {renderProfileFields()}

        {/* <CustomButton
          btnContSty={styles.forgetTxt}
          title="Update Basic Information"
          loading={false}
          onPress={onPressBtn}
        /> */}
      </View>
    </MainContainer>
  );
};


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  profiletxt: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    // marginBottom: 10,
  },
  forgetTxt: { marginTop: 20, marginBottom: 50 },
  leftCard: { alignItems: 'center', marginVertical: 14 },
  backButton: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4.0,
    elevation: 1,
  },
  selectimgTxt: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.primary,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});


export default Profile;
