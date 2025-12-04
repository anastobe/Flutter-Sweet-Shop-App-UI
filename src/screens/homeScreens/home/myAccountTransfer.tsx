import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MainContainer, InputDropDownStyle } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { useMyAccountTransferViewModel } from '../../../viewModels/homeViewModel/home/useMyAccountTransferViewModel';
import { Images } from '../../../config';
import BalanceBox from '../../../components/balanceBox';
import StatusBarManager from '../../../components/statusBarManager';

// ✅ Reusable Components
const InfoRow = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Image source={icon} style={styles.infoIcon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);


const MyAccountTransfer = () => {
  const {
    amountSpend,
    setAmountSpend,
    fromAcc,
    toAcc,
    pressBackArrow,
    handlePress,
    onTransfer,
  } = useMyAccountTransferViewModel();

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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

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

          {/* <BalanceCard label="Available Balance" amount="£1,250.00" /> */}

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
            removeTitle={true}
            value={amountSpend}
            onChangeText={setAmountSpend}
            keyboardType="numeric"
                    maxlen={10}
            margBtm={20}
          />

          {/* Summary Section */}
          <View style={styles.summaryBox}>
            <InfoRow icon={Images.add} label="Conversion Fee" value="£2.00" />
            <InfoRow icon={Images.add} label="Total After Fee" value="£1002.00" />
            <InfoRow
              icon={Images.exchangeRate}
              label="Exchange Rate (Live)"
              value="1 GBP = 1.1425 EUR"
            />
          </View>

          {/* Button */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  scrollContainer: { paddingBottom: 100 },
  innerContainer: { marginHorizontal: 20 },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
    lineHeight: 20
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { marginRight: 8, width: 15, height: 15 },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  summaryBox: { borderRadius: 10, marginBottom: 10 },

  containerAMOUNT: {
    backgroundColor: THEME.whitergba,
    // padding: scale(8),
    width: "100%",
    height: 80,
    // alignSelf: "center",
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: "center",
    // justifyContent: "center",
  },
  amountBox: {
    // paddingHorizontal: scale(10),
    // paddingVertical: scale(4),
    // borderRadius: scale(6),
    // marginTop: 5,
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    // marginTop: 5,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
    // backgroundColor :'red',
    // paddingBottom: 5,
    marginTop: 5,
    paddingBottom: 1,
  },
  rightInputContainer: {
    height: 56,
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInputValue: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  currencyBox: {
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3,
  },
  currencyText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  transferBtn: { marginTop: 5, marginBottom: 20 },
});
