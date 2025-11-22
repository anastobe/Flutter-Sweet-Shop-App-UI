import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { Images } from "../config";
import { scale } from "react-native-size-matters";

const OptionsHeader = ({ leftTxt, onPressNotification, onPressAdd }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Left Back Arrow */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowCont}
        >
          <Text style={styles.titleTop}>{leftTxt}</Text>
        </TouchableOpacity>
      </View>

      {/* Right Icons */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onPressNotification}
          style={[styles.rightIconCont, { marginRight: 10 }]}
        >
          <Icon name="notifications-outline" size={17} color={THEME.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressAdd} style={styles.rightIconCont}>
          <Image source={Images.add} style={{ width: 11, height: 11 }} tintColor={THEME.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 24,
  },
    titleTop:{
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.oneeight,
    color: THEME.white,
    marginLeft: scale(5),
    // backgroundColor: "red",
    // marginTop: 12,
    // marginBottom: 10
  },
  rightIconCont: {
    width: 28,
    height: 28,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: THEME.white,
  },
  arrowCont: {
    marginTop: 25,
  },
});

export default OptionsHeader;
