// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
// import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles';
// import { Images } from '../../config';
// import CustomButton from '../customButton';
// import Icon from 'react-native-vector-icons/Ionicons';
// import CustomCalendar from '../customCalander';
// import { handleSize } from '../../config/responsiveTheme';
// import InputField from '../textInput';

// // const TransactionFilter = ({ onPress, onPress2 }: { onPress: any, onPress2: any }) => {

// const TransactionFilter = ({
//   value,
//   onChange,
//   onPress,
//   onPress2,
// }: {
//   value: any;
//   onChange: (v: any) => void;
//   onPress: any;
//   onPress2: any;
// }) => {


// //   const { from, to, checked } = value;
//   const { from, to, checked, amount, status } = value;

//   const handlePress = (key: string) => {
//     if (key === 'all') {
//       const newValue = !checked.all;
//       onChange({
//         ...value,
//         checked: {
//           all: newValue,
//           debit: newValue,
//           credit: newValue,
//           refund: newValue,
//           atm: newValue,
//         },
//       });
//     } else {
//       onChange({
//         ...value,
//         checked: {
//           ...checked,
//           [key]: !checked[key],
//           all: false,
//         },
//       });
//     }
//   };


//     // const [from, setfrom] = useState('');
//     // const [to, setto] = useState('');
//     // const [checked, setChecked] = useState({
//     //     all: false,
//     //     debit: false,
//     //     credit: false,
//     //     refund: false,
//     //     atm: false,
//     // });

//     // const handlePress = (key: any) => {
//     //     if (key === 'all') {
//     //         const newValue = !checked.all;
//     //         setChecked({
//     //             all: newValue,
//     //             debit: newValue,
//     //             credit: newValue,
//     //             refund: newValue,
//     //             atm: newValue,
//     //         });
//     //     } else {
//     //         setChecked((prev: any) => ({
//     //             ...prev,
//     //             [key]: !prev[key],
//     //             all: false,
//     //         }));
//     //     }
//     // };

//     function renderFilterRange() {
//         return (
//             <View>
//                 {/* <CustomCalendar
//                     placeholder="From"
//                     value={from}
//                     onDateChange={setfrom}
//                 />

//                 <CustomCalendar
//                     margTp={handleSize.h(20)}
//                     placeholder="To"
//                     value={to}
//                     onDateChange={setto}
//                 /> */}

//                 <CustomCalendar
//                     placeholder="From"
//                     value={from}
//                     onDateChange={(date) => onChange({ ...value, from: date })}
//                 />

//                 <CustomCalendar
//                     margTp={handleSize.h(20)}
//                     placeholder="To"
//                     value={to}
//                     onDateChange={(date) => onChange({ ...value, to: date })}
//                 />

//             </View>
//         )
//     }

//     function renderButton(onPress: any, onPress2: any) {
//         // let Filter_data = {
//         //     from: from,
//         //     to: to,
//         //     checked: checked
//         // }

//         let Filter_data = {
//           from,
//           to,
//           checked,
//           status,
//           amount,
//         };

//         return (
//             <View>
//                 <CustomButton
//                     btnContSty={styles.forgetTxt1}
//                     title="Apply"
//                     onPress={()=>{ onPress(Filter_data) }}
//                 />

//                 <CustomButton
//                     btnContSty={styles.forgetTxt2}
//                     title="Reset"
//                     onPress={()=>{ onPress2(Filter_data) }}
//                 />
//             </View>
//         )
//     }

//     function renderStatusSelection() {
//   const toggleStatus = (key: string) => {
//     if (key === 'all') {
//       const newValue = !status.all;
//       onChange({
//         ...value,
//         status: {
//           all: newValue,
//           completed: newValue,
//           pending: newValue,
//           failed: newValue,
//         },
//       });
//     } else {
//       onChange({
//         ...value,
//         status: {
//           ...status,
//           [key]: !status[key],
//           all: false,
//         },
//       });
//     }
//   };

