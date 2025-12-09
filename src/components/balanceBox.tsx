import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTFAMILY, FONT_SIZES, THEME } from '../styles';
import { handleSize } from '../config/responsiveTheme';
import Metrics from '../styles/metrics';

interface BalanceBoxProps {
  amount: string | number;
  label: string;
  containerHeight?: number; // optional to override default
}

const BalanceBox: React.FC<BalanceBoxProps> = ({
  amount,
  label,
  containerHeight,
}) => {
  return (
    <View style={[styles.containerAMOUNT, { height: containerHeight ? handleSize.h(containerHeight) : handleSize.h(80) }]}>
      <Text style={styles.balanceAmountTxt}>{amount}</Text>
      <Text style={styles.balanceTxt}>{label}</Text>
    </View>
  );
};

export default BalanceBox;

const styles = StyleSheet.create({
  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    width: "100%",
    marginVertical: handleSize.h(15),
    borderRadius: handleSize.f(12),
    alignItems: "center",
    justifyContent: "center",
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    // marginTop: handleSize.h(5),
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.white,
    lineHeight: handleSize.h(30),
    // marginBottom: handleSize.h(5),
  },
});
