import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';

const AddCardPopup = ({ style, onPress1,onPress2,backImg }:{ style:any, onPress1: any, onPress2: any,backImg: any }) => {
  return (
    <ImageBackground resizeMode="cover" source={backImg} style={style}>
      <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} >
      <Text style={styles.title}>Select Card Type</Text>
        <TouchableOpacity onPress={onPress1} style={styles.cardItem}>
          <View style={{ flexDirection: "row" }}>
          <View style={styles.iconBox}>
            <Icon name="card-outline" size={24} color={THEME.textPrimary} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Virtual Card</Text>
            <Text style={styles.cardDesc}>
              Generate an instant-use card for safer online payments.
            </Text>
          </View>
          </View>
          
          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={20} color={THEME.white} />
          </View>

        </TouchableOpacity>

        <TouchableOpacity  onPress={onPress2} style={styles.cardItem}>
                 <View style={{ flexDirection: "row" }}>
          <View style={styles.iconBox}>
            <Icon name="card-outline" size={24} color={THEME.textPrimary} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Physical Card</Text>
            <Text style={styles.cardDesc}>
              Order a card to use in-store, online, and for ATM withdrawals.
            </Text>
          </View>
          </View>
          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={20} color={THEME.white} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddCardPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.twosix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    alignSelf: "center",
    // borderBottomWidth: 0.5,
    // borderColor: THEME.white,
    paddingBottom: 20,
    marginTop: 30
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    // borderTopWidth: 0.5,
    // borderColor: '#ddd',
    paddingVertical: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center"
  },
  textBox: {
    paddingLeft: 10
  },
  cardTitle: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  cardDesc: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Regular,
    fontSize:  FONT_SIZES.onetwo,
    marginTop: 3,
    width: METRICS.width - 130,
    lineHeight: 16
    // width: '80%'
  },


});