//   return (
//     <View>
//       <Text style={styles.checkmarkTitle}>Status</Text>

//       {[
//         { key: 'all', label: 'All' },
//         { key: 'completed', label: 'Completed' },
//         { key: 'pending', label: 'Pending' },
//         { key: 'failed', label: 'Failed' },
//       ].map((item) => (
//         <View key={item.key} style={styles.row}>
//           <TouchableOpacity
//             style={[
//               styles.boxShape,
//               { borderColor: status[item.key] ? THEME.primary : THEME.white },
//             ]}
//             onPress={() => toggleStatus(item.key)}
//           >
//             {status[item.key] && (
//               <Icon name="checkmark" size={17} color={THEME.primary} />
//             )}
//           </TouchableOpacity>

//           <Text style={styles.label}>{item.label}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }


//     function renderAmountRange() {
//   return (
//     <View>
//       <Text style={styles.checkmarkTitle}>Amount range</Text>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <InputField
//           placeholder="Min"
//           keyboardType="numeric"
//           value={amount.min}
//           onChangeText={(text) =>
//             onChange({ ...value, amount: { ...amount, min: text } })
//           }
//           containerStyle={{ width: '48%' }}
//         />

//         <InputField
//           placeholder="Max"
//           keyboardType="numeric"
//           value={amount.max}
//           onChangeText={(text) =>
//             onChange({ ...value, amount: { ...amount, max: text } })
//           }
//           containerStyle={{ width: '48%' }}
//         />
//       </View>
//     </View>
//   );
// }

//     function transactionTypeSelection() {
//         return (
//             <View>
//                 <Text style={styles.checkmarkTitle}>Transaction type</Text>

//                 {[
//                     { key: 'all', label: 'All' },
//                     { key: 'debit', label: 'Debit' },
//                     { key: 'credit', label: 'Credit' },
//                     { key: 'refund', label: 'Refund' },
//                     { key: 'atm', label: 'ATM withdrawal' },
//                 ].map((item) => {
//                     let checkedValue = checked[item.key]

//                     return (
//                         <View key={item.key} style={styles.row}>
//                             <TouchableOpacity
//                                 style={[
//                                     styles.boxShape,
//                                     { borderColor: checkedValue ? THEME.primary : THEME.white }
//                                 ]}
//                                 onPress={() => handlePress(item.key)}
//                             >
//                                 {checkedValue ?
//                                     <Icon name="checkmark" size={handleSize.f(17)} color={checkedValue ? THEME.primary : THEME.white} />
//                                     : null}
//                             </TouchableOpacity>

//                             <Text style={styles.label}>{item.label}</Text>
//                         </View>
//                     )
//                 })}
//             </View>
//         )
//     }

//     return (
//         <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={styles.container}>
//             <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false}>
//                 <Text style={styles.title}>Filter transactions</Text>

//                 {renderFilterRange()}
//                 {transactionTypeSelection()}
//                 {/* {renderAmountRange()} */}
//                 {renderStatusSelection()}
//                 {renderButton(onPress, onPress2)}

//             </ScrollView>
//         </ImageBackground>
//     );
// };

// export default TransactionFilter;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: handleSize.w(20)
//     },

//     nodge: {
//         width: handleSize.w(70),
//         height: handleSize.h(8),
//         backgroundColor: THEME.lightGrey,
//         alignSelf: "center",
//         borderRadius: handleSize.w(20),
//         marginTop: handleSize.h(20)
//     },

//     title: {
//         fontSize: handleSize.f(FONT_SIZES.twosix),
//         fontFamily: FONTFAMILY.SemiBold,
//         color: THEME.white,
//         alignSelf: "center",
//         paddingBottom: handleSize.h(20),
//         marginTop: handleSize.h(10)
//     },

//     forgetTxt1: {
//         marginTop: handleSize.h(20),
//         marginBottom: handleSize.h(0),
//         backgroundColor: THEME.primary
//     },

