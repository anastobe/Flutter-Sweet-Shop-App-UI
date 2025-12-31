import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { handleSize } from '../../config/responsiveTheme';

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueBox}>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

const VerifyAddress = ({ style, onPress1, onPress2, backImg, loginUserData }) => {

    function renderCardDetails() {
        return (
            <View style={styles.summaryBox}>
                <InfoRow label="Address" value={loginUserData.address_line1 + " " + loginUserData.address_line2 + " " + loginUserData.address_line3} />
                <InfoRow label="City" value={"DUMMY"} />
                <InfoRow label="Postal Code" value={loginUserData.postcode} />
                <InfoRow label="Country" value={loginUserData.county} />
            </View>
        );
    }

    function renderBottomStuffs(onPress1, onPress2) {
        return (
            <View>
                <Text style={styles.subtitle1}>Is this your current address?</Text>

                <CustomButton
                    btnContSty={styles.forgetTxt}
                    title="Yes, continue"
                    onPress={onPress1}
                />
                <CustomButton
                    btnContSty={styles.forgetTxtDown}
                    title="No, update address"
                    onPress={onPress2}
                />
            </View>
        );
    }

    return (
        <ImageBackground resizeMode="cover" source={backImg} style={style}>
            <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Verify your registered address</Text>
                <Text style={styles.subtitle}>Your card is linked to the following address</Text>
                {renderCardDetails()}
                {renderBottomStuffs(onPress1, onPress2)}
            </ScrollView>
        </ImageBackground>
    );
};

export default VerifyAddress;

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },

    forgetTxt: {
        marginTop: handleSize.h(20),
        marginBottom: handleSize.h(20),
        backgroundColor: THEME.primary,
    },

    forgetTxtDown: {
        marginTop: handleSize.h(0),
        marginBottom: handleSize.h(20),
        backgroundColor: THEME.white,
    },

    title: {
        fontSize: handleSize.f(FONT_SIZES.twosix),
        lineHeight: handleSize.h(32),
        fontFamily: FONTFAMILY.SemiBold,
        color: THEME.white,
        alignSelf: "center",
        marginTop: handleSize.h(20),
        textAlign: "center",
    },

    subtitle: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Regular,
        fontSize: handleSize.f(FONT_SIZES.onesix),
        marginTop: handleSize.h(10),
        lineHeight: handleSize.h(18),
        paddingBottom: handleSize.h(20),
        textAlign: "center",
    },

    stepGrey: {
        width: handleSize.w(70),
        height: handleSize.h(8),
        backgroundColor: THEME.lightGrey,
        alignSelf: "center",
        borderRadius: handleSize.f(20),
        marginTop: handleSize.h(20),
        marginBottom: handleSize.h(10),
    },

    subtitle1: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Light,
        fontSize: handleSize.f(FONT_SIZES.onesix),
        textAlign: "center",
    },

    subtitle2: {
        color: THEME.primary,
        fontFamily: FONTFAMILY.Medium,
        fontSize: handleSize.f(FONT_SIZES.onesix),
        paddingBottom: handleSize.h(20),
        textAlign: "center",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    label: {
        fontFamily: FONTFAMILY.Light,
        fontSize: handleSize.f(FONT_SIZES.onefour),
        color: THEME.white,
    },

    valueBox: {
        paddingHorizontal: handleSize.w(10),
        paddingVertical: handleSize.h(4),
        borderRadius: handleSize.f(8),
    },

    value: {
        fontFamily: FONTFAMILY.Medium,
        fontSize: handleSize.f(FONT_SIZES.onefour),
        color: THEME.primary,
    },

    summaryBox: {
        borderRadius: handleSize.f(20),
        padding: handleSize.h(10),
        marginBottom: handleSize.h(10),
    },
});
