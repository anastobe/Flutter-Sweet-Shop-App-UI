import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';
import Metrics from '../styles/metrics';

const AccountCardzoom = ({ item, index, onPressCard, containerStyle }: { item?: any, index?: any, onPressCard?: any, containerStyle?: any }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => { onPressCard(item); }}
            style={[{ width: Metrics.width, height: handleSize.h(174), borderRadius: handleSize.f(15) }, containerStyle]}
        >
            <ImageBackground
                resizeMode="stretch"
                source={Images.cardBack}
                imageStyle={{ borderRadius: handleSize.f(15) }}
                style={{ flex: 1, marginHorizontal: handleSize.w(20) }}
            >

                <View style={{ paddingHorizontal: handleSize.w(10), marginTop: handleSize.h(10) }}>
                    <Text style={styles.cardTitle}>My Acc... (•••• 6243)</Text>
                    <Text style={styles.cardTitlebelow}>Multi Currency</Text>
                </View>

                <View style={{ width: '100%', alignItems: "center", marginTop: handleSize.h(20) }}>
                    <Text style={styles.midcardTitle}>€22.50</Text>
                    <Text style={styles.midcardTitlebelow}>On Hold or Pending</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    position: "absolute",
                    bottom: handleSize.h(10),
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingHorizontal: handleSize.w(10)
                }}>
                    <View>
                        <Text style={styles.cardTitle}>€22.50</Text>
                        <Text style={styles.cardTitlebelowstatus}>On hold or pending</Text>
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>€53,534.00</Text>
                        <Text style={styles.cardTitlebelowstatus}>Available</Text>
                    </View>
                </View>

            </ImageBackground>
        </TouchableOpacity>
    );
};

export default AccountCardzoom;

const styles = StyleSheet.create({
    cardTitle: {
        color: THEME.white,
        fontSize: handleSize.f(FONT_SIZES.onesix),
        fontFamily: FONTFAMILY.Light,
        marginLeft: handleSize.w(10),
    },
    cardTitlebelow: {
        color: THEME.white,
        fontSize: handleSize.f(FONT_SIZES.onefour),
        fontFamily: FONTFAMILY.Medium,
        marginLeft: handleSize.w(10),
        marginTop: handleSize.h(2),
    },
    midcardTitle: {
        color: THEME.white,
        fontSize: handleSize.f(FONT_SIZES.twotwo),
        fontFamily: FONTFAMILY.Light,
        marginLeft: handleSize.w(10),
    },
    midcardTitlebelow: {
        color: THEME.prinkishBlue,
        fontSize: handleSize.f(FONT_SIZES.onetwo),
        fontFamily: FONTFAMILY.Medium,
        marginLeft: handleSize.w(10),
        marginTop: handleSize.h(2),
    },
    cardTitlebelowstatus: {
        color: THEME.white,
        fontSize: handleSize.f(FONT_SIZES.onetwo),
        fontFamily: FONTFAMILY.Medium,
        marginLeft: handleSize.w(10),
        marginTop: handleSize.h(2),
    },
});