//     forgetTxt2: {
//         marginTop: handleSize.h(10),
//         marginBottom: handleSize.h(20),
//         backgroundColor: THEME.white
//     },

//     checkmarkTitle: {
//         fontSize: handleSize.f(FONT_SIZES.onesix),
//         fontFamily: FONTFAMILY.Medium,
//         color: THEME.white,
//         marginTop: handleSize.h(15),
//         marginBottom: handleSize.h(10)
//     },

//     boxShape: {
//         width: handleSize.f(20),
//         height: handleSize.f(20),
//         borderWidth: handleSize.w(1.5),
//         borderRadius: handleSize.w(3),
//         justifyContent: 'center',
//         alignItems: 'center'
//     },

//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: handleSize.h(4)
//     },

//     label: {
//         marginLeft: handleSize.w(8),
//         fontSize: handleSize.f(FONT_SIZES.onefour),
//         fontFamily: FONTFAMILY.Light,
//         color: THEME.white
//     },
// });


// anas gpt 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';

import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../customCalander';
import { handleSize } from '../../config/responsiveTheme';
import InputField from '../textInput';
import { ACCOUNT_HISTRY_VALIDATION } from '../../utils/data';

interface Props {
  show?: any;
  sheetTile?: string;
  value: any;
  onChange: (v: any) => void;
  onPress: (v: any) => void;
  onPress2: (v: any) => void;
}

