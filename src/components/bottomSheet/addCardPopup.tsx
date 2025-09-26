import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../../styles'; // adjust path as needed
import { Images } from '../../config';
import CustomButton from '../customButton';
import Icon from 'react-native-vector-icons/Ionicons';

const AddCardPopup = ({ style, onPress1,onPress2 }:{ style:any, onPress1: any, onPress2: any }) => {
  return (
  <View style={[styles.container,style]}>
       <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 }} />

      <Text style={styles.title}>Select Card Type</Text>


        <TouchableOpacity onPress={onPress1} style={styles.cardItem}>
          <View style={{ flexDirection: "row" }}>
          <View style={styles.iconBox}>
            <Icon name="cart-outline" size={24} color={THEME.primary} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Virtual Card</Text>
            <Text style={styles.cardDesc}>
              Generate an instant-use card for safer online payments.
            </Text>
          </View>
          </View>
          
          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={20} color="#cc66ff" />
          </View>

        </TouchableOpacity>

        <TouchableOpacity  onPress={onPress2} style={styles.cardItem}>
                 <View style={{ flexDirection: "row" }}>
          <View style={styles.iconBox}>
            <Icon name="card-outline" size={24} color={THEME.primary} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.cardTitle}>Physical Card</Text>
            <Text style={styles.cardDesc}>
              Order a card to use in-store, online, and for ATM withdrawals.
            </Text>
          </View>
          </View>
          <View style={{ transform: [{ rotate: '-45deg' }] }}>
            <Icon name="arrow-forward-outline" size={20} color="#cc66ff" />
          </View>
        </TouchableOpacity>

    </View>
  );
};

export default AddCardPopup;

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
    borderBottomWidth: 0.5,
    borderColor: THEME.lightGrey,
    paddingBottom: 20,
    marginTop: 10
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    paddingVertical: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: THEME.lightGrey,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: "center"
  },
  textBox: {
    paddingLeft: 10
  },
  cardTitle: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
  },
  cardDesc: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize:  FONT_SIZES.onetwo,
    marginTop: 3,
    width: METRICS.width - 130
    // width: '80%'
  },


});
