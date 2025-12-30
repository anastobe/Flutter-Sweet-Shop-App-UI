// CurrencyExchangeView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputDropDownStyle, MainContainer } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import useCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useCurrencyExchangeViewModel';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';


const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={{ flexDirection: 'row' }}>
      <Icon name={icon} size={handleSize.f(20)} color={THEME.white} style={{ marginRight: handleSize.w(8) }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const CurrencyExchange = ({ ...props }) => {
  const {
    recipientType,
    setRecipientType,
    pressBackArrow,
    setOpenDropdown,
    amount, 
    setamount,
    open, 
    setopen,
    modalMsg,
    beneficiaryRef,
    autoFocused, 
    setautoFocused,
    currencyList,
    onPressBtn,
    onPressBtn2,
    toCurrency, 
    settoCurrency,
    fromCurrency, 
    setfromCurrency,
    toggleDropdown,
    openDropdown,
    isPendinguseFXConversion,
    youWillReceive, 
    setYouWillReceive,
    fxInfo, 
    setFxInfo,
    countdown

  } = useCurrencyExchangeViewModel(props);

  
  const renderCardDetails = () => (
    <View style={styles.summaryBox}>

    <InfoRow icon="card-outline" label="Exchange Rate" value={isPendinguseFXConversion ? "...loading" : fxInfo.rateText || 0} />
    <InfoRow icon="add-outline" label="Fee" value={isPendinguseFXConversion ? "...loading" : fxInfo.fee || 0} />
    {/* <InfoRow icon="time-outline" label="Rate Valid For" value={isPendinguseFXConversion ? "...loading" :fxInfo.validFor || 0} /> */}

<InfoRow
  icon="time-outline"
  label="Rate Valid For"
  value={isPendinguseFXConversion ? "...loading" : `${countdown} sec` || 0}
  // value={countdown > 0 ? `${countdown} sec` : 'Refreshing...'}
/>

    </View>
  );

    const renderRightInputTextOnly = () => (
      <View style={styles.renderRightInputContainer}>
        <Text style={styles.inputNumberNum}>{isPendinguseFXConversion ? "...loading" : youWillReceive}</Text>
      </View>
    );

  
  const renderInput = () => (
    <View>
      {/* <InputDropDownStyle
        title="Send from"
        value={fromAccount} // null = show input box
        // data={getCurrencyAccArray}
        data={getCurrencyAccArray}
        isOpen={openDropdownsty}
        onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdownStyToAcc(false), setOpenDropdown(null) }}
        onSelect={item => {
          setFromAccount({
            id: item?.id,
            available_balance: item?.available_balance,
            currency_id: item?.currency_id,
            name: item?.account?.name,
            iso_code: item?.currency?.iso_code,
          });
        }}
      />

      <InputDropDownStyle
        title="Receive in" 
        value={toAccount}  // null = show input box
        // data={getCurrencyAccArray}
        data={getCurrencyAccArray}
        isOpen={openDropdownstyToAcc}
        onToggle={() =>{ setOpenDropdownStyToAcc(!openDropdownstyToAcc), setOpenDropdownSty(false), setOpenDropdown(null) }}
        onSelect={(item) =>{ 
          settoAccount({     
          id: item?.id,    
          available_balance: item?.available_balance,       
          currency_id: item?.currency_id,
          name: item?.account?.name,
          iso_code: item?.currency?.iso_code
          })
        }}
      /> */}

    
    <InputField
        disabled={false} 
        placeholder="From Currency"
        value={fromCurrency.iso_code} 
        enableDropdown={true}
        dropdownData={currencyList}
        margBtm={handleSize.h(20)}
        isOpen={openDropdown === 'from_currency'}
        onToggleDropdown={() => toggleDropdown('from_currency')}
        onDropdownSelect={(item: string) =>{ 
          setfromCurrency({
          id: item?.id,
          iso_code: item?.iso_code,
          num_code: item?.num_code
        })
      }}
      />

      
    <InputField
        disabled={false} 
        placeholder="To Currency"
        value={toCurrency.iso_code} 
        enableDropdown={true}
        dropdownData={currencyList}
        margBtm={handleSize.h(20)}
        isOpen={openDropdown === 'to_currency'}
        onToggleDropdown={() => toggleDropdown('to_currency')}
        onDropdownSelect={(item: string) =>{ 
          settoCurrency({
          id: item?.id,
          iso_code: item?.iso_code,
          num_code: item?.num_code
        })
      }}
      />

    <InputField
      // renderRightInput={renderRightInput}
      placeholder="Enter Amount"
      removeTitle={false}
      value={amount}
      onChangeText={setamount}
      keyboardType={"numeric"}
      maxlen={10}
      margBtm={handleSize.h(15)}
    />

    <CustomButton
      btnContSty={styles.forgetTxt}
      title="Get Rate"
      loading={isPendinguseFXConversion}
      onPress={onPressBtn}
      />
    
    {fxInfo.quoteId ?
    <View>
      {renderCardDetails()}
      <InputField
        margTp={20}
        editable={false}
        disabled={false}
        renderRightInput={renderRightInputTextOnly}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="You will Receive"
        // value={youWillReceive}
        onChangeText={setYouWillReceive}
        keyboardType={'numeric'}
        margBtm={10}
      />

      
    <CustomButton
      btnContSty={styles.forgetTxt2}
      title="Create Payment"
      loading={false}
      onPress={onPressBtn2}
      />

    </View>
    : null}

    </View>
  );

  // const renderBtn = () => (
  //   <>
    
  //   <CustomButton
  //     btnContSty={styles.forgetTxt2}
  //     title="Create Payment"
  //     loading={false}
  //     onPress={onPressBtn2}
  //     />
  //   </>
  // );

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Quick currency exchange</Text>
        <Text style={styles.subtitle}>
          Convert currency instantly and view real-time rates before confirming
          your payment.
        </Text>
        {renderInput()}
        {/* {renderBtn()} */}
      </View>
    </MainContainer>
  );
};

