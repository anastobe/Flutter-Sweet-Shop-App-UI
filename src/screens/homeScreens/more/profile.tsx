// ProfileView.js
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useProfileViewModel from '../../../viewModels/homeViewModel/more/useProfileViewModel';
import { CommonUtils } from '../../../utils';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

const Profile = () => {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);


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
            <View style={styles.avatarContainer}>
              <Text style={styles.profiletxt}>{CommonUtils.getInitials(name)}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <InputField
          disabled={false}
          marginTp={handleSize.h(20)}
          autoCapital={'none'}
          blurOnSubmit={false}         
          placeholder="Full name"
          value={name}
          keyboardType={'default'}
          margBtm={handleSize.h(15)}
          onChangeText={setName}
          customInpStyle={styles.inputStyle}
        />

        <InputField
          marginTp={handleSize.h(20)}
          autoCapital={'none'}
          blurOnSubmit={false}
          disabled={false}
          placeholder="Username"
          value={username}
          keyboardType={'default'}
          margBtm={handleSize.h(15)}
          onChangeText={setUsername}
          customInpStyle={styles.inputStyle}
        />

        <InputField
          marginTp={handleSize.h(20)}
          disabled={false}
          blurOnSubmit={false}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
          margBtm={handleSize.h(15)}
          customInpStyle={styles.inputStyle}
        />

        <InputField
          marginTp={handleSize.h(20)}
          disabled={false}
          placeholder="Phone"
          autoCapital={'none'}
          blurOnSubmit={false}
          value={phone}
          onChangeText={setPhone}
          keyboardType={'numeric'}
          margBtm={handleSize.h(15)}
          customInpStyle={styles.inputStyle}
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20), paddingBottom: handleSize.h(60) }}>
        <Text style={styles.title}>Profile</Text>
        {renderProfileFields()}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },

  leftCard: { alignItems: 'center', marginVertical: handleSize.h(14) },

  avatarContainer: {
    backgroundColor: THEME.SlateBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: handleSize.w(95),
    height: handleSize.w(95),
    borderRadius: handleSize.w(200),
    borderColor: THEME.white,
  },

  profiletxt: {
    fontSize: handleSize.f(FONT_SIZES.threezero),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },

  inputStyle: {
    backgroundColor: THEME.whitergba,
    borderWidth: 0,
    borderRadius: handleSize.f(10),
  },

  forgetTxt: { marginTop: handleSize.h(20), marginBottom: handleSize.h(50) },
});

export default Profile;
