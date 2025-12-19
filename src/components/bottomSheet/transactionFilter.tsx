import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../customCalander';
import { handleSize } from '../../config/responsiveTheme';

const TransactionFilter = ({ onPress, onPress2 }: { onPress: any, onPress2: any }) => {

    const [from, setfrom] = useState('');
    const [to, setto] = useState('');
    const [checked, setChecked] = useState({
        all: false,
        debit: false,
        credit: false,
        refund: false,
        atm: false,
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
                <CustomCalendar
                    placeholder="From"
                    value={from}
                    onDateChange={setfrom}
                />

                <CustomCalendar
                    margTp={handleSize.h(20)}
                    placeholder="To"
                    value={to}
                    onDateChange={setto}
                />
            </View>
        )
    }

    function renderButton(onPress: any, onPress2: any) {
        let Filter_data = {
            from: from,
            to: to,
            checked: checked
        }
        return (
            <View>
                <CustomButton
                    btnContSty={styles.forgetTxt1}
                    title="Apply"
                    onPress={()=>{ onPress(Filter_data) }}
                />

                <CustomButton
                    btnContSty={styles.forgetTxt2}
                    title="Reset"
                    onPress={()=>{ onPress2(Filter_data) }}
                />
            </View>
        )
    }

    function transactionTypeSelection() {
        return (
            <View>
                <Text style={styles.checkmarkTitle}>Transaction Type</Text>

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
                            <TouchableOpacity
                                style={[
                                    styles.boxShape,
                                    { borderColor: checkedValue ? THEME.primary : THEME.white }
                                ]}
                                onPress={() => handlePress(item.key)}
                            >
                                {checkedValue ?
                                    <Icon name="checkmark" size={handleSize.f(17)} color={checkedValue ? THEME.primary : THEME.white} />
                                    : null}
                            </TouchableOpacity>

                            <Text style={styles.label}>{item.label}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={styles.container}>
            <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Filter Transactions</Text>

                {renderFilterRange()}
                {transactionTypeSelection()}
                {renderButton(onPress, onPress2)}
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

    title: {
        fontSize: handleSize.f(FONT_SIZES.twosix),
        fontFamily: FONTFAMILY.SemiBold,
        color: THEME.white,
        alignSelf: "center",
        paddingBottom: handleSize.h(20),
        marginTop: handleSize.h(10)
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
        width: handleSize.w(20),
        height: handleSize.h(20),
        borderWidth: handleSize.w(1.5),
        borderRadius: handleSize.w(3),
        justifyContent: 'center',
        alignItems: 'center'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: handleSize.h(4)
    },

    label: {
        marginLeft: handleSize.w(8),
        fontSize: handleSize.f(FONT_SIZES.onefour),
        fontFamily: FONTFAMILY.Light,
        color: THEME.white
    },
});
