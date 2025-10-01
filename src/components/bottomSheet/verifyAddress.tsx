import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }} >
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueBox}>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

const VerifyAddress = ({ style, onPress1, onPress2, backImg }: { style: any, onPress1: any,onPress2: any,backImg }) => {

    function renderCardDetails() {
        return (
            <View style={styles.summaryBox}>
           
                <InfoRow icon="card-outline" label="Address" value="Address" />
                <InfoRow icon="person-outline" label="City" value="London" />
                <InfoRow icon="home-outline" label="Postal Code" value="NW1 6XE" />
                <InfoRow icon="time-outline" label="Country" value="United Kingdom" />
            </View>
        )
    }

    function renderBottomStuffs(onPress1:any,onPress2: any) {
        return (
            <View>
                <Text style={styles.subtitle1}>Is this your current address?</Text>

                <CustomButton
                    btnContSty={styles.forgetTxt}
                    title="Yes, Continue"
                    onPress={onPress1}
                />
                <CustomButton
                    btnContSty={styles.forgetTxtDown}
                    title="No, Update Address"
                    onPress={onPress2}
                />
            </View>
        )
    }

    return (
         <ImageBackground resizeMode="cover" source={backImg} style={style}>


        {/* <View style={[styles.container, style]}> */}
            <View style={styles.stepGrey} />
            <ScrollView showsVerticalScrollIndicator={false} >
            <Text style={styles.title}>Verify Your Registered Address</Text>
            <Text style={styles.subtitle}>Your card is linked to the following address</Text>
            {renderCardDetails()}
            {renderBottomStuffs(onPress1,onPress2)}
            </ScrollView>
        {/* </View> */}
        </ImageBackground>
    );
};

export default VerifyAddress;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    forgetTxt:
        { marginTop: 20, marginBottom: 20, backgroundColor: THEME.primary },
    forgetTxtDown:
        { marginTop: 0, marginBottom: 20, backgroundColor: THEME.white },
    title: {
        fontSize: FONT_SIZES.twosix,
        fontFamily: FONTFAMILY.SemiBold,
        color: THEME.white,
        alignSelf: "center",
        marginTop: 10,
        textAlign: 'center'
    },
    subtitle: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Regular,
        fontSize: FONT_SIZES.onesix,
        marginTop: 3,
        // borderBottomWidth: 0.5,
        // borderColor: THEME.lightGrey,
        paddingBottom: 20,
        textAlign: "center"
    },

    stepGrey:
    { width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20, marginBottom: 10 },

    subtitle1: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Light,
        fontSize: FONT_SIZES.onesix,
        textAlign: "center"
    },

    subtitle2: {
        color: THEME.primary,
        fontFamily: FONTFAMILY.Medium,
        fontSize: FONT_SIZES.onesix,
        paddingBottom: 20,
        textAlign: "center"
    },


    infoRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        // marginBottom: 10,
    },
    label: {
        fontFamily: FONTFAMILY.Light,
        fontSize: FONT_SIZES.onefour,
        color: THEME.white,
    },
    valueBox: {
        // backgroundColor: THEME.lightGrey,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    value: {
        fontFamily: FONTFAMILY.Medium,
        fontSize: FONT_SIZES.onefour,
        color: THEME.primary,
    },
    summaryBox: {
        // backgroundColor: THEME.textPrimary,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,

    },

});
