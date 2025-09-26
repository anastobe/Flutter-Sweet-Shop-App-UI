import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MainContainer } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA, PAYMENT_OPTION } from '../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../constants';

const MakePayment = () => {

  const navigation = useNavigation()

    function pressBackArrow() {
        navigation.goBack()
    }

    const renderItem = ({ item }) => {

    return (
      <TouchableOpacity onPress={()=>{ navigation.navigate(item.route) }} style={styles.item}>
        <View style={styles.avatar}>
          <Icon name={item.icon} size={30} color={THEME.lightred} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.currency}>{item.detailTxt}</Text>
        </View>
        <View style={{ transform: [{ rotate: '-45deg' }] }}>
          <Icon name="arrow-forward-outline" size={20} color="#cc66ff" />
        </View>
      </TouchableOpacity>
    );
  };

    function renderOptions() {
      return(
      <FlatList
        data={PAYMENT_OPTION}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      )
    }


      return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 20 }} >
      <Text style={styles.title}>Make a Payment</Text>
      <Text  style={styles.subtitle}>Send money locally or internationally, or transfer between your own accounts.</Text>
      {renderOptions()}

    </View>
    </MainContainer>
  )
}

export default MakePayment;

const styles = StyleSheet.create({
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 20,
    marginTop:10
  },
    subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginBottom: 20,
  },
  container: { flex: 1, backgroundColor: THEME.white  },

   item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.textPrimary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    // backgroundColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
  currency: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },

});
