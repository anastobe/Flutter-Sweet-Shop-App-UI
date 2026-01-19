import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles"; 
import Metrics from "../styles/metrics";
import { Images } from "../config";
import { handleSize } from "../config/responsiveTheme";

const StatCard = ({ value, title, amount, percentage, isPositive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>{value}</Text>
        <View style={styles.percentRow}>
          <Image
            tintColor={isPositive ? THEME.primary : THEME.medRed}
            source={isPositive ? Images.increase : Images.decrease}
            style={{ width: handleSize.w(15), height: handleSize.h(15), marginRight: handleSize.w(6) }}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.percentage,
              { color: isPositive ? THEME.primary : THEME.medRed },
            ]}
          >
            {percentage}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0e0e2f",
    borderRadius: handleSize.f(12),
    height: handleSize.f(81),
    width: Metrics.width / 2 - handleSize.w(20),
    justifyContent: "center",
    paddingHorizontal: handleSize.w(10),
  },
  title: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    lineHeight: handleSize.h(14),
  },
  amount: {
    color: THEME.white,
    fontSize: handleSize.f(21),
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.f(6),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: handleSize.w(8),
    marginBottom: handleSize.h(2),
  },
  percentage: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Regular,
    marginLeft: handleSize.w(2),
  },
});
