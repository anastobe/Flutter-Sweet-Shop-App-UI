import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { TouchableOpacity } from 'react-native';

const ManageOption = ({ style, onPress1,onPress2 }:{  style:any, onPress1: any, onPress2: any }) => {

        function Listitem(icon:any, title:any,switchOnpress:any,iconRight: any) {
            return (
            <TouchableOpacity onPress={switchOnpress} style={styles.containerAlert} >
                <View style={styles.ICONcONT} >
                    <Icon name={icon} size={20} color={THEME.primary} />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }} >
                    <Text style={styles.titleAbove}>
                        {title}
                    </Text>
                </View>
                <View style={{ justifyContent: "center" }} >
                     <Icon name={iconRight} size={25} color={THEME.primary} />
                </View>
            </TouchableOpacity>
        )
    }

  return (
    <View style={style}>

        <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 8 }} />

      <Text style={styles.title}>Manage Payment</Text>
      {Listitem('flash-outline', "Set Limit",onPress1,'arrow-forward-circle-outline' )}
      {Listitem('flash-outline', "Change Pin",onPress2,'arrow-forward-circle-outline' )}
      

    </View>
  );
};

export default ManageOption;

const styles = StyleSheet.create({
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    textAlign: "center",
    lineHeight: 35,
    marginTop: 30
  },

    containerAlert: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 10,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: THEME.lightGrey,
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
        backgroundColor: THEME.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
});
