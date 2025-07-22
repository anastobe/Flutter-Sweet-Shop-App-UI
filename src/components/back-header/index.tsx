import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text
} from "react-native";
// import { Text } from "../../components";
import { Images, NavigationService } from "../../config";
// import { useTheme } from "../../hooks";
import { SD } from "../../utils";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

type BackHeaderProps = {
  customeStyle?: StyleProp<ViewStyle>;
  backFunction?: () => void;
  btnImage?: ImageSourcePropType;
};

export const BackHeader: React.FC<BackHeaderProps> = ({
  customeStyle,
  backFunction = () => NavigationService.goBack(),
  btnImage,
}) => {
  const { colors } = useTheme();
  const themeType = useSelector(state => state?.AuthReducer?.themeType);

  return (
      <View style={[styles.container, customeStyle]}>
          <TouchableOpacity onPress={backFunction} style={[styles.backButton,{ backgroundColor: colors.White }]} >
              <Image source={btnImage} style={{ width: 24, height: 24 }} tintColor={themeType && colors.T_White} />
          </TouchableOpacity>       
      </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  backButton: {
    width: SD.hp(40),
    height: SD.wp(40),
    borderRadius: SD.wp(14),
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#000",
    // borderWidth: 0.01,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4.00,
    elevation: 1,

  },
  backImage: {
    width: SD.wp(30),
    height: SD.hp(29),
  },



});
