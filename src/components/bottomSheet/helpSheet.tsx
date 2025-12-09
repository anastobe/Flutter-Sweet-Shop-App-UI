import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CardBox from '../cardBox';
import { handleSize } from '../../config/responsiveTheme';

const HelpSheet = ({ 
    title, 
    subtitle, 
    style, 
    onPress1,
    onPress2
}) => {
    return (
        <ImageBackground
            resizeMode="cover"
            source={Images.addCardGradient}
            style={style}
        >
            <ScrollView
                style={{ marginTop: handleSize.h(10) }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.titlesub}>{subtitle}</Text>

                <CardBox
                    rotate={'-45deg'}
                    titleLeft="support@frountier-pay.com"
                    iconRight="arrow-forward-outline"
                    iconLeft="mail-outline"
                    TL_radius={handleSize.w(10)}
                    TR_radius={handleSize.w(10)}
                    onPress={onPress1}
                />

                <CardBox
                    rotate={'-45deg'}
                    titleLeft="+44 20 7946 0991"
                    iconRight="arrow-forward-outline"
                    iconLeft="call-outline"
                    TL_radius={handleSize.w(10)}
                    TR_radius={handleSize.w(10)}
                    onPress={onPress2}
                />

                <View style={{ height: handleSize.h(20) }} />
            </ScrollView>
        </ImageBackground>
    );
};

export default HelpSheet;

const styles = StyleSheet.create({
    title: {
        color: THEME.white,
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: handleSize.f(FONT_SIZES.twosix),
        textAlign: "center",
        lineHeight: handleSize.h(35),
        marginTop: handleSize.h(30)
    },
    titlesub: {
        color: THEME.white,
        fontFamily: FONTFAMILY.Regular,
        fontSize: handleSize.f(FONT_SIZES.onesix),
        textAlign: "center",
        marginTop: handleSize.h(5),
        marginBottom: handleSize.h(20)
    },
    forgetTxt: {
        marginTop: handleSize.h(20)
    }
});
