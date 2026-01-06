import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { MainContainer, OTPInput } from '../../components';
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
    isPending_resetPassword,
    otp, 
    setOtp
  } = useforgetPassResetViewModel(props);

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={isPending_resetPassword ? console.log("disabled") : pressBackArrow}
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: handleSize.w(20) }}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

        <Text style={styles.title}>Verify it’s you</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent to your email address
        </Text>
        
      {/* <Text style={styles.title}>Reset password</Text> */}
      <OTPInput length={6} onChange={(val: string) => setOtp(val)} />

      <InputField
        disabled={!isPending_resetPassword}
        margBtm={handleSize.h(20)}
        margTp={handleSize.h(20)}
        textInputStyle={styles.innerinput}
        image={secure2 ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.white}
        secureEntry={secure2}
        blurOnSubmit={false}
        placeholder="New password"
        value={newPassword}
        onPress={() => setSecure2(!secure2)}
        onChangeText={setNewPassword}
      />


      <CustomButton
        loading={isPending_resetPassword}
        btnContSty={styles.forgetTxt}
        title="Reset password"
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
    subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
    marginBottom: 16,
  },

});
