import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';

const AddCardPopup = ({ style, onPress1, onPress2, backImg }) => {
  return (
    <ImageBackground resizeMode="cover" source={backImg} style={style}>
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select Card Type</Text>

        {/* Virtual Card */}
        <TouchableOpacity onPress={onPress1} style={styles.cardItem}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconBox}>
              <Icon name="card-outline" size={handleSize.f(24)} color={THEME.textPrimary} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>Virtual Card</Text>
              <Text style={styles.cardDesc}>
                Generate an instant-use card for safer online payments.
              </Text>
            </View>
          </View>

          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={handleSize.f(20)} color={THEME.white} />
          </View>
        </TouchableOpacity>

        {/* Physical Card */}
        <TouchableOpacity onPress={onPress2} style={styles.cardItem}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconBox}>
              <Icon name="card-outline" size={handleSize.f(24)} color={THEME.textPrimary} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>Physical Card</Text>
              <Text style={styles.cardDesc}>
                Order a card to use in-store, online, and for ATM withdrawals.
              </Text>
            </View>
          </View>

          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={handleSize.f(20)} color={THEME.white} />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
};

export default AddCardPopup;

const styles = StyleSheet.create({
  title: {
    fontSize: handleSize.f(FONT_SIZES.twosix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    alignSelf: "center",
    paddingBottom: handleSize.h(20),
    marginTop: handleSize.h(30),
  },

  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingVertical: handleSize.h(20),
  },

  iconBox: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    alignItems: 'center',
    justifyContent: "center",
  },

  textBox: {
    paddingLeft: handleSize.w(10),
  },

  cardTitle: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  cardDesc: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
    marginTop: handleSize.h(3),
    width: handleSize.w(METRICS.width - 130),
    lineHeight: handleSize.h(16),
  },
});
