import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Metrics from "../styles/metrics";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { TouchableOpacity } from "react-native";

type Props = {
  total: string;
  onHold: string;
  available: string;
  onPress: any
};

const AccountCardBox = ({ total, onHold, available,onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.total}>{total}</Text>
      <Text style={styles.label}>Total Balance</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sub}>{onHold}</Text>
          <Text style={styles.subLabel}>On Hold or Pending</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.sub}>{available}</Text>
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
