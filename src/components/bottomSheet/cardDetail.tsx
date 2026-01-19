import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import { handleSize } from '../../config/responsiveTheme';

const CardDetail = ({
  showvalidThru,
  showccvv,
  saveCureentDisplayData,
  style,
  onPress1,
  onPress2,
  onPress3,
  getSucureCardData,
  isPendinggetSucureCard
}) => {  



  function cardDetailBox(showStar, onPress, title, desc, icon, iconColor, show) {
    return (
      <View
        style={[
          styles.textBox,
          { borderBottomWidth: show ? handleSize.h(0.5) : 0 }
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Icon name={icon} size={handleSize.f(22)} color={iconColor} />
        </TouchableOpacity>

        <View>
          <Text style={styles.cardTitle}>{title}</Text>

          {/* {loading ? (
            <ActivityIndicator size="small" color={THEME.white} />
          ) : ( */}
            <Text style={styles.cardDesc}>{showStar ? desc : "***"}</Text>
          {/* )} */}
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.addCardGradient}
      style={[styles.container, style]}
    >
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {saveCureentDisplayData?.format} Card details
        </Text>

        <Text style={styles.subtitle}>
          Use this information to make online purchases
        </Text>

        {isPendinggetSucureCard ? 
          <View style={{ marginTop: handleSize.h(20) }}>
            <ActivityIndicator size="small" color={THEME.primary} />
          </View>
        :
          <View>
            <View style={{ borderBottomWidth: handleSize.h(0.5), borderColor: THEME.lightGrey }} />
            {cardDetailBox(true, onPress1, "Card Number:", getSucureCardData?.pan, "copy-outline", THEME.primary, true)}
            {cardDetailBox(showvalidThru,  onPress2, "Valid Thru", getSucureCardData?.expiry_date,showvalidThru ? "eye-outline" : "eye-off-outline", THEME.primary, true)}
            {cardDetailBox(showccvv, onPress3, "CVV:", getSucureCardData?.cvv, showccvv ? "eye-outline" : "eye-off-outline", THEME.primary, false)}
          </View>}
      </ScrollView>
    </ImageBackground>
  );
};

export default CardDetail;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  title: {
    fontSize: handleSize.f(FONT_SIZES.twosix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    alignSelf: "center",
    marginTop: handleSize.h(10),
    textTransform: 'capitalize',
  },

  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: handleSize.h(10),
    paddingBottom: handleSize.h(20),
    textAlign: "center",
    lineHeight: handleSize.h(20),
  },

  textBox: {
    marginTop: handleSize.h(3),
    borderColor: THEME.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: handleSize.h(10),
  },

  cardTitle: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  cardDesc: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginLeft: handleSize.w(10),
    marginTop: handleSize.h(6),
  },

});
