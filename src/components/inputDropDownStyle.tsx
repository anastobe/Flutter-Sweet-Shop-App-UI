// components/inputDropDownStyle.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';

export const InputDropDownStyle = ({ title, label, currency, flag, onPress }) => {
  return (
    <TouchableOpacity style={styles.containerbelw} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Icon/flag */}
        <Icon name="flag" size={handleSize.f(28)} color={THEME.white} />
        <View style={{ marginLeft: handleSize.w(10) }}>
          <Text style={styles.labeltxt}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: handleSize.h(4) }}>
            <Text style={styles.accountName}>{label}</Text>
            <View style={styles.currencyTag}>
              <Text style={styles.currencyText}>{currency}</Text>
            </View>
          </View>
        </View>
      </View>

      <Image
        source={Images.dropDown}
        style={{ width: handleSize.w(26), height: handleSize.h(26) }}
        tintColor={THEME.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerbelw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: handleSize.f(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    paddingHorizontal: handleSize.w(10),
    height: handleSize.h(56),
  },
  flag: {
    width: handleSize.w(28),
    height: handleSize.h(28),
    borderRadius: handleSize.f(14),
    marginRight: handleSize.w(10),
  },
  labeltxt: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  accountName: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  currencyTag: {
    backgroundColor: THEME.primary,
    paddingHorizontal: handleSize.w(8),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(8),
    marginLeft: handleSize.w(8),
  },
  currencyText: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
});
