import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import CustomButton from '../../components/customButton';
import Images from '../../config/images';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
import { BottomSheet, MainContainer, Modal, OTPInput } from '../../components';
import { scale } from 'react-native-size-matters';
import { useMfaSetupViewModel } from '../../viewModels/authViewModel/useMfaSetupViewModel';
import StatusBarManager from '../../components/statusBarManager';
import QRCode from 'react-native-qrcode-svg';
import { handleSize } from '../../config/responsiveTheme';
import Clipboard from '@react-native-clipboard/clipboard';

type mfaSetupProps = {};

export const mfaSetup: React.FC = () => {

  const vm = useMfaSetupViewModel();

  return (
    <MainContainer 
    showBackArrow={true}
    refreshing={false} isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 30 }} mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ alignItems: "center", marginTop: handleSize.f(50) }} >
        <QRCode
          value={"otpauth://totp/FrontierPay?secret=7S2HFXX7YLICNPYFTGLWERHMMZKDH7J2PM3RXNKZ2VKF27B7EM3Q&issuer=FrontierPay"}
          size={200}
        />
      </View>

      <Text style={styles.btnTxtdown} >{`Can't scan QR?`}</Text>
      <Text style={styles.btnTxtdown2} >{`Enter this code manually in Google Authenticator`}</Text>

      <View>
        <Text style={styles.btnTxtdown3} >{`7S2HFXX7YLICNPYFTGLWERHMMZKDH7J2PM3RXNKZ2VKF27B7EM3Q`}</Text>
        <TouchableOpacity onPress={()=>vm.copyTxt(`7S2HFXX7YLICNPYFTGLWERHMMZKDH7J2PM3RXNKZ2VKF27B7EM3Q`)} >
          <Text style={styles.btnTxtdowncopy} >{`Click to copy`}</Text>
        </TouchableOpacity>
      </View>


      <OTPInput length={5} onChange={(val: string) => vm.setOtp(val)} />

       <CustomButton
         btnContSty={styles.forgetTxt}
         loading={false}
         title="Verify & Enable MFA"
         onPress={vm.onPressEnableMFA}
       />

    </MainContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  logo: {
   width: METRICS.width,
    height: 56,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 60
  },
  logodown: {
    width: '50%',
    height: scale(20),
    alignSelf: "center",
    marginTop: 20
  },
  btnTxt:
  { 
    color: THEME.white, 
    fontFamily: FONTFAMILY.SemiBold, 
    fontSize: FONT_SIZES.foureight, 
    marginLeft: 0,
    marginTop: 24,
    lineHeight: 60
  },
  btnTxtdown:{
    color: THEME.white, 
    fontFamily: FONTFAMILY.Medium, 
    fontSize: FONT_SIZES.twotwo, 
    marginTop: handleSize.f(20),
    lineHeight: handleSize.f(24),
    textAlign: 'center'
  },
  btnTxtdowncopy:{
    color: THEME.white, 
    fontFamily: FONTFAMILY.Medium, 
    fontSize: FONT_SIZES.twotwo, 
    lineHeight: handleSize.f(24),
    textAlign: 'center',
    marginBottom: handleSize.f(20),
  },
  btnTxtdown2:{
    color: THEME.white, 
    fontFamily: FONTFAMILY.Regular, 
    fontSize: FONT_SIZES.oneeight, 
    marginTop: handleSize.f(20),
    marginBottom: handleSize.f(20),
    lineHeight: handleSize.f(20),
    textAlign: 'center'
  },
  btnTxtdown3:{
    color: THEME.white, 
    fontFamily: FONTFAMILY.Regular, 
    fontSize: FONT_SIZES.oneeight, 
    marginTop: handleSize.f(10),
    marginBottom: handleSize.f(10),
    lineHeight: handleSize.f(20),
    textAlign: 'center'
  },
   forgetTxt:
  { marginTop: handleSize.f(30), marginBottom: 18 },
  btnContStyle:
  { backgroundColor: "transparent", borderColor: THEME.white, borderWidth: 1, flexDirection: "row", height: 56, borderRadius: 10, justifyContent: "center", alignItems: 'center' },
  btnTxtBtn:
  { color: THEME.white, fontFamily: FONTFAMILY.Regular, fontSize: FONT_SIZES.onesix, marginLeft: 0 },
  creatAC:{
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.oneeight,
    marginTop: 18,
    textAlign: "center"
  },

});

export default mfaSetup;