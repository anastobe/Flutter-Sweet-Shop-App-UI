import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import { handleSize } from '../../config/responsiveTheme';

const CardDetail = ({
  saveCureentDisplayData,
  style,
  onPress1,
  onPress2,
  getSucureCardData,
  isPendinggetSucureCard,
}) => {

  function cardDetailBox(loading, onPress, title, desc, icon, iconColor, show) {
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

          {loading ? (
            <ActivityIndicator size="small" color={THEME.white} />
          ) : (
            <Text style={styles.cardDesc}>{desc}</Text>
          )}
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

        {cardDetailBox(null, null, "Card Number:", "DUMMY", "copy-outline", THEME.primary, true)}
        {cardDetailBox(isPendinggetSucureCard, onPress1, "Valid Thru", saveCureentDisplayData?.expiry_date, "eye-outline", THEME.primary, true)}
        {cardDetailBox(isPendinggetSucureCard, onPress2, "CVV:", "DUMMY", "eye-outline", THEME.primary, false)}
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
    borderBottomWidth: handleSize.h(0.5),
    borderColor: THEME.lightGrey,
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
  },

});
