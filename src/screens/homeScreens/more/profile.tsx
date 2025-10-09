import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { Images } from '../../../config';
import useProfileViewModel from '../../../viewModels/homeViewModel/more/useProfileViewModel';

const Profile = () => {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

  const {
    profile,
    name,
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
            <Image
              resizeMode="cover"
              defaultSource={Images.account}
              source={
                profile
                  ? { uri: profile }
                  : {
                      uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiahjx-m6ySbhuyQ7wbTQupWSjr0KW5DY38Cge23U_7bdxC8UC_gO9pWvIUHkZpQVNx2H-Q2fa4A1JVzJiLAGbQpdbNZ_Cf9sdMjhrRdZJOg',
                    }
              }
              style={styles.backButton}
            />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                width: 140,
                height: 140,
              }}
            >
              <Icon name="camera-outline" size={22} color={THEME.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.selectimgTxt}>
            For best results, upload a square image (400x400px, JPG or PNG, max 2MB).
          </Text>
        </View>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          disabled={true}
          placeholder="Full Name"
          value={name}
          keyboardType={'default'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          disabled={true}
          placeholder="Username"
          value={username}
          keyboardType={'default'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
        />
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Mobile Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType={'numeric'}
          margBtm={20}
          customInpStyle={{ backgroundColor: THEME.whitergba }}
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

        <CustomButton
          btnContSty={styles.forgetTxt}
          title="Update Basic Information"
          loading={false}
          onPress={onPressBtn}
        />
      </View>
    </MainContainer>
  );
};


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop: 10,
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