export default CurrencyExchange;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

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
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
  renderRightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    justifyContent: 'center',
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
    padding: handleSize.h(3),
  },
  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  pickerWrapper: {
    borderWidth: handleSize.f(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(16),
    marginBottom: handleSize.h(15),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: handleSize.f(1),
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(10),
  },
  forgetTxt2:{
    marginTop: handleSize.h(10),
    marginBottom: handleSize.h(50),
  },
  
  summaryBox: {
    borderRadius: handleSize.f(1),
    marginTop: handleSize.h(10),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(9),
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  
  valueBox: {
    paddingHorizontal: handleSize.w(10),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(10),
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },



});














// // CurrencyExchangeView.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { InputDropDownStyle, MainContainer } from '../../../../components';
// import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
// import { scale } from 'react-native-size-matters';
// import { Picker } from '@react-native-picker/picker';
// import InputField from '../../../../components/textInput';
// import CustomButton from '../../../../components/customButton';
// import useCurrencyExchangeViewModel from '../../../../viewModels/homeViewModel/more/useCurrencyExchangeViewModel';
// import StatusBarManager from '../../../../components/statusBarManager';
// import { handleSize } from '../../../../config/responsiveTheme';

// const CurrencyExchange = ({ ...props }) => {
//   const {
//     isPending,
//     pressBackArrow,
//     setOpenDropdown,

//     openDropdownsty, 
//     setOpenDropdownSty,
//     fromAccount, 
//     setFromAccount,
//     toAccount, 
//     settoAccount,
//     getCurrencyAccArray, 
//     openDropdownstyToAcc, 
//     setOpenDropdownStyToAcc,
//     onPressBtn,
//     amount,
//     setamount

//   } = useCurrencyExchangeViewModel(props);

//   const renderInput = () => (
//     <View>
//       <InputDropDownStyle
//         title="Send from"
//         value={fromAccount} // null = show input box
//         // data={getCurrencyAccArray}
//         data={getCurrencyAccArray}
//         isOpen={openDropdownsty}
//         onToggle={() =>{ setOpenDropdownSty(!openDropdownsty), setOpenDropdownStyToAcc(false), setOpenDropdown(null) }}
//         onSelect={item => {
//           setFromAccount({
//             id: item?.id,
//             available_balance: item?.available_balance,
//             currency_id: item?.currency_id,
//             name: item?.account?.name,
//             iso_code: item?.currency?.iso_code,
//           });
//         }}
//       />

