// components/inputDropDownStyle.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import { Images } from '../config';

export const InputDropDownStyle = ({title, label, currency, flag, onPress }) => {
  return (
    <TouchableOpacity style={styles.containerbelw} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* If you want icon instead of flag, swap here */}
        <Icon name={"flag"} size={28} color={THEME.white} />
        <View style={{ marginLeft: 10 }} >
          <Text style={styles.labeltxt}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.accountName}>{label}</Text>
            <View style={styles.currencyTag}>
              <Text style={styles.currencyText}>{currency}</Text>
            </View>
          </View>
        </View>
      </View>

      <Image
        source={Images.dropDown}
        style={{ width: 26, height: 26 }}
        tintColor={THEME.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerbelw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: scale(55),
    // backgroundColor: THEME.whitergba,
  },
  flag: {
    width: scale(28),
    height: scale(28),
    borderRadius: 14,
    marginRight: 10,
  },
  labeltxt: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  accountName: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  currencyTag: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8
  },
  currencyText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
});
