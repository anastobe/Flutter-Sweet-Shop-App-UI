import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Metrics from "../styles/metrics";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from "react-native";

type Props = {
  total: string;
  onHold: string;
  available: string;
  onPress: any,
  onPresseye: any,
  showBalance: any
};

const AccountCardBox = ({ total, onHold, available,onPress,onPresseye,showBalance }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <TouchableWithoutFeedback>
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", height: 55 }} >
        {showBalance ? <Text style={styles.total}>{total}</Text> : <Text style={styles.total}>**********</Text> }
          <TouchableOpacity onPress={onPresseye}  style={{  alignItems: "center", justifyContent: "center",height: 55 }}>
        <Icon name={showBalance ? "eye-outline" : "eye-off" } style={{ top: 2 }} size={20} color={THEME.white} />
          </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
      <Text style={styles.label}>Total Balance</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sub}>{!showBalance? "****" : onHold}</Text>
          <Text style={styles.subLabel}>On Hold or Pending</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.sub}>{!showBalance? "****" : available}</Text>
          <Text style={styles.subLabel}>Available to Use</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#6a1b9a", // purple gradient ki jagah solid color
    // borderRadius: 16,
    // padding: 20,
    // margin: 10,
    width: Metrics.width,
    height: Metrics.halfScreen - 180,
    justifyContent: "center"
  },
  total: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Bold,
    color: THEME.white,
    textAlign: "center",
    marginRight: 10
  },
  label: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    alignItems: "center",
    flex: 1,
  },
  sub: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  subLabel: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
});

export default AccountCardBox;
