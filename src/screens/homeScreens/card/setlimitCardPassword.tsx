import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import usesetCardPasswordViewModel from '../../../viewModels/homeViewModel/more/usesetCardPasswordViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import Metrics from '../../../styles/metrics';

export default function setlimitCardPassword() {
  const {
    password,
    setPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    secure,
    setSecure,
    secure2,
    setSecure2,
    secure3,
    setSecure3,
    rules,
    pressBackArrow,
    onUpdatePress,
    isPending_changePassword
  } = usesetCardPasswordViewModel();

  function renderRule(iconCondition: boolean, txt: string) {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: handleSize.h(2), alignItems: "center" }}>
        <Icon
          name={iconCondition ? 'checkmark-circle-outline' : 'close-circle-outline'}
          size={handleSize.f(20)}
          color={iconCondition ? THEME.green : THEME.lightred}
        />
        <Text style={styles.ruleText}>{txt}</Text>
      </View>
    );
  }

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

      <Text style={styles.title}>Card Password</Text>

      <InputField
        margTp={handleSize.f(15)}
        margBtm={handleSize.f(15)}
        textInputStyle={styles.innerinput}
        image={secure ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.white}
        blurOnSubmit={false}
        secureEntry={secure}
        placeholder="New Password"
        value={password}
        onPress={() => setSecure(!secure)}
        onChangeText={setPassword}
        maxlen={30}
      />

      <InputField
        margBtm={handleSize.f(15)}
        textInputStyle={styles.innerinput}
        image={secure2 ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.white}
        secureEntry={secure2}
        blurOnSubmit={false}
        placeholder="Confirm Password"
        value={confirmNewPassword}
        onPress={() => setSecure2(!secure2)}
        onChangeText={setConfirmNewPassword}
      />

      {renderRule(rules.minLength(password) as boolean, 'Minimum 8 characters')}
      {renderRule(rules.lowerCase(password) as boolean, 'At least one lower case letter')}
      {renderRule(rules.upperCase(password) as boolean, 'At least one upper case letter')}
      {renderRule(rules.number(password) as boolean, 'At least one number')}
      {renderRule(rules.specialChar(password) as boolean, 'At least 1 special character (e.g., !@#$%^&*)')}

     {rules.minLength(password) && rules.lowerCase(password) && rules.upperCase(password) && rules.number(password) && rules.specialChar(password) &&      
      <CustomButton
        loading={isPending_changePassword}
        btnContSty={styles.forgetTxt}
        title="Save"
        onPress={onUpdatePress}
      />}
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
    marginTop: handleSize.f(30),
    marginBottom: handleSize.f(20),
  },
  innerinput: {
    height: handleSize.h(56),
    width: (Metrics.width as number) - handleSize.w(90),
    paddingLeft: handleSize.w(20),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    justifyContent: "center",
  },
});