//       <InputDropDownStyle
//         title="Receive in" 
//         value={toAccount}  // null = show input box
//         // data={getCurrencyAccArray}
//         data={getCurrencyAccArray}
//         isOpen={openDropdownstyToAcc}
//         onToggle={() =>{ setOpenDropdownStyToAcc(!openDropdownstyToAcc), setOpenDropdownSty(false), setOpenDropdown(null) }}
//         onSelect={(item) =>{ 
//           settoAccount({     
//           id: item?.id,    
//           available_balance: item?.available_balance,       
//           currency_id: item?.currency_id,
//           name: item?.account?.name,
//           iso_code: item?.currency?.iso_code
//           })
//         }}
//       />

//     <InputField
//       // renderRightInput={renderRightInput}
//       placeholder="Enter Amount"
//       removeTitle={false}
//       value={amount}
//       onChangeText={setamount}
//       keyboardType={"numeric"}
//       maxlen={10}
//       margBtm={handleSize.h(15)}
//     />

//     </View>
//   );

//   const renderBtn = () => (
//     <CustomButton
//       btnContSty={styles.forgetTxt}
//       title="Get Rate"
//       loading={isPending}
//       onPress={onPressBtn}
//     />
//   );

//   return (
//     <MainContainer
//       showBackArrow={true}
//       pressBackArrow={pressBackArrow}
//       isFlatList={true}
//       barStyle="dark-content"
//       mainContainerStyle={styles.container}
//     >
//       <StatusBarManager
//         backgroundColor={THEME.darkSecondary}
//         barStyle="light-content"
//       />

//       <View style={{ marginHorizontal: handleSize.w(20) }}>
//         <Text style={styles.title}>Quick currency exchange</Text>
//         <Text style={styles.subtitle}>
//           Convert currency instantly and view real-time rates before confirming
//           your payment.
//         </Text>
//         {renderInput()}
//         {renderBtn()}
//       </View>
//     </MainContainer>
//   );
// };

// export default CurrencyExchange;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: THEME.white },

//   title: {
//     fontSize: handleSize.f(FONT_SIZES.onesix),
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//     marginBottom: handleSize.h(10),
//     marginTop: handleSize.h(10),
//   },
//   subtitle: {
//     fontSize: handleSize.f(FONT_SIZES.onesix),
//     fontFamily: FONTFAMILY.Regular,
//     color: THEME.white,
//     lineHeight: handleSize.h(20),
//     marginBottom: handleSize.h(20),
//   },
//   renderRightInputContainer: {
//     height: handleSize.h(56),
//     position: 'absolute',
//     right: handleSize.w(20),
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputNumber: {
//     fontSize: handleSize.f(FONT_SIZES.onefour),
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.white,
//   },
//   inputNumberNum: {
//     fontSize: handleSize.f(FONT_SIZES.twozero),
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.white,
//   },
//   inputNumbergbpcont: {
//     backgroundColor: THEME.primary,
//     marginLeft: handleSize.w(6),
//     borderRadius: handleSize.f(6),
//     padding: handleSize.h(3),
//   },
//   inputNumbergbp: {
//     fontSize: handleSize.f(FONT_SIZES.onetwo),
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.textPrimary,
//   },
//   pickerWrapper: {
//     borderWidth: handleSize.f(1),
//     borderColor: THEME.white,
//     borderRadius: handleSize.f(16),
//     marginBottom: handleSize.h(15),
//   },
//   inputInnerPicker: {
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: handleSize.f(FONT_SIZES.onefour),
//     borderColor: THEME.gray,
//     borderWidth: handleSize.f(1),
//     borderRadius: handleSize.f(16),
//     color: THEME.white,
//     height: handleSize.h(56),
//     marginLeft: handleSize.w(10),
//   },
//   forgetTxt: {
//     marginTop: handleSize.h(20),
//     marginBottom: handleSize.h(50),
//   },
// });