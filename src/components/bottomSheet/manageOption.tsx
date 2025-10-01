import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';

const ManageOption = ({ style, onPress1,onPress2,backImg }:{  style:any, onPress1: any, onPress2: any,backImg: any }) => {

        function Listitem(icon:any, title:any,switchOnpress:any,iconRight: any) {
            return (
            <TouchableOpacity onPress={switchOnpress} style={styles.containerAlert} >
                <View style={styles.ICONcONT} >
                    <Icon name={icon} size={20} color={THEME.textPrimary} />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }} >
                    <Text style={styles.titleAbove}>
                        {title}
                    </Text>
                </View>
                <View style={{ justifyContent: "center",transform: [{ rotate: '-45deg' }] }} >
                     <Icon name={iconRight} size={25} color={THEME.white} />
                </View>
            </TouchableOpacity>
        )
    }

  return (
<ImageBackground resizeMode="cover" source={Images.addCardGradient} style={[styles.container,style]}>
   

        {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 8 }} /> */}

      <Text style={styles.title}>Manage Payment</Text>
      {Listitem('lock-closed-outline', "Set Limit",onPress1,'arrow-forward-outline' )}
      {Listitem('pin-outline', "Change Pin",onPress2,'arrow-forward-outline' )}
      

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
        borderBottomWidth: 0.5,
        borderColor: THEME.primary,
    },
    titleAbove: {
        fontFamily: FONTFAMILY.Medium,
        fontSize: FONT_SIZES.onefour,
        color: THEME.white,
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
        backgroundColor: THEME.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
});
