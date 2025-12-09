import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputDropDownStyle, MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useInternationalTransferViewModel } from "../../../viewModels/homeViewModel/home/useInternationalTransferViewModel";
import BalanceBox from '../../../components/balanceBox';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

const InternationalTransfer = () => {
  const navigation = useNavigation();

  const {
    toAccount,
    setToAccount,
    recipientGets,
    setRecipientGets,
    fromAccount,
    handleFromAccountPress,
    handleTransfer,
    openDropdown,
    toggleDropdown
  } = useInternationalTransferViewModel();

  function pressBackArrow() {
    navigation.goBack();
  }

  const renderRightInput = () => (
    <View style={styles.renderRightInputContainer}>
      <Text style={styles.inputNumber}>(Recipient Gets)</Text>

      <View style={styles.inputNumbergbpcont}>
        <Text style={styles.inputNumbergbp}>GBP</Text>
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

      <ScrollView contentContainerStyle={{ paddingBottom: handleSize.h(100) }}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>International Transfer</Text>

          <Text style={styles.subtitle}>
            Move funds between your own accounts instantly.
          </Text>

          {/* From Account */}
          <InputDropDownStyle
            title="From Account"
            label={fromAccount.label}
            currency={fromAccount.currency}
            flag={fromAccount.flag}
            onPress={handleFromAccountPress}
          />

          {/* Balance Box */}
          <BalanceBox amount="£1,250.00" label="Available Balance" containerHeight={78} />

          {/* To Account */}
          <InputField
            disabled={false}
            placeholder="To Account"
            value={toAccount}
            enableDropdown={true}
            dropdownData={[
              { name: "Account" },
              { name: "Cash" },
            ]}
            margBtm={15}
            isOpen={openDropdown === 'account'}
            onToggleDropdown={() => toggleDropdown('account')}
            onDropdownSelect={(item: any) => setToAccount(item.name)}
          />

          {/* Recipient Gets */}
          <InputField
            renderRightInput={renderRightInput}
            autoCapital="none"
            blurOnSubmit={false}
            placeholder="0.00"
            removeTitle={true}
            value={recipientGets}
            onChangeText={setRecipientGets}
            keyboardType="numeric"
            maxlen={10}
            margBtm={20}
          />

          {/* Transfer Button */}
          <CustomButton
            btnContSty={styles.forgetTxt}
            loading={false}
            title="Transfer Payment"
            onPress={handleTransfer}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default InternationalTransfer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

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

  /***********************************
      🔥 RIGHT INPUT STYLING
  ***********************************/
  renderRightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputNumber: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  inputNumberNum: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    paddingHorizontal: handleSize.w(6),
    paddingVertical: handleSize.h(3),
  },

  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
});
