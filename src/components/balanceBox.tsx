import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONTFAMILY, FONT_SIZES, THEME } from '../styles';

interface BalanceBoxProps {
  amount: string | number;
  label: string;
  containerHeight?: number; // optional if you want to override default
}

const BalanceBox: React.FC<BalanceBoxProps> = ({
  amount,
  label,
  containerHeight = 80,
}) => {
  return (
    <View style={[styles.containerAMOUNT, { height: containerHeight }]}>
      <Text style={styles.balanceAmountTxt}>{amount}</Text>
      <Text style={styles.balanceTxt}>{label}</Text>
    </View>
  );
};

export default BalanceBox;

const styles = StyleSheet.create({
//   containerAMOUNT: {
//     backgroundColor: THEME.whitergba,
//     width: '100%',
//     marginVertical: scale(15),
//     borderRadius: scale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   amountBox: {
//     // Can add padding/margin if needed
//   },
//   balanceTxt: {
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onefour,
//     color: THEME.white,
//     marginTop: scale(5),
//   },
//   balanceAmountTxt: {
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.threezero,
//     color: THEME.white,
//   },

  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    // padding: scale(8),
    width: "100%",
    // alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  amountBox: {
    // paddingHorizontal: scale(10),
    // paddingVertical: scale(4),
    // borderRadius: scale(6),
    // marginTop: 5,
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    // marginTop: 5,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threezero,
    color: THEME.white,
    lineHeight: 30,
    // backgroundColor :'red',
    // paddingBottom: 5,
    // marginTop: 5,
    // paddingBottom: 1,
  },


});
