import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../textInput';

const TransactionFilter = ({ style, onPress }: { style: any, onPress: any }) => {

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


    const handlePressStatus = (key: any) => {
        if (key === 'all') {
            const newValue = !checkedStatus.all;
            setCheckedStatus({
                all: newValue,
                completed: newValue,
                pending: newValue,
                failed: newValue
            });
        } else {
            setCheckedStatus((prev: any) => ({
                ...prev,
                [key]: !prev[key],
                all: false,
            }));
        }
    };

    function renderFilterRange() {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                <InputField
                    customInpStyle={{ width: METRICS.width / 2 - 25 }}
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="From"
                    value={from}
                    onChangeText={setfrom}
                />
                <InputField
                    customInpStyle={{ width: METRICS.width / 2 - 25 }}
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="To"
                    value={to}
                    onChangeText={setto}
                />
            </View>
        )
    }

    function renderButton(onPress: any) {
        return (
                <CustomButton
                    btnContSty={styles.forgetTxt}
                    title="Apply"
                    onPress={onPress}
                />
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
                            <TouchableOpacity style={[styles.boxShape, { borderColor: checkedValue ? THEME.prinkishBlue : THEME.gray }]} onPress={() => handlePress(item.key)} >{
                                checkedValue ?
                                    <Icon name="checkmark" size={17} color="#cc66ff" />
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

    function renderSeekbar() {
        return (
            <View>
                <Text style={styles.checkmarkTitle} >Amount Range</Text>
            </View>
        )
    }

    function transactionStatusSelection() {
        return (
            <View>
                <Text style={styles.checkmarkTitle} >Status</Text>
                {[
                    { key: 'all', label: 'All' },
                    { key: 'completed', label: 'Completed' },
                    { key: 'pending', label: 'Pending' },
                    { key: 'failed', label: 'Failed' }
                ].map((item) => {
                    let checkedValue = checkedStatus[item.key]
                    return (
                        <View key={item.key} style={styles.row}>
                            <TouchableOpacity style={[styles.boxShape, { borderColor: checkedValue ? THEME.prinkishBlue : THEME.gray }]} onPress={() => handlePressStatus(item.key)} >{
                                checkedValue ?
                                    <Icon name="checkmark" size={17} color="#cc66ff" />
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
        <View style={[styles.container, style]}>
            <View style={styles.nodge} />

            <Text style={styles.title}>Filter Transactions</Text>
            <ScrollView showsVerticalScrollIndicator={false} >
                {renderFilterRange()}
                {transactionTypeSelection()}
                {renderSeekbar()}
                {transactionStatusSelection()}
                {renderButton(onPress)}
            </ScrollView>
        </View>
    );
};

export default TransactionFilter;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    nodge:
    { width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 },
    title: {
        fontSize: FONT_SIZES.threetwo,
        fontFamily: FONTFAMILY.Light,
        color: THEME.primary,
        alignSelf: "center",
        paddingBottom: 20,
        marginTop: 10
    },

    forgetTxt:
        { marginTop: 20, marginBottom: 20 },
    checkmarkTitle: {
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Medium,
        color: THEME.white,
        marginTop: 15,
        marginBottom: 10
    },
    boxShape:
        { width: 20, height: 20, borderWidth: 1.5, borderRadius: 3 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    label: {
        marginLeft: 8,
        fontSize: FONT_SIZES.onefour,
        fontFamily: FONTFAMILY.Light,
        color: THEME.primary,
    },

});
