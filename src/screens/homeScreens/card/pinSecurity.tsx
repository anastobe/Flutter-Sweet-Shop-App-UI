// src/screens/Home/view/PinSecurityView.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import usePinSecurityViewModel from '../../../viewModels/homeViewModel/card/usePinSecurityViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

export default function PinSecurityView({...props}) {
  const {
    newPin,
    setNewPin,
    confirmPin,
    setConfirmPin,
    pressBackArrow,
    onUpdatePin,
    isPendingsetPinSecurity
  } = usePinSecurityViewModel(props);

  function renderFields() {
    return (
      <View>
        <InputField
          marginTp={20}
          placeholder="New PIN"
          value={newPin}
          onChangeText={setNewPin}
          keyboardType="numeric"
          margBtm={10}
        />
        <InputField
          marginTp={20}
          placeholder="Confirm new PIN"
          value={confirmPin}
          onChangeText={setConfirmPin}
          keyboardType="numeric"
          margBtm={10}
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <CustomButton
        loading={isPendingsetPinSecurity}
        btnContSty={styles.forgetTxt}
        title="Update PIN"
        onPress={onUpdatePin}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}>
        
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20), }}>
        <Text style={styles.title}>PIN & security</Text>
        <Text style={styles.subtitle}>
          Manage your card's PIN and extra security options.
        </Text>

        {renderFields()}
        {renderButton()}
      </View>
    </MainContainer>
  );
}
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },

  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },

  forgetTxt: { 
    marginTop: handleSize.h(20), 
    marginBottom: handleSize.h(20) 
  },

  inputContainer: {
    marginBottom: handleSize.h(10),
  },
});