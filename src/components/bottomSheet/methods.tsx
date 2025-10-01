import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { ImageBackground } from 'react-native';

const Methods = ({ style, onPress1,onPress2 ,onPress3 ,onPress4,backImg }: { style: any, onPress1: any, onPress2: any, onPress3: any, onPress4: any,backImg: any }) => {

    function Listitem(icon:any, title:any, subtitle:any,switchOnpress:any) {
        return (
        <View style={styles.containerAlert} >
            <View style={styles.ICONcONT} >
                <Icon name={icon} size={20} color={THEME.textPrimary} />
            </View>
            <View style={{ flex: 1 }} >
                <Text style={styles.titleAbove}>
                    {title}
                </Text>
                <Text style={styles.descriptionbelow}>
                    {subtitle}
                </Text>
            </View>
            <View style={{ justifyContent: "center" }} >
                <Text style={styles.titleAbove} >Switch</Text>
            </View>
        </View>
    )
}

return (
 <ImageBackground resizeMode="cover" source={backImg} style={style}>


        {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 8 }} /> */}

        <Text style={styles.title}>Payment Methods</Text>
        {Listitem('flash-outline', "ATM Withdrawals", "Control and monitor your cash withdrawals from ATMs",onPress1 )}
        {Listitem('cash-outline', "Online Payments", "Enable or disable card usage for online purchases",onPress2 )}
        {Listitem('pin-outline', "Chip & PIN Transactions", "Manage in-person card usage with secure PIN entry",onPress3 )}
        {Listitem('card-outline', "Wallets", "Control usage of your card via Apple Pay, Google Pay, and others",onPress4 )}

    </ImageBackground>
);
};

export default Methods;

const styles = StyleSheet.create({
    title: {
        color: THEME.primary,
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: FONT_SIZES.twosix,
        textAlign: "center",
        marginTop: 25,
        paddingBottom: 15,
        // borderBottomWidth: 0.5,
        // borderColor: THEME.lightGrey,

    },
    containerAlert: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 10,
        paddingBottom: 15,
        // borderBottomWidth: 0.5,
        // borderColor: THEME.lightGrey,
    },
    titleAbove: {
        fontFamily: FONTFAMILY.Medium,
        fontSize: FONT_SIZES.onefour,
        color: THEME.primary,
        marginLeft: 8
    },
    descriptionbelow: {
        fontFamily: FONTFAMILY.Light,
        fontSize: FONT_SIZES.onetwo,
        color: THEME.white,
        marginLeft: 8
    },
    ICONcONT: {
        width: scale(36),
        height: scale(36),
        backgroundColor: THEME.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },


});
