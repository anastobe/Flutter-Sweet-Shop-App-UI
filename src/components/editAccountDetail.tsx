import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Images from '../config/images';
import CustomButton from '../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import Metrics from "../styles/metrics";
import InputField from "./textInput";

type Props = {
  title?: string;
  onPressSave?: () => void;
  gbpWallet?: any;
  setgbpWallet?: any
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
      style={{ flex: 1, width: Metrics.width}}
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
            placeholder="Primary GBP Wallet"
            value={gbpWallet}
            onChangeText={setgbpWallet}
            keyboardType={'numeric'}
            margBtm={20}
        />

        {/* Buttons */}
        <CustomButton
          btnContSty={styles.forgetTxt1}
          title="Save Changes"
          onPress={onPressSave}
        />

      </View>
    </ImageBackground>
  );
};

export default EditAccountDetail;

const styles = StyleSheet.create({
  overlay: {
    marginTop: 30,
    marginHorizontal: 20
    // alignItems:"center"

  },
  headerRow: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center",
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  accountLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
  },
  accountRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountValue: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    marginRight: 10,
  },
  forgetTxt1: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: THEME.primary,
  },
  forgetTxt2: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: THEME.white,
  },
  forgetTxt3: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: THEME.white,
  },
});
