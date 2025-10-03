import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { InputDropDownStyle, MainContainer } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA, PAYMENT_OPTION } from '../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../constants';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import { Images } from '../../../config';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';

const notifications = [
  { id: "1", type: "credit", message: "You received £250.00 from John", time: "2 min ago" },
  { id: "2", type: "debit", message: "You sent £100.00 to Sarah", time: "10 min ago" },
  { id: "3", type: "failed", message: "Transaction of £50.00 failed", time: "1 hr ago" },
  { id: "4", type: "credit", message: "Salary credited £1,200.00", time: "Yesterday" },
    { id: "5", type: "credit", message: "You received £250.00 from John", time: "2 min ago" },
  { id: "6", type: "debit", message: "You sent £100.00 to Sarah", time: "10 min ago" },
  { id: "7", type: "failed", message: "Transaction of £50.00 failed", time: "1 hr ago" },
  { id: "8", type: "credit", message: "Salary credited £1,200.00", time: "Yesterday" },
    { id: "9", type: "credit", message: "You received £250.00 from John", time: "2 min ago" },
  { id: "10", type: "debit", message: "You sent £100.00 to Sarah", time: "10 min ago" },
  { id: "11", type: "failed", message: "Transaction of £50.00 failed", time: "1 hr ago" },
  { id: "12", type: "credit", message: "Salary credited £1,200.00", time: "Yesterday" },
    { id: "13", type: "credit", message: "You received £250.00 from John", time: "2 min ago" },
  { id: "14", type: "debit", message: "You sent £100.00 to Sarah", time: "10 min ago" },
  { id: "15", type: "failed", message: "Transaction of £50.00 failed", time: "1 hr ago" },
  { id: "16", type: "credit", message: "Salary credited £1,200.00", time: "Yesterday" },
    { id: "17", type: "credit", message: "You received £250.00 from John", time: "2 min ago" },
  { id: "18", type: "debit", message: "You sent £100.00 to Sarah", time: "10 min ago" },
  { id: "19", type: "failed", message: "Transaction of £50.00 failed", time: "1 hr ago" },
  { id: "20", type: "credit", message: "Salary credited £1,200.00", time: "Yesterday" },
];

const Notification = () => {

  const navigation = useNavigation();

    function pressBackArrow() {
        navigation.goBack()
    }

    const renderItem = ({ item } : {item: any}) => {
    let icon = "alert-circle-outline";
    let color = "#888";

    if (item.type === "credit") {
      icon = "arrow-down-circle-outline";
      color = "green";
    } else if (item.type === "debit") {
      icon = "arrow-up-circle-outline";
      color = "red";
    } else if (item.type === "failed") {
      icon = "close-circle-outline";
      color = "orange";
    }

    return (
      <View style={styles.notificationBox}>
        <Icon name={icon} size={24} color={color} style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  };

   return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <ScrollView contentContainerStyle={{paddingBottom: 100 }} >
      <View style={{ marginHorizontal: 20 }} >

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      </View>
    </ScrollView>
    </MainContainer>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
  },
  notificationBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: THEME.whitergba,
    borderRadius: 10,
  },
  message: {
    fontSize: 14,
    color: THEME.white,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    color: THEME.white,
    marginTop: 4,
  },
  separator: {
    height: 10,
  },


});
