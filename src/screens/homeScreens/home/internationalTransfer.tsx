import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { InputDropDownStyle, MainContainer } from '../../../components';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useInternationalTransferViewModel } from "../../../viewModels/homeViewModel/home/useInternationalTransferViewModel";

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

  const BalanceCard = ({ label = 'Available Balance', amount = '£1,250.00' }) => (
    <View style={styles.containerAMOUNT}>
      <View style={styles.amountBox}>
        <Text style={styles.balanceAmountTxt}>{amount}</Text>
      </View>
      <Text style={styles.balanceTxt}>{label}</Text>
    </View>
  );

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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>International Transfer</Text>
          <Text style={styles.subtitle}>Move funds between your own accounts instantly.</Text>

          {/* From Account */}
          <InputDropDownStyle
            title="From Account"
            label={fromAccount.label}
            currency={fromAccount.currency}
            flag={fromAccount.flag}
            onPress={handleFromAccountPress}
          />

          {/* Balance Card */}
          {BalanceCard({})}

          {/* To Account Picker */}
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
                onDropdownSelect={(item:any )=> setToAccount(item.name)}
              />

          {/* Recipient Gets Input */}
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 10,
    color: THEME.white,
    height: scale(55),
    marginLeft: 10,
  },
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
  renderRightInputContainer: {
    height: scale(55),
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
      inputNumberNum:{
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3,
  },
  inputNumbergbp: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  forgetTxt: { marginTop: 20, marginBottom: 20 },
});
