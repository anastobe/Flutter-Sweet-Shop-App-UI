import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { MainContainer } from '../../../components';
import { Images } from '../../../config';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';
import Metrics from '../../../styles/metrics';
import { screenWidth } from '../../../utils/style.utils';
import { Accounts, ACTIVE_ACCOUNT, CURRENT_ACCOUNT, DATA } from '../../../utils/data';
import AccountCard from '../../../components/accountCard';
import { useDispatch } from 'react-redux';
import { storeUserToken } from '../../../Redux/Action/Auth/AuthActions';
import AccountCardzoom from '../../../components/accountCardzoom';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import { SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';

const HomeScreen = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const Sendoption = [
    { icon: 'add-outline', onPress: () => console.log("new acount"), text: "New Account" },
    { icon: 'cash-outline', onPress: () => console.log("Add Fund"), text: "Add Fund" },
    { icon: 'wallet-outline', onPress: () => navigation.navigate(HOME_ROUTES.MAKE_PAYMENT) , text: "Send Money" }
  ]

  function Logout() {
       navigation.navigate(HOME_ROUTES.NOTIFICATION)   
  }

  function renderHeader() {
    return(
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20 }} >
        <View>
              <Text style={styles.title}>Great to See You,</Text>
              <Text style={styles.titlesub}>Alex!</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }} >
             <TouchableOpacity onPress={Logout} style={{ marginRight: 15 }} >
               <Icon name={"notifications-outline"} size={25} color={THEME.green} />
             </TouchableOpacity>
             <Image source={{ uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiahjx-m6ySbhuyQ7wbTQupWSjr0KW5DY38Cge23U_7bdxC8UC_gO9pWvIUHkZpQVNx2H-Q2fa4A1JVzJiLAGbQpdbNZ_Cf9sdMjhrRdZJOg" }} style={styles.avatar} />
        </View>
      </View>
    )
  }

  function avalableBalance() {
    return(
        <View style={styles.balanceCard}>
        
        <View>
        <View style={styles.balanceTop}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <View style={styles.currencySelector}>
            <Text style={styles.currencyText}>Euro</Text>
            <Icon name="caret-down-outline" size={9} color="#5F6368" /> 
          </View>
        </View>
        <Text style={styles.availableBalance}>€29,309.91</Text>
        </View>

    {/* <LineChart
      data={data}
      width={100}
      height={scale(84)}
      chartConfig={chartConfig}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      withInnerLines={false}
      bezier
      style={{ backgroundColor: THEME.textPrimary, }}
    /> */}

      </View>
    )
  }

  function onPressCard() {
        navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL)
  }

const SlidingCards = () => {
  return (
      <FlatList
        data={CURRENT_ACCOUNT}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => <AccountCardzoom onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index} containerStyle={{ marginVertical: 10 }} />}
      />
  );
};

function renderCardFeature() {
  
  return(
    <CardFeatureButtons features={Sendoption} onPressbtn={(item: any)=>{  navigation.navigate(HOME_ROUTES.MAKE_PAYMENT)  }}  />
  )
}

const TransactionList = () => {
  return (
    <View>
      <View style={styles.cardHeadr} >
        <Text style={styles.cardTransactinTXT} >Card Transactions</Text>
        <TouchableOpacity onPress={()=>{ navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY) }} >
          <Text style={styles.viewAllTxt} >View All</Text>
        </TouchableOpacity>
      </View>
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft} >            
            <View style={styles.iconCONT} >
               <Icon name={"cart-outline"} size={25} color={THEME.white} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    </View>
  );
};

  return(
    <MainContainer isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
       <Image source={Images.logo} style={styles.logo} />
       {renderHeader()}
       {avalableBalance()}
       {SlidingCards()}
       {renderCardFeature()}
       {TransactionList()}

    </MainContainer>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.white },
  logo: {
    width: METRICS.width,
    height: scale(25),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 20
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'contain',
    borderRadius: 100
  },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix  
  },
  titlesub:{
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
  },




  
  balanceCard: {
    backgroundColor: THEME.textPrimary,
    borderRadius: 20,
    height: scale(84),
    width: screenWidth - 40,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row"
  },
  balanceTop: { flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginTop: 8 },
  balanceLabel: {  fontSize: FONT_SIZES.onesix, fontFamily: FONTFAMILY.Light, color: THEME.white },
  currencySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.darkOffWhite, borderRadius: 5, justifyContent: "center", marginLeft: 10, paddingHorizontal: 10 },
  currencyText: { marginRight: 4,fontSize: FONT_SIZES.onefour, fontFamily: FONTFAMILY.Medium, color: THEME.white  },
  availableBalance: { fontSize: FONT_SIZES.threesix, fontFamily: FONTFAMILY.Light, marginTop: 10, color: THEME.primary },
  chartPlaceholder: {
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 8,
  },




     screenTitle: {
    color: THEME.primary,
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light
  },



    header: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5
  },
  item: {
    borderWidth: 1,
    borderColor: THEME.lightGrey,
    borderRadius: 10,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10
  },
  sectionLeft:
  { flexDirection: "row", alignItems: "center" },
  iconCONT:
  { width: 36, height: 36, backgroundColor: THEME.darkOffWhite, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  name: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10
  },
  amount: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary
  },



  cardHeadr: 
  { flexDirection: 'row',justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 },
  cardTransactinTXT:
  { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.white },
  viewAllTxt:
  { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.prinkishBlue },

});
