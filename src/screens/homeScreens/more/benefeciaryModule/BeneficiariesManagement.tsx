import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MainContainer } from '../../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../../constants';
import LinearGradient from 'react-native-linear-gradient';

const BeneficiariesManagement = () => {

  const navigation = useNavigation()

    function pressBackArrow() {
        navigation.goBack()
    }

    const renderItem = ({ item }) => {
    const initials = item.name
      .split(' ')
      .map((n: any )=> n[0])
      .join('');

    return (
      <TouchableOpacity onPress={()=>{ navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY) }}>
      <LinearGradient
        colors={["#433c71ff", "#2c2d5e", "#272d5a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.item}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.currency}>{item.currency}</Text>
        </View>
        <View style={{ transform: [{ rotate: '-45deg' }] }}>
          <Icon name="arrow-forward-outline" size={20} color={THEME.white} />
        </View>
      </LinearGradient>
      </TouchableOpacity>
    );
  };

    function renderOptions() {
      return(
      <FlatList
        data={BENEFICIARY_MANAGEMENT_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      )
    }
    
    function pressRightArrow() {
      navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)      
    }

      return(
    <MainContainer pressRightArrow={pressRightArrow} showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 20 }} >
      <Text style={styles.title}>Beneficiaries</Text>
      <Text  style={styles.subtitle}>Manage your saved recipients for faster and easier payments.</Text>
      {renderOptions()}

    </View>
    </MainContainer>
  )
}

export default BeneficiariesManagement;

const styles = StyleSheet.create({
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
  },
  subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 50
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
    backgroundColor: THEME.white,
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
