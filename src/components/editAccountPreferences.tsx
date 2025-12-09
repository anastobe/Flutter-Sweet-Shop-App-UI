import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import CustomButton from '../components/customButton';
import { FONTFAMILY, FONT_SIZES, THEME } from "../styles";
import Images from '../config/images';
import { handleSize } from '../config/responsiveTheme';

type Props = {
  accountName?: string;
  onPressSave?: () => void;
  onPressFreeze?: () => void;
  onPressDelete?: () => void;
  onPressEdit?: () => void;
  isPendingAccFreeze: any;
  isPendingAccDelete: any;
};

const EditAccountPreferences: React.FC<Props> = ({
  accountName = "Primary GBP Wallet",
  onPressSave,
  onPressFreeze,
  onPressDelete,
  onPressEdit,
  isPendingAccFreeze,
  isPendingAccDelete
}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.addCardGradient}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false} >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>
              {`Update preferences and control\nthis account`}
            </Text>
          </View>

          {/* Account Row */}
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Account Name</Text>
            <View style={styles.accountRight}>
              <Text style={styles.accountValue}>{accountName}</Text>
            </View>
          </View>

          {/* Buttons */}
          <CustomButton
            loading={isPendingAccFreeze}
            btnContSty={styles.forgetTxt2}
            title="Freeze Now"
            onPress={onPressFreeze}
          />
          
          <CustomButton
            showmyStyleOnly={true}
            loading={isPendingAccDelete}
            btnContSty={styles.button}
            txtColor={styles.buttonText}
            title="Delete Account"
            onPress={onPressDelete}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditAccountPreferences;

const styles = StyleSheet.create({
  overlay: {
    marginTop: handleSize.h(30),
    marginHorizontal: handleSize.w(20),
  },

  button: {
    backgroundColor: THEME.white,
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(56),
  },
  buttonText: {
    color: THEME.medRed,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.oneeight),
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
    backgroundColor: THEME.primary,
  },
  forgetTxt3: {
    marginTop: 0,
    marginBottom: handleSize.h(20),
    backgroundColor: THEME.white,
  },
});
