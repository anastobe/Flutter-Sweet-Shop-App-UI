import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Images from '../config/images';
import CustomButton from '../components/customButton';
import InputField from "./textInput";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { handleSize } from '../config/responsiveTheme';

type Props = {
  title?: string;
  onPressSave?: () => void;
  gbpWallet?: any;
  setgbpWallet?: any;
};

const EditAccountDetail: React.FC<Props> = ({
  title,
  onPressSave,
  gbpWallet,
  setgbpWallet
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.addCardGradient}
      style={{ flex: 1 }}
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>
            {title}
          </Text>
        </View>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Primary GBP wallet"
          value={gbpWallet}
          onChangeText={setgbpWallet}
          keyboardType={'default'}
          margBtm={20}
        />

        {/* Buttons */}
        <CustomButton
          btnContSty={styles.forgetTxt1}
          title="Save changes"
          onPress={onPressSave}
        />
      </View>
    </ImageBackground>
  );
};

export default EditAccountDetail;

const styles = StyleSheet.create({
  overlay: {
    marginTop: handleSize.h(30),
    marginHorizontal: handleSize.w(20),
  },
  headerRow: {
    marginBottom: handleSize.h(20),
  },
  headerText: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center",
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: handleSize.h(20),
  },
  accountLabel: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
  },
  accountRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountValue: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    marginRight: handleSize.w(10),
  },
  forgetTxt1: {
    marginTop: 0,
    marginBottom: handleSize.h(20),
    backgroundColor: THEME.primary,
  },
  forgetTxt2: {
    marginTop: 0,
    marginBottom: handleSize.h(20),
    backgroundColor: THEME.white,
  },
  forgetTxt3: {
    marginTop: 0,
    marginBottom: handleSize.h(20),
    backgroundColor: THEME.white,
  },
});
