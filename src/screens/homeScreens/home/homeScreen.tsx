// src/screens/Home/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../../config';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import LineGraph from '../../../components/lineGraph';
import AccountCard from '../../../components/accountCard';
import {useHomeViewModel} from '../../../viewModels/homeViewModel/home/usehomeScreenViewModel';

const HomeScreen = () => {
  const {
    Sendoption,
    DATA,
    CURRENT_ACCOUNT,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateTransactionHistory,
  } = useHomeViewModel();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.title}>Great to See You,</Text>
        <Text style={styles.titlesub}>Alex!</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={handleNavigateNotification} style={{ marginRight: 15 }}>
          <Icon name="notifications-outline" size={25} color={THEME.white} />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiahjx-m6ySbhuyQ7wbTQupWSjr0KW5DY38Cge23U_7bdxC8UC_gO9pWvIUHkZpQVNx2H-Q2fa4A1JVzJiLAGbQpdbNZ_Cf9sdMjhrRdZJOg',
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <View>
        <View style={styles.balanceTop}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <View style={styles.currencySelector}>
            <Text style={styles.currencyText}>Euro</Text>
            <Icon name="caret-down-outline" size={9} color={THEME.textPrimary} />
          </View>
        </View>
        <Text style={styles.availableBalance}>€29,309.91</Text>
      </View>
    </View>
  );

  const renderGraph = () => (
    <LineGraph
      labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      data={[10, 40, 20, 90, 75, 60, 100]}
      lineColor={THEME.white}
      bgColor={THEME.secondary}
    />
  );

  const renderCardFeature = () => (
    <CardFeatureButtons features={Sendoption} onPressbtn={(item: any) => handlePressCard(item)} />
  );

  const renderTransactionList = () => (
    <View>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTransactionTXT}>Activity</Text>
        <TouchableOpacity onPress={handleNavigateTransactionHistory}>
          <Text style={styles.viewAllTxt}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon name="cart-outline" size={16} color={THEME.textPrimary} />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subname}>19 July</Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      />
    </View>
  );

  return (
    <MainContainer isFlatList barStyle="dark-content" mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
      {renderHeader()}
      {renderBalanceCard()}
      {renderGraph()}
      {renderCardFeature()}
      {renderTransactionList()}
    </MainContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  logo: {
    width: METRICS.width,
    height: scale(25),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  titlesub: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  balanceCard: {
    backgroundColor: THEME.whitergba,
    borderRadius: 20,
    height: scale(84),
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  balanceTop: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  balanceLabel: { fontSize: FONT_SIZES.onesix, fontFamily: FONTFAMILY.Light, color: THEME.white },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.white,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  currencyText: {
    marginTop: -1,
    marginRight: 4,
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  availableBalance: {
    fontSize: FONT_SIZES.threesix,
    fontFamily: FONTFAMILY.Light,
    marginTop: 10,
    color: THEME.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardTransactionTXT: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  viewAllTxt: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: 35,
    height: 35,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginLeft: 10,
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10,
  },
  amount: {
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
  },
});
