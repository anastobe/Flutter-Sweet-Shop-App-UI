import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native';

const ManageOption = ({ style, onPress1,onPress2,backImg }:{  style:any, onPress1: any, onPress2: any,backImg: any }) => {

        function Listitem(icon:any, title:any,switchOnpress:any,iconRight: any,desc: any) {
            return (
            <TouchableOpacity onPress={switchOnpress} style={styles.containerAlert} >
                <View style={styles.ICONcONT} >
                    <Icon name={icon} size={20} color={THEME.textPrimary} />
                </View>
                <View style={{ flex: 1, justifyContent: "center", marginRight: 10 }} >
                    <Text style={styles.titleAbove}>
                        {title}
                    </Text>
                    <Text style={styles.descriptionbelow}>
                        {desc}
                    </Text>
                </View>
                <View style={{ justifyContent: "center" }} >
                     {/* <Icon name={iconRight} size={25} color={THEME.primary} /> */}
                     <Image source={Images.arrow} style={{ width: 24, height: 24 }} resizeMode="contain" />
                </View>
            </TouchableOpacity>
        )
    }

  return (
 <ImageBackground resizeMode="cover" source={backImg} style={style}>
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} >
      <Text style={styles.title}>Manage Cards</Text>
      {Listitem('pin-outline', "Pin & Security",onPress1,'arrow-forward-outline',"Generate an instant-use card for safer online payments." )}
      {Listitem('card-outline', "Set Spending Limit",onPress2,'arrow-forward-outline',"Order a card to use in-store, online, and for ATM withdrawals." )}
    </ScrollView>
    </ImageBackground>
  );
};

export default ManageOption;

const styles = StyleSheet.create({
  title: {
        color: THEME.white,
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: FONT_SIZES.twosix,
        textAlign: "center",
        marginTop: 25,
        paddingBottom: 15,
  },

    containerAlert: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 10,
        paddingBottom: 15,
        alignItems: "center"
        // borderBottomWidth: 0.5,
        // borderColor: THEME.primary,
    },
    titleAbove: {
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: FONT_SIZES.onefour,
        color: THEME.white,
        marginLeft: 8
    },
    descriptionbelow: {
        fontFamily: FONTFAMILY.Regular,
        fontSize: FONT_SIZES.onetwo,
        color: THEME.white,
        lineHeight: 16,
        marginHorizontal: 8,
        marginTop: 3
    },
    ICONcONT: {
        width: 36,
        height: 36,
        backgroundColor: THEME.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
});
