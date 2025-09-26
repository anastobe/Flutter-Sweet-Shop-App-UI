// components/inputDropDownStyle.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { scale } from 'react-native-size-matters';

export const InputDropDownStyle = ({title, label, currency, flag, onPress }) => {
  return (
    <TouchableOpacity style={styles.containerbelw} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* If you want icon instead of flag, swap here */}
        <Image source={flag} style={styles.flag} />
        <View>
          <Text style={styles.labeltxt}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.accountName}>{label}</Text>
            <View style={styles.currencyTag}>
              <Text style={styles.currencyText}>{currency}</Text>
            </View>
          </View>
        </View>
      </View>

      <Icon name="chevron-down-outline" size={20} color={THEME.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerbelw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: THEME.gray,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: scale(60),
    backgroundColor: THEME.white,
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
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
  },
  currencyTag: {
    backgroundColor: '#B8E6EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8
  },
  currencyText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
});
