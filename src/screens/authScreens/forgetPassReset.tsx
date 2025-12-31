import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { MainContainer } from '../../components';
import InputField from '../../components/textInput';
import CustomButton from '../../components/customButton';
import useforgetPassResetViewModel from '../../viewModels/authViewModel/useforgetPassResetViewModel';
import StatusBarManager from '../../components/statusBarManager';
import { handleSize } from '../../config/responsiveTheme';
import Metrics from '../../styles/metrics';

export default function ForgetPassReset({...props}) {
  const {
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    secure,
    setSecure,
    secure2,
    setSecure2,
    secure3,
    setSecure3,
    pressBackArrow,
    onUpdatePress,
    isPending_resetPassword
  } = useforgetPassResetViewModel(props);

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: handleSize.w(20) }}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Text style={styles.title}>Reset Password</Text>

      <InputField
        disabled={!isPending_resetPassword}
        margBtm={handleSize.h(20)}
        textInputStyle={styles.innerinput}
        image={secure2 ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.white}
        secureEntry={secure2}
        blurOnSubmit={false}
        placeholder="New Password"
        value={newPassword}
        onPress={() => setSecure2(!secure2)}
        onChangeText={setNewPassword}
      />

      <InputField
        disabled={!isPending_resetPassword}
        margTp={handleSize.h(0)}
        margBtm={handleSize.h(10)}
        textInputStyle={styles.innerinput}
        // image={secure3 ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        // secureEntry={secure3}
        blurOnSubmit={false}
        keyboardType={"numeric"}
        placeholder="Enter Confirmation Code"
        value={confirmNewPassword}
        onPress={() => setSecure3(!secure3)}
        onChangeText={setConfirmNewPassword}
        imagetintColor={THEME.white}
      />

      <CustomButton
        loading={isPending_resetPassword}
        btnContSty={styles.forgetTxt}
        title="Reset Password"
        onPress={onUpdatePress}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(15),
    marginTop: handleSize.h(10),
  },
  ruleText: {
    marginLeft: handleSize.w(5),
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
  },
  forgetTxt: {
    marginTop: handleSize.h(10),
    marginBottom: handleSize.h(20),
  },
  
      innerinput: {
      height: handleSize.h(56),
      width:  Metrics.width - handleSize.w(90),
      paddingLeft: handleSize.w(20),
      fontFamily: FONTFAMILY.Regular,
      fontSize: handleSize.f(FONT_SIZES.onefour),
      color: THEME.white,
      justifyContent: "center",
    },
  

});
