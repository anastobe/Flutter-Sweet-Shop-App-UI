import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../styles";

const OptionsHeader = ({ onPressNotification, onPressAdd }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Left Back Arrow */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowCont}
        >
          <Icon name="arrow-back-outline" size={36} color={THEME.white} />
        </TouchableOpacity> */}
      </View>

      {/* Right Icons */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onPressNotification}
          style={[styles.rightIconCont, { marginRight: 10 }]}
        >
          <Icon name="notifications-outline" size={16} color={THEME.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressAdd} style={styles.rightIconCont}>
          <Icon name="add" size={16} color={THEME.textPrimary} />
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
    marginHorizontal: 20,
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
    marginTop: 20,
  },
});

export default OptionsHeader;
