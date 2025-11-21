import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../../styles';
import { MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import useUpdatePasswordViewModel from '../../../viewModels/homeViewModel/more/useUpdatePasswordViewModel';

export default function UpdatePassword() {
  const {
    password,
    setPassword,
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
    rules,
    pressBackArrow,
    onUpdatePress,
  } = useUpdatePasswordViewModel();

  function renderRule(iconCondition: boolean, txt: string) {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
        <Icon
          name={iconCondition ? 'checkmark-circle-outline' : 'close-circle-outline'}
          size={25}
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
      customeStyle={{ paddingHorizontal: 20 }}
      mainContainerStyle={styles.container}
    >
      <Text style={styles.title}>Update Password</Text>

      <InputField
        margTp={20}
        margBtm={20}
        image={secure ? 'eye-off-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.primary}
        blurOnSubmit={false}
        secureEntry={secure}
        placeholder="Current Password"
        value={password}
        onPress={() => setSecure(!secure)}
        onChangeText={setPassword}
        maxlen={30}
      />

      <InputField
        margBtm={20}
        image={secure2 ? 'eye-outline' : 'eye-outline'}
        autoCapital="none"
        imagetintColor={THEME.primary}
        secureEntry={secure2}
        blurOnSubmit={false}
        placeholder="New Password"
        value={newPassword}
        onPress={() => setSecure2(!secure2)}
        onChangeText={setNewPassword}
      />

      {renderRule(rules.minLength(newPassword), 'Minimum 8 characters')}
      {renderRule(rules.lowerCase(newPassword), 'At least one lower case letter')}
      {renderRule(rules.upperCase(newPassword), 'At least one upper case letter')}
      {renderRule(rules.number(newPassword), 'At least one number')}
      {renderRule(rules.specialChar(newPassword), 'At least 1 special character (e.g., !@#$%^&*)')}

      <InputField
        margTp={10}
        margBtm={10}
        image={secure3 ? 'eye-outline' : 'eye-outline'}
        autoCapital="none"
        secureEntry={secure3}
        blurOnSubmit={false}
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onPress={() => setSecure3(!secure3)}
        onChangeText={setConfirmNewPassword}
        imagetintColor={THEME.primary}
      />

      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update Password"
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
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  ruleText: {
    marginLeft: 5,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
    fontFamily: FONTFAMILY.Regular,
  },
  forgetTxt: {
    marginTop: 20,
    marginBottom: 20,
  },
});
