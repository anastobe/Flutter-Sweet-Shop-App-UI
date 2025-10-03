import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles"; // apne path ke hisaab se import karo
import Metrics from "../styles/metrics";

const StatCard = ({ title, amount, percentage, isPositive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={styles.amount}>{amount}</Text>
        <View style={styles.percentRow}>
          <Icon
            name={isPositive ? "arrow-up-outline" : "arrow-down-outline"}
            size={14}
            color={isPositive ? THEME.white : THEME.medRed}
          />
          <Text
            style={[
              styles.percentage,
              { color: isPositive ? THEME.white : THEME.medRed },
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
    backgroundColor: THEME.darkSecondary, // dark card background
    borderRadius: 12,
    height: 80,
    width: Metrics.width/2- 20,
    justifyContent: "center",
    paddingLeft: 10
  },
  title: {
    color: THEME.white,
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Medium,
  },
  amount: {
    color: THEME.white,
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.Medium,
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 2,
  },
  percentage: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 2,
  },
});
