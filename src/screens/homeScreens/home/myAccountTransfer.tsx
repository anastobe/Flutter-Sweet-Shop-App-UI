import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MainContainer, InputDropDownStyle } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { useMyAccountTransferViewModel } from '../../../viewModels/homeViewModel/home/useMyAccountTransferViewModel';
import { Images } from '../../../config';
import BalanceBox from '../../../components/balanceBox';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

// ---------- Reusable ----------
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);


const MyAccountTransfer = ({...props}) => {
  const {
    amountSpend,
    setAmountSpend,
    fromAcc,
    toAcc,
    pressBackArrow,
    handlePress,
    onTransfer,
  } = useMyAccountTransferViewModel();

  console.log("ASdasdas",props?.route?.params);

  const renderRightInput = () => (
    <View style={styles.rightInputContainer}>
      <Text style={styles.rightInputValue}>(Amount to Send)</Text>
      <View style={styles.currencyBox}>
        <Text style={styles.currencyText}>GBP</Text>
      </View>
    </View>
  );

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager backgroundColor={THEME.darkSecondary} barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          
          <Text style={styles.title}>Send Money to Your Account</Text>

          <Text style={styles.subtitle}>
            Convert and transfer funds between your currency wallets instantly.
          </Text>

          {/* Input Section */}
          <InputDropDownStyle
            title="From Account"
            label={fromAcc.label}
            currency={fromAcc.currency}
            flag="business-outline"
            onPress={handlePress}
          />

          <BalanceBox amount="£1,250.00" label="Available Balance" containerHeight={78} />

          <InputDropDownStyle
            title="To Account"
            label={toAcc.label}
            currency={toAcc.currency}
            flag="business-outline"
            onPress={handlePress}
          />

          <InputField
            margTp={20}
            renderRightInput={renderRightInput}
            autoCapital="none"
            blurOnSubmit={false}
            placeholder="0.00"
            removeTitle
            value={amountSpend}
            onChangeText={setAmountSpend}
            keyboardType="numeric"
            maxlen={10}
            margBtm={20}
          />

          {/* Summary */}
          <View style={styles.summaryBox}>
            <InfoRow icon={Images.add} label="Conversion Fee" value="£2.00" />
            <InfoRow icon={Images.add} label="Total After Fee" value="£1002.00" />
            <InfoRow
              icon={Images.exchangeRate}
              label="Exchange Rate (Live)"
              value="1 GBP = 1.1425 EUR"
            />
          </View>

          <CustomButton
            btnContSty={styles.transferBtn}
            loading={false}
            title="Transfer Payment"
            onPress={onTransfer}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default MyAccountTransfer;

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },

  scrollContainer: {
    paddingBottom: handleSize.h(100),
  },

  innerContainer: {
    marginHorizontal: handleSize.w(20),
  },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },

  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(30),
    lineHeight: handleSize.h(20),
  },

  // INFO ROW
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(9),
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    marginRight: handleSize.w(8),
    width: handleSize.w(15),
    height: handleSize.h(15),
  },

  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  summaryBox: {
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(10),
  },

  // RIGHT INPUT
  rightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightInputValue: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  currencyBox: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    padding: handleSize.w(3),
  },

  currencyText: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  transferBtn: {
    marginTop: handleSize.h(5),
    marginBottom: handleSize.h(20),
  },
});
