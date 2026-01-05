import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { handleSize } from "../config/responsiveTheme";
import Metrics from "../styles/metrics";

const AccountList = ({length,index, account, onPress }: any) => {

  const asset = account.assets?.[0]; // default first currency

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.accountCard,{ borderBottomWidth: length?.length - 1 == index  ? 0 : 0.5,  }]} >
      <View style={styles.row}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.accountName}>{account.name} ( {asset?.currency?.iso_code} ) </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.iban}>
        IBAN: {account.iban}
      </Text>

      </View>

        <View style={styles.currencyCont} >
        <Text style={styles.currency}>
          Select
        </Text>
        </View>

    </TouchableOpacity>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#fff',
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: THEME.white
  },

  separator: {
    height: 10,
  },

  accountCard: {
    // padding: 14,
    // borderRadius: 12,
    // backgroundColor: THEME.darkSecondary,
    height: handleSize.h(65),
    flexDirection: "row",

    borderBottomColor: THEME.white,
    // paddingBottom: handleSize.h(20),
    justifyContent: "space-between",
    alignItems: "center"


  },

  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  accountName: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    width: Metrics.width-handleSize.w(110),

  },
  currencyCont: 
  {
     alignItems: "center",
     justifyContent: "center",
     height: handleSize.h(25),
     width: handleSize.w(70),
     backgroundColor: THEME.white,
     borderRadius: 10,

  },
  currency: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.gray
  },

  iban: {
    // marginTop: handleSize.h(6),
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    width: Metrics.width-handleSize.w(110),

  },

  balanceRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  balanceLabel: {
    fontSize: 12,
    color: '#999',
  },

  balanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
});
