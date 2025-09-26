import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';

const CardDetail = ({ style, onPress1,onPress2 }:{ style:any, onPress1: any, onPress2: any }) => {

    function cardDetailBox(title: any, desc: any, icon: any,iconColor: any) {
        return(
        <View style={styles.textBox}>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{desc}</Text>
            </View>
            <View>
                <Icon name={icon} size={24} color={iconColor} />
            </View>
        </View>
        )
    }

    return (
  <View style={[styles.container,style]}>
       <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 }} />

      <Text style={styles.title}>Virtual Card Details</Text>
      <Text style={styles.subtitle}>Use this information to make online purchases</Text>

      {cardDetailBox("Card Number:", "1234 5678 9012 3456" , "copy-outline",THEME.prinkishBlue )}
      {cardDetailBox("Valid Thru", "••/••" , "eye-outline",THEME.gray )}
      {cardDetailBox("Card Number:", "1234 5678 9012 3456" , "eye-outline",THEME.gray )}

    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    alignSelf: "center",
    marginTop: 10
  },
  subtitle: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize:  FONT_SIZES.onesix,
    marginTop: 3,
    borderBottomWidth: 0.5,
    borderColor: THEME.lightGrey,
    paddingBottom: 20,
    textAlign: "center"
  },

  textBox: {
    marginTop: 3,
    borderBottomWidth: 0.5,
    borderColor: THEME.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  cardTitle: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white
  },
  cardDesc: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary
  },


});
