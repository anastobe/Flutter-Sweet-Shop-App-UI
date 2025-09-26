import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { MainContainer } from '../../../components';
import Images from '../../../config/images';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Accounts, ACTIVE_ACCOUNT } from '../../../utils/data';
import AccountCard from '../../../components/accountCard';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCardzoom from '../../../components/accountCardzoom';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';

const AccountScreen = () => {

  const navigation = useNavigation()

  function onPressCard() {
    navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL)
  }

  type Props = {
    onPress: any
  }

const NewAccountCard: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={['#C8FAFF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <Icon name="add" size={20} color="#A855F7" />
          <Text style={styles.text}>New Account</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const renderCardStyle = () => {
  return (
      <FlatList
        data={ACTIVE_ACCOUNT}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        ListFooterComponent={NewAccountCard}
        contentContainerStyle={{ paddingBottom: 130, }}
        renderItem={({ item, index }) => <AccountCardzoom onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index} containerStyle={{ marginVertical: 10 }} />}
      />
  );
};

  return(
    <MainContainer isFlatList={false} barStyle="dark-content"  mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.title}>Accounts</Text>
      {renderCardStyle()}

    </MainContainer>
    )
  }

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  logo: {
    width: METRICS.width,
    height: scale(25),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 20
  },
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginTop:10,
    marginLeft: 20
  },

  card: {
    width: METRICS.width - 40,
    height: 174,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME.gray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 4,
    fontSize: FONT_SIZES.onefour,
    color: THEME.prinkishBlue,
    fontFamily: FONTFAMILY.Medium
  },
});