import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import commonUtils from '../utils/common.utils';
import { handleSize } from '../config/responsiveTheme';
import { CommonUtils } from '../utils';

interface Props {
  item?: any;
  type?: string;
  onPress?: () => void;
}

const TransactionItem = ({ item, type, onPress }: Props) => {
  const isDebit = item?.direction === 'debit';

  console.log(type,"TransactionItem==>",item?.card_transactions[0]?.merchant_id); 
  

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
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.name}>
            {/* {item?.description} */}
            {type == 'card' ? 
              item?.payment_transactions?.[0]?.beneficiary_name?.company_name || '...'
              :
              item?.card_transactions[0]?.merchant_id || '...'

            }
            {/* {item?.payment_transactions?.[0]?.beneficiary_name?.company_name || '...'} */}
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
    height: handleSize.f(68),
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
    width: handleSize.f(36),
    height: handleSize.f(36),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: handleSize.w(140),
    // backgroundColor: "red",
    fontSize: handleSize.f(FONT_SIZES.onethree),
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
