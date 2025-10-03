import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../textInput';
import { ImageBackground } from 'react-native';

const TransactionFilter = ({  onPress,onPress2 }: { onPress: any,onPress2: any }) => {

    const [from, setfrom] = useState('');
    const [to, setto] = useState('');
    const [checked, setChecked] = useState({
        all: false,
        debit: false,
        credit: false,
        refund: false,
        atm: false,
    });
    const [checkedStatus, setCheckedStatus] = useState({
        all: false,
        completed: false,
        pending: false,
        failed: false
    });

    const handlePress = (key: any) => {
        if (key === 'all') {
            const newValue = !checked.all;
            setChecked({
                all: newValue,
                debit: newValue,
                credit: newValue,
                refund: newValue,
                atm: newValue,
            });
        } else {
            setChecked((prev: any) => ({
                ...prev,
                [key]: !prev[key],
                all: false,
            }));
        }
    };



    function renderFilterRange() {
        return (
            <View>
                <InputField
                    customInpStyle={{ width: METRICS.width - 40 }}
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="From"
                    value={from}
                    onChangeText={setfrom}
                    image={"calendar-outline"}
                    imagetintColor={THEME.white}
                />
                <InputField
                    customInpStyle={{ width: METRICS.width - 40 }}
                    margTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="To"
                    value={to}
                    onChangeText={setto}
                    image={"calendar-outline"}
                    imagetintColor={THEME.white}
                />
            </View>
        )
    }

    function renderButton(onPress: any,onPress2: any) {
        return (
            <View>
                <CustomButton
                    btnContSty={styles.forgetTxt1}
                    title="Apply"
                    onPress={onPress}
                    />

                <CustomButton
                    btnContSty={styles.forgetTxt2}
                    title="Reset"
                    onPress={onPress2}
                    />
            </View>
        )
    }

    function transactionTypeSelection() {
        return (
            <View>
                <Text style={styles.checkmarkTitle} >Transaction Type</Text>
                {[
                    { key: 'all', label: 'All' },
                    { key: 'debit', label: 'Debit' },
                    { key: 'credit', label: 'Credit' },
                    { key: 'refund', label: 'Refund' },
                    { key: 'atm', label: 'ATM Withdrawal' },
                ].map((item) => {
                    let checkedValue = checked[item.key]
                    return (
                        <View key={item.key} style={styles.row}>
                            <TouchableOpacity style={[styles.boxShape ]} onPress={() => handlePress(item.key)} >{
                                checkedValue ?
                                    <Icon name="checkmark" size={17} color={THEME.white} />
                                    : null
                            }
                            </TouchableOpacity>
                            <Text style={styles.label}>{item.label}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
  <ImageBackground resizeMode="cover" source={Images.bottogSheetGradient} style={styles.container}>
 
            <Text style={styles.title}>Filter Transactions</Text>
            <ScrollView showsVerticalScrollIndicator={false} >
                {renderFilterRange()}
                {transactionTypeSelection()}
              
                {renderButton(onPress,onPress2)}
            </ScrollView>
        </ImageBackground>
    );
};

export default TransactionFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    nodge:
    { width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 },
    title: {
        fontSize: FONT_SIZES.twosix,
        fontFamily: FONTFAMILY.SemiBold,
        color: THEME.white,
        alignSelf: "center",
        paddingBottom: 20,
        marginTop: 10
    },

    forgetTxt1:
        { marginTop: 20, marginBottom: 0, backgroundColor: THEME.primary },
        
    forgetTxt2:
        { marginTop: 20, marginBottom: 20,backgroundColor: THEME.white },
    checkmarkTitle: {
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Medium,
        color: THEME.white,
        marginTop: 15,
        marginBottom: 10
    },
    boxShape:
        { width: 20, height: 20, borderWidth: 1.5, borderColor: THEME.white, borderRadius: 3 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    label: {
        marginLeft: 8,
        fontSize: FONT_SIZES.onefour,
        fontFamily: FONTFAMILY.Light,
        color: THEME.white,
    },

});
