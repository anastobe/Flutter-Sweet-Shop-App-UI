import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Images from '../config/images';
import CustomButton from '../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import Metrics from "../styles/metrics";
import { TouchableOpacity } from "react-native";

type Props = {
  accountName?: string;
  onPressSave?: () => void;
  onPressFreeze?: () => void;
  onPressDelete?: () => void;
  onPressEdit?: () => void
  isPendingAccFreeze: any,
  isPendingAccDelete: any
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
      style={{ flex: 1}}
    >
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} >
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
              {/* <TouchableOpacity onPress={onPressEdit} >
                <Icon name="create-outline" size={26} color={THEME.white} />
              </TouchableOpacity> */}
            </View>
          </View>

          {/* Buttons */}
          {/* <CustomButton
            btnContSty={styles.forgetTxt1}
            title="Save Changes"
            onPress={onPressSave}
          /> */}
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
    marginTop: 30,
    marginHorizontal: 20
    // alignItems:"center"

  },

  button: {
    backgroundColor: THEME.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    height: 56,

  },
  buttonText: {
    color: THEME.medRed,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.oneeight
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
    backgroundColor: THEME.primary,
  },
  forgetTxt3: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: THEME.white,
  },
});
