import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native';

const CardDetail = ({ saveCureentDisplayData,style, onPress1,onPress2,getSucureCardData,isPendinggetSucureCard }:{ saveCureentDisplayData: any,style:any, onPress1: any, onPress2: any,getSucureCardData: any,isPendinggetSucureCard: any }) => {

    function cardDetailBox(loading:any, onPress:any, title: any, desc: any, icon: any,iconColor: any, show: any) {
        return(
        <View style={[styles.textBox,{    borderBottomWidth: show ? 0.5 : 0, }]}>
            <TouchableOpacity onPress={onPress} >
                <Icon name={icon} size={22} color={iconColor} />
            </TouchableOpacity>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                {loading ?
                <ActivityIndicator size="small" color={THEME.white}  />
                :
                <Text style={styles.cardDesc}>{desc}</Text>}
            </View>
        </View>
        )
    }

    console.log("DATAAA=>",saveCureentDisplayData);
    

    return (
    <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={[styles.container,style]}>
    
       {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 }} /> */}
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} >
        <Text style={styles.title}>{saveCureentDisplayData?.format} Card Details</Text>
        <Text style={styles.subtitle}>Use this information to make online purchases</Text>

        {cardDetailBox(null, null ,"Card Number:", "DUMMY" , "copy-outline",THEME.primary, true )}
        {cardDetailBox(isPendinggetSucureCard, onPress1, "Valid Thru",saveCureentDisplayData?.expiry_date , "eye-outline",THEME.primary, true )}
        {cardDetailBox(isPendinggetSucureCard, onPress2,"CVV:", "DUMMY" , "eye-outline",THEME.primary, false )}
      </ScrollView>

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
    color: THEME.white,
    alignSelf: "center",
    marginTop: 10,
     textTransform: 'capitalize'
  },
  subtitle: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize:  FONT_SIZES.onesix,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: THEME.lightGrey,
    paddingBottom: 20,
    textAlign: "center",
    lineHeight: 20
  },

  textBox: {
    marginTop: 3,

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
