import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import commonUtils from '../utils/common.utils';
import { handleSize } from '../config/responsiveTheme';
import { CommonUtils } from '../utils';

interface Props {
  item?: any;
  onPress?: () => void;
}

const TransactionItem = ({ item, onPress }: Props) => {
  const isDebit = item?.direction === 'debit';

  // console.log("TransactionItem==>",item?.currency);
  

  return (
    <TouchableOpacity onPress={()=>onPress(item)} style={styles.item}>
      <View style={styles.sectionLeft}>
        <View style={styles.iconCONT}>
          <Icon
            name={isDebit ? 'arrow-back-outline' : 'arrow-forward-outline'}
            size={handleSize.f(16)}
            color={THEME.textPrimary}
          />
        </View>

        <View>
          <Text style={styles.name}>
            {item?.frontier_customer?.business_customer?.company_name || '-'}
          </Text>
          <Text style={styles.subname}>
            {/* {commonUtils.timeHumanize(item?.created_at)} */}
            {CommonUtils.formatDate(item?.created_at)}
          </Text>
        </View>
      </View>

      <Text style={styles.amount}>{isDebit ? "-" : "+"} {CommonUtils?.getCurrencySymbol(item?.currency)} {item?.amount}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TransactionItem);

const styles = StyleSheet.create({
  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.f(10),
    height: handleSize.h(68),
    marginHorizontal: handleSize.w(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: handleSize.w(10),
    marginTop: handleSize.h(10),
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },
  subname: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(10),
    marginTop: handleSize.h(2),
  },
  amount: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
});
