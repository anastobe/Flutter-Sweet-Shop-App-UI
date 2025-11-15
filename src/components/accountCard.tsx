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
import { scale } from 'react-native-size-matters';
import { CommonUtils } from '../utils';

const { width } = Dimensions.get('window');

const AccountCard = ({ item, index, onPressCard,containerStyle }: { item?: any, index?: any, onPressCard?: any, containerStyle?: StyleSheet }) => {

    console.log("item=>",item.card_status);
    

    return (
        <TouchableOpacity activeOpacity={1} onPress={()=>{onPressCard(item)}} style={[{ width: METRICS.width , height: 174, borderRadius: 15 },containerStyle]}  >
        <ImageBackground resizeMode="stretch" source={Images.cardBack} imageStyle={{ borderRadius: 15 }} style={{flex: 1,marginHorizontal: scale(25) }} >

            <View style={{ flexDirection: "row", paddingHorizontal: 10, marginTop: 10 }} >
                <View>
                    <Image source={Images.frontPayLogo} style={{ width: 34, height: 37 }} resizeMode='contain' />
                </View>
                <View>
                    <Text style={styles.cardTitle}>  Business Visa (•••• 1234)</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', position: "absolute", bottom: 10, alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 10 }} >
                <View>
                    <Text style={styles.limitTxtUp}>({CommonUtils.capitalizeFirstLetter(item.format)})  ({CommonUtils.capitalizeFirstLetter(item.card_status)})</Text>
                    <Text style={styles.limitTxt}>{item?.spending_type} /Available Limit:</Text>
                    <Text style={styles.balanceTxt}>£{item?.available_limit}</Text>
                </View>

                {/* <View>
                    <Text style={styles.detailTxt}>Show Details</Text>
                </View> */}
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
        color: THEME.textPrimary,
        fontSize: FONT_SIZES.onetwo,
        fontFamily: FONTFAMILY.Medium,
        marginLeft: 10,
        marginTop: 5
    },
    limitTxtUp:{
        color: THEME.textPrimary,
        fontSize: FONT_SIZES.oneZero,
        fontFamily: FONTFAMILY.SemiBold,
    },
    limitTxt: {
        color: THEME.textPrimary,
        fontSize: FONT_SIZES.nine,
        fontFamily: FONTFAMILY.SemiBold
    },
    balanceTxt: {
        color: THEME.textPrimary,
        fontSize: FONT_SIZES.twotwo,
        fontFamily: FONTFAMILY.SemiBold
    },
    detailTxt: {
        color: THEME.prinkishBlue,
        fontSize: FONT_SIZES.onetwo,
        fontFamily: FONTFAMILY.Bold,
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
