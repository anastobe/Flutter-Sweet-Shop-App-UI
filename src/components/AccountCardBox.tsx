import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { handleSize } from "../config/responsiveTheme";
import Metrics from "../styles/metrics";
import NumberSkeleton from "./numberSkeleton";

type Props = {
  total: string;
  onHold: string;
  available: string;
  onPress: any;
  onPresseye: any;
  showBalance: boolean;
  getAssetBalancePending: boolean
};

const AccountCardBox = ({getAssetBalancePending, total, onHold, available, onPress, onPresseye, showBalance }: Props) => {

  // console.log("==>",getAssetBalancePending);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <TouchableWithoutFeedback>
        <View style={styles.balanceRow}>

          {getAssetBalancePending ? (
            // <NumberSkeleton width={120} height={50} />
            <Text style={styles.total}>{"..."}</Text>                
          ) : (
            <Text style={styles.total}>{showBalance ? total : "**********"}</Text>
          )}

          {/* <Text style={styles.total}>{showBalance ? total : "**********"}</Text> */}
          <TouchableOpacity onPress={onPresseye} style={styles.eyeButton}>
            <Icon
              name={showBalance ? "eye-outline" : "eye-off-outline"}
              size={handleSize.f(20)}
              color={THEME.white}
              style={{ top: handleSize.h(2) }}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <Text style={styles.label}>Total balance</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          
            {getAssetBalancePending ? (
              // <NumberSkeleton width={120} />
              <Text style={styles.sub}>{"..."}</Text>                
            ) : (
              <Text style={styles.sub}>{!showBalance ? "****" : onHold}</Text>
            )}

          <Text style={styles.subLabel}>On hold or pending</Text>
        </View>
        <View style={styles.column}>
          {/* <Text style={styles.sub}>{!showBalance ? "****" : available}</Text> */}

            {getAssetBalancePending ? (
              // <NumberSkeleton width={120} />
              <Text style={styles.sub}>{"..."}</Text>                
            ) : (
                <Text style={styles.sub}>{!showBalance ? "****" : available}</Text>
            )}

          <Text style={styles.subLabel}>Available to use</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Metrics.width,
    marginTop: handleSize.f(2),
    // padding: handleSize.f(15),
    borderRadius: handleSize.f(16),
    justifyContent: "center",
    // backgroundColor: "#6a1b9a", // replace with gradient if needed
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    // height: handleSize.f(50),
    // backgroundColor: "red"
  },
  eyeButton: {
    alignItems: "center",
    justifyContent: "center",
    height: handleSize.h(55),
    marginTop: handleSize.f(-2),
    marginLeft: handleSize.w(10),
  },
  total: {
    fontSize: handleSize.f(FONT_SIZES.threezero),
    fontFamily: FONTFAMILY.Bold,
    color: THEME.white,
    textAlign: "center",
  },
  label: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: "center",
    marginBottom: handleSize.f(4),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: handleSize.w(23),
  },
  column: {
    // optionally align items
  },
  sub: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  subLabel: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginTop: handleSize.h(4),
  },
});

export default AccountCardBox;
