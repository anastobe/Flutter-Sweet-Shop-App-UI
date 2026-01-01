import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import Metrics from '../../styles/metrics';
import { Images } from '../../config';
import SwitchToggle from "react-native-switch-toggle";
import { handleSize } from '../../config/responsiveTheme';

const Methods = ({
  currentItem,
  Data,
  loading,
  atmSwitch,
  setAtmSwitch,
  onlineSwitch,
  setOnlineSwitch,
  chipSwitch,
  setChipSwitch,
  walletSwitch,
  setWalletSwitch,
  style,
  backImg
}) => {


  function Listitem(icon: any, title: any, subtitle: any, value: boolean, toggle: () => void) {
    return (
      <View style={styles.containerAlert}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.ICONcONT}>
            <Image
              source={icon}
              style={{
                width: handleSize.w(20),
                height: handleSize.h(20)
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{ width: Metrics.width - handleSize.w(130) }}>
            <Text style={styles.titleAbove}>{title}</Text>
            <Text style={styles.descriptionbelow}>{subtitle}</Text>
          </View>
        </View>

        <View style={{ justifyContent: "center" }}>
          <SwitchToggle
            switchOn={value}
            onPress={toggle}
            circleColorOff={THEME.white}
            circleColorOn={THEME.white}
            backgroundColorOn={THEME.primary}
            backgroundColorOff={"#4D4F5E"}
            containerStyle={styles.toggleContainer}
            circleStyle={styles.toggleCircle}
          />
        </View>
      </View>
    );
  }


  return (
    <ImageBackground resizeMode="cover" source={backImg} style={style}>
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Payment methods</Text>

        {loading ? (
          <View style={{ marginTop: handleSize.h(20) }}>
            <ActivityIndicator size="small" color={THEME.primary} />
          </View>
        ) : (
          <View>
            {currentItem?.format == "physical" && Listitem(
              Images.atmWithdrawl,
              "ATM withdrawals",
              "Control and monitor your cash withdrawals from ATMs",
              atmSwitch,
              () => setAtmSwitch(!atmSwitch)
            )}

            {Listitem(
              Images.onlinePayments,
              "Online payments",
              "Enable or disable card usage for online purchases",
              onlineSwitch,
              () => setOnlineSwitch(!onlineSwitch)
            )}

            {currentItem?.format == "physical" && Listitem(
              Images.chipandPinTransaction,
              "Chip and PIN transactions",
              "Manage in-person card usage with secure PIN entry",
              chipSwitch,
              () => setChipSwitch(!chipSwitch)
            )}

            {Listitem(
              Images.internationalTransaction,
              "International transactions",
              "Control usage of your card via Apple Pay, Google Pay, and others",
              walletSwitch,
              () => setWalletSwitch(!walletSwitch)
            )}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default Methods;

const styles = StyleSheet.create({
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twosix),
    textAlign: "center",
    marginTop: handleSize.h(25),
    paddingBottom: handleSize.h(30),
  },

  containerAlert: {
    flexDirection: 'row',
    marginBottom: handleSize.h(30),
    justifyContent: 'space-between',
  },

  titleAbove: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginLeft: handleSize.w(8),
  },

  descriptionbelow: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
    marginLeft: handleSize.w(8),
    marginTop: handleSize.h(2),
    lineHeight: handleSize.h(16),
  },

  ICONcONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.f(12),
  },

  toggleContainer: {
    width: handleSize.w(40),
    height: handleSize.h(25),
    borderRadius: handleSize.f(30),
    padding: handleSize.f(3),
  },

  toggleCircle: {
    width: handleSize.w(20),
    height: handleSize.h(20),
    borderRadius: handleSize.f(12),
  },
});