const TransactionFilter = ({
  show,
  sheetTile,
  value,
  onChange,
  onPress,
  onPress2,
}: Props) => {
  const { from, to, checked, amount, status } = value;

  /** 🔹 Transaction Type */
  const handleTransactionType = (key: string) => {
    if (key === 'all') {
      const newValue = !checked.all;
      onChange({
        ...value,
        checked: {
          all: newValue,
          debit: newValue,
          credit: newValue,
          refund: newValue,
          atm: newValue,
        },
      });
    } else {
      onChange({
        ...value,
        checked: {
          ...checked,
          [key]: !checked[key],
          all: false,
        },
      });
    }
  };

  /** 🔹 Status */
  const toggleStatus = (key: string) => {
    if (key === 'all') {
      const newValue = !status.all;
      onChange({
        ...value,
        status: {
          all: newValue,
          completed: newValue,
          pending: newValue,
          failed: newValue,
        },
      });
    } else {
      onChange({
        ...value,
        status: {
          ...status,
          [key]: !status[key],
          all: false,
        },
      });
    }
  };

  /** 🔹 Date Range */
  const renderDateRange = () => (
    <View>
      <CustomCalendar
        placeholder="From"
        value={from}
        onDateChange={(date) => onChange({ ...value, from: date })}
      />

      <CustomCalendar
        margTp={Platform.OS === 'ios' ? handleSize.f(15) : handleSize.f(20)}
        placeholder="To"
        value={to}
        onDateChange={(date) => onChange({ ...value, to: date })}
      />
    </View>
  );

  /** 🔹 Amount Range */
  const renderAmountRange = () => (
    <View>
      <Text style={styles.sectionTitle}>Amount range</Text>        
        <TextInput 
          value={amount.min}
          placeholder="Enter Amount"
          placeholderTextColor={THEME.textPrimary}
          onChangeText={(text: any) =>
            onChange({ ...value, amount: { ...amount, min: text } })
          }
          keyboardType="numeric"
          style={styles.txtInpu}
        />
    </View>
  );

  /** 🔹 Status Selection */
  const renderStatusSelection = () => (
    <View>
      <Text style={styles.sectionTitle}>Status</Text>

      {[
        { key: 'all', label: 'All' },
        { key: 'completed', label: 'Completed' },
        { key: 'pending', label: 'Pending' },
        { key: 'failed', label: 'Failed' },
      ].map((item) => (
        <View key={item.key} style={styles.row}>
          <TouchableOpacity
            style={[
              styles.box,
              { borderColor: status[item.key] ? THEME.primary : THEME.white },
            ]}
            onPress={() => toggleStatus(item.key)}
          >
            {status[item.key] && (
              <Icon name="checkmark" size={17} color={THEME.primary} />
            )}
          </TouchableOpacity>

          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  /** 🔹 Transaction Type */
  const renderTransactionType = () => (
    <View>
      <Text style={styles.sectionTitle}>Transaction type</Text>

      {[
        { key: 'all', label: 'All' },
        { key: 'debit', label: 'Debit' },
        { key: 'credit', label: 'Credit' },
        { key: 'refund', label: 'Refund' },
        { key: 'atm', label: 'ATM withdrawal' },
      ].map((item) => (
        <View key={item.key} style={styles.row}>
          <TouchableOpacity
            style={[
              styles.box,
              {
                borderColor: checked[item.key]
                  ? THEME.primary
                  : THEME.white,
              },
            ]}
            onPress={() => handleTransactionType(item.key)}
          >
            {checked[item.key] && (
              <Icon name="checkmark" size={17} color={THEME.primary} />
            )}
          </TouchableOpacity>

          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  /** 🔹 Buttons */
  const renderButtons = () => {
    const filterData = { from, to, checked, status, amount };

    return (
      <View>
        <CustomButton
          title="Apply"
          btnContSty={styles.applyBtn}
          onPress={() => onPress(filterData)}
        />

        <CustomButton
          title="Reset"
          btnContSty={styles.resetBtn}
          onPress={() => onPress2(filterData)}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.addCardGradient}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{sheetTile}</Text>

        {renderDateRange()}
        {renderTransactionType()}

        {show == ACCOUNT_HISTRY_VALIDATION.COMPLETE ?
        <View>
            {renderAmountRange()}
            {renderStatusSelection()}
        </View>
         : 
         null 
        }

        {renderButtons()}
      </ScrollView>
    </ImageBackground>
  );
};

export default TransactionFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: handleSize.w(20)
    },

    nodge: {
        width: handleSize.w(70),
        height: handleSize.h(8),
        backgroundColor: THEME.lightGrey,
        alignSelf: "center",
        borderRadius: handleSize.w(20),
        marginTop: handleSize.h(20)
    },
    txtInpu:
    { height: 50, borderRadius: 100, backgroundColor: THEME.white, paddingLeft: handleSize.w(20), fontFamily: FONTFAMILY.Medium, fontSize: handleSize.f(FONT_SIZES.onefour) },
    title: {
        fontSize: handleSize.f(FONT_SIZES.twosix),
        fontFamily: FONTFAMILY.SemiBold,
        color: THEME.white,
        alignSelf: "center",
        paddingBottom: handleSize.h(20),
        marginTop: handleSize.f(20)
    },

    forgetTxt1: {
        marginTop: handleSize.h(20),
        marginBottom: handleSize.h(0),
        backgroundColor: THEME.primary
    },

    forgetTxt2: {
        marginTop: handleSize.h(10),
        marginBottom: handleSize.h(20),
        backgroundColor: THEME.white
    },

    checkmarkTitle: {
        fontSize: handleSize.f(FONT_SIZES.onesix),
        fontFamily: FONTFAMILY.Medium,
        color: THEME.white,
        marginTop: handleSize.h(15),
        marginBottom: handleSize.h(10)
    },

    boxShape: {
        width: handleSize.f(20),
        height: handleSize.f(20),
        borderWidth: handleSize.w(1.5),
        borderRadius: handleSize.w(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
  sectionTitle: {
    marginTop: handleSize.f(15),
    marginBottom: handleSize.h(10),
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: handleSize.w(10),
  },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: handleSize.h(4)
    },

    label: {
        marginLeft: handleSize.w(2),
        fontSize: handleSize.f(FONT_SIZES.onefour),
        fontFamily: FONTFAMILY.Light,
        color: THEME.white
    },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyBtn: {
    marginTop: handleSize.f(15),
  },
  resetBtn: {
    marginTop: handleSize.f(10),
    marginBottom: handleSize.f(40)
  },
});
