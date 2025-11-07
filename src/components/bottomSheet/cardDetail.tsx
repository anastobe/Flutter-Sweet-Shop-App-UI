import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';

const CardDetail = ({ style, onPress1,onPress2,iconColor }:{ style:any, onPress1: any, onPress2: any,iconColor: any }) => {

    function cardDetailBox(title: any, desc: any, icon: any,iconColor: any) {
        return(
        <View style={styles.textBox}>
            <View>
                <Icon name={icon} size={22} color={iconColor} />
            </View>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{desc}</Text>
            </View>
        </View>
        )
    }

    return (
    <ImageBackground resizeMode="stretch" source={Images.manageCardGradient} style={[styles.container,style]}>
    
       {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 }} /> */}

      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.subtitle}>Use this information to make online purchases</Text>

      {cardDetailBox("Card Number:", "1234 5678 9012 3456" , "copy-outline",THEME.white )}
      {cardDetailBox("Valid Thru", "••/••" , "eye-outline",THEME.white )}
      {cardDetailBox("CVV:", "1234 5678 9012 3456" , "eye-outline",THEME.white )}

    </ImageBackground>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.twosix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    alignSelf: "center",
    marginTop: 10
  },
  subtitle: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize:  FONT_SIZES.onesix,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: THEME.lightGrey,
    paddingBottom: 20,
    textAlign: "center"
  },

  textBox: {
    marginTop: 3,
    borderBottomWidth: 0.5,
    // backgroundColor: "red",
    borderColor: THEME.lightGrey,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  cardTitle: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
    marginLeft: 10
  },
  cardDesc: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
    marginLeft: 10
  },


});
