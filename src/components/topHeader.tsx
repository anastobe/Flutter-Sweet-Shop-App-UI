import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { Images } from "../config";
import { handleSize } from "../config/responsiveTheme";

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
          style={[styles.rightIconCont, { marginRight: handleSize.w(10) }]}
        >
          <Icon
            name="notifications-outline"
            size={handleSize.f(17)}
            color={THEME.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressAdd} style={styles.rightIconCont}>
          <Image
            source={Images.add}
            style={{ width: handleSize.w(11), height: handleSize.h(11) }}
            tintColor={THEME.textPrimary}
          />
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
    marginVertical: handleSize.h(10),
    marginHorizontal: handleSize.w(24),
  },
  titleTop: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.oneeight),
    color: THEME.white,
    marginLeft: handleSize.w(5),
  },
  rightIconCont: {
    width: handleSize.w(28),
    height: handleSize.h(28),
    borderRadius: handleSize.f(50),
    justifyContent: "center",
    alignItems: "center",
    marginTop: handleSize.h(20),
    backgroundColor: THEME.white,
  },
  arrowCont: {
    marginTop: handleSize.h(25),
  },
});

export default OptionsHeader;
