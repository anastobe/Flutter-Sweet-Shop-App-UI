import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { Images } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const AccountCard = ({ item, index, onPressCard,containerStyle }: { item?: any, index?: any, onPressCard?: any, containerStyle?: StyleSheet }) => {


    return (
        <TouchableOpacity activeOpacity={1} onPress={()=>{onPressCard(item)}} style={[{ width: METRICS.width , height: 174, borderRadius: 15 },containerStyle]}  >
        <ImageBackground resizeMode="stretch" source={Images.cardBack} imageStyle={{ borderRadius: 15 }} style={{flex: 1,marginHorizontal: 20 }} >

            <View style={{ flexDirection: "row", paddingHorizontal: 10, marginTop: 10 }} >
                <View>
                    <Image source={Images.frontPayLogo} style={{ width: 34, height: 37 }} resizeMode='contain' />
                </View>
                <View>
                    <Text style={styles.cardTitle}>Business Visa (•••• 1234)</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', position: "absolute", bottom: 10, alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 10 }} >
                <View>
                    <Text style={styles.limitTxt}>Daily/Available Limit:</Text>
                    <Text style={styles.balanceTxt}>£{item?.spending_limit}</Text>
                </View>

                <View>
                    <Text style={styles.detailTxt}>Show Details</Text>
                </View>
            </View>


        </ImageBackground>
        </TouchableOpacity>
    );
};

export default AccountCard;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    card: {
        // width: METRICS.width,
        // marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
    },
    cardTitle: {
        color: THEME.white,
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Light,
        marginLeft: 10
    },
    limitTxt: {
        color: THEME.gray,
        fontSize: FONT_SIZES.onefour,
        fontFamily: FONTFAMILY.Medium
    },
    balanceTxt: {
        color: THEME.white,
        fontSize: FONT_SIZES.threetwo,
        fontFamily: FONTFAMILY.Medium
    },
    detailTxt: {
        color: THEME.prinkishBlue,
        fontSize: FONT_SIZES.onetwo,
        fontFamily: FONTFAMILY.Medium,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amountLabel: {
        color: '#fff',
        fontSize: 13,
    },
    amountSubLabel: {
        color: '#ccc',
        fontSize: 11,
    },
});
