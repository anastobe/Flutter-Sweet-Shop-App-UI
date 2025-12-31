// src/screens/Auth/SetPassword.tsx

import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { MainContainer } from "../../components";
import InputField from "../../components/textInput";
import CustomButton from "../../components/customButton";
import Images from "../../config/images";
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from "../../styles";
import { scale } from "react-native-size-matters";
import { useSetPasswordViewModel } from "../../viewModels/authViewModel/useSetPasswordViewModel";
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarManager from "../../components/statusBarManager";
import { handleSize } from "../../config/responsiveTheme";

const SetPassword: React.FC = () => {
  const {
    password,
    newPassword,
    secure,
    secure2,
    rules,
    toggleSecure,
    toggleSecure2,
    setPassword,
    setNewPassword,
    onSubmit,
  } = useSetPasswordViewModel();

  
    const renderRule = (iconCondition: boolean, text: string) => (
      <View style={{ flexDirection: "row", paddingVertical: 5 }}>
        <Icon
          name={iconCondition ? "checkmark-circle-outline" : "close-circle-outline"}
          size={handleSize.f(25)}
          color={iconCondition ? THEME.green : THEME.lightred}
        />
        <Text style={{ marginLeft: 5, color: THEME.white }}>{text}</Text>
      </View>
    );

  return (
    <MainContainer
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: 20 }}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>Create Your New Password</Text>
      <Text style={styles.titlesub}>
        Choose a strong, new password for your Frontier Pay account.
      </Text>

      <InputField
        marginTp={20}
        image={secure ? "eye-off-outline" : "eye-outline"}
        autoCapital="none"
        blurOnSubmit={false}
        secureEntry={secure}
        placeholder="Password"
        value={password}
        onPress={toggleSecure}
        onChangeText={setPassword}
        margBtm={20}
        imagetintColor={THEME.white}
        maxlen={30}
      />

      {renderRule(rules.minLength(password), "Minimum 8 characters")}
      {renderRule(rules.lowerCase(password), "At least one lower case letter")}
      {renderRule(rules.upperCase(password), "At least one upper case letter")}
      {renderRule(rules.number(password), "At least one number")}
      {renderRule(
        rules.specialChar(password),
        "At least 1 special character (e.g., !@#$%^&*)"
      )}

      <InputField
        margTp={20}
        image={secure2 ? "eye-off-outline" : "eye-outline"}
        autoCapital="none"
        blurOnSubmit={false}
        secureEntry={secure2}
        placeholder="Confirm new password"
        value={newPassword}
        onPress={toggleSecure2}
        onChangeText={setNewPassword}
        imagetintColor={THEME.white}
      />

      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Set new password"
        onPress={onSubmit}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  logo: {
    width: METRICS.width,
    height: 56,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 45,
  },
  forgetTxt: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threesix,
    marginBottom: scale(10),
    marginTop: scale(80),
    textAlign: "center",
    lineHeight: 35,
  },
  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    marginBottom: scale(40),
    textAlign: "center",
  },
});

export default SetPassword;
