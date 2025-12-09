import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { MainContainer, OTPInput } from "../../components";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useOtpVerifyViewModel } from "../../viewModels/authViewModel/useOtpVerifyViewModel";
import { Images } from "../../config";
import CustomButton from "../../components/customButton";
import StatusBarManager from "../../components/statusBarManager";
import { handleSize } from "../../config/responsiveTheme";

const OtpVerify = () => {
  const {  pressBackArrow, handleNavigate } = useOtpVerifyViewModel();
  
  const [otp, setOtp] = useState("");

  function verifyOtp() {
    return(
        <CustomButton
        btnContSty={styles.forgetTxt}
        loading={false}
        title="Verify OTP"
        onPress={()=> { console.log("verigyOTP");
         }}
    />
    )
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
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Verify it’s you</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent to your mobile number +92 3XX XXXXXXX
        </Text>
        <OTPInput length={5} onChange={(val) => setOtp(val)} />
        {verifyOtp()}

      </View>
    </MainContainer>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10), 
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
    marginBottom: 16,
  },
    forgetTxt: { marginTop: 30, marginBottom: 50 }, forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },


});
