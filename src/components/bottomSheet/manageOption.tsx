import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import { handleSize } from '../../config/responsiveTheme';

const ManageOption = ({currentItem, style, onPress1, onPress2, backImg }) => {

  function Listitem(icon, title, switchOnpress, iconRight, desc) {
    return (
      <TouchableOpacity onPress={switchOnpress} style={styles.containerAlert}>
        <View style={styles.ICONcONT}>
          <Icon name={icon} size={handleSize.f(20)} color={THEME.textPrimary} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', marginRight: handleSize.w(10) }}>
          <Text style={styles.titleAbove}>{title}</Text>
          <Text style={styles.descriptionbelow}>{desc}</Text>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Image
            source={Images.arrow}
            style={{
              width: handleSize.w(24),
              height: handleSize.h(24),
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  } 

  // console.log("currentItemcurrentItemcurrentItem==>",currentItem?.format == "physical");
  

  return (
    <ImageBackground resizeMode="cover" source={backImg} style={style}>
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Manage cards</Text>

      {currentItem?.format == "physical" &&
        Listitem(
          'pin-outline',
          'Pin and security',
          onPress1,
          'arrow-forward-outline',
          'Generate an instant-use card for safer online payments.'
        )}

        {Listitem(
          'card-outline',
          'Set spending limit',
          onPress2,
          'arrow-forward-outline',
          'Order a card to use in-store, online, and for ATM withdrawals.'
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default ManageOption;

const styles = StyleSheet.create({
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twosix),
    textAlign: 'center',
    marginTop: handleSize.h(25),
    paddingBottom: handleSize.h(15),
  },

  containerAlert: {
    flexDirection: 'row',
    paddingVertical: handleSize.f(15),
    borderRadius: handleSize.w(10),
    alignItems: 'center',
  },

  titleAbove: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginLeft: handleSize.w(8),
  },

  descriptionbelow: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
    lineHeight: handleSize.h(16),
    marginHorizontal: handleSize.w(8),
    marginTop: handleSize.h(3),
  },

  ICONcONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.w(12),
  },
});
