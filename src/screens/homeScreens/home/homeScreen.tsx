// src/screens/Home/HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../../config';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import LineGraph from '../../../components/lineGraph';
import AccountCard from '../../../components/accountCard';
import {useHomeViewModel} from '../../../viewModels/homeViewModel/home/usehomeScreenViewModel';
import { screenWidth } from '../../../utils/style.utils';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { ActivityIndicator } from 'react-native';
import { CommonUtils } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'react-native';
import GradientLineGraph from '../../../components/gradientLineGraph';
import HomeCardFeatureButtons from '../../../components/homeCardFeatureButtons';
import Metrics from '../../../styles/metrics';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
// import * as Keychain from 'react-native-keychain';

const HomeScreen = () => {
  const {
    Sendoption,
    DATA,
    CURRENT_ACCOUNT,
    handlePressCard,
    handleNavigateNotification,
    handleNavigateProfile,
    handleNavigateTransactionHistory, 
    handleNavigateTransaction,
    loginUserData,
    personal_customers,
    getCurrencyAccount_DATA,
    showCurrencyDropdown, 
    setShowCurrencyDropdown,
    selectedCurrency, 
    setSelectedCurrency,
    assetsList, 
    setAssetsList,
    onSelectCurrency,
    isFetching,
    showbalance, 
    setshowbalance
  } = useHomeViewModel();

//   async function setToken() {

//   try {
//     // 'authToken' is the username key; token is stored as password
//     await Keychain.setGenericPassword('authToken', "checkingWord");
//     console.log('Token saved successfully!');
//   } catch (error) {
//     console.log('Error saving token:', error);
//   }

// }
// setToken()
  

  const renderHeader = () => (
    <View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 20 }} >
      <View style={{marginTop: 60}} >
        <Text style={styles.title}>Great to See You,</Text>
        <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>{personal_customers?.first_name + " " + personal_customers?.last_name }</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity  style={styles.titlePicNotification} onPress={handleNavigateNotification}>
          <Icon name="notifications-outline" size={18} color={THEME.textPrimary} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.titlePicBack} onPress={handleNavigateProfile} >
          <Text style={styles.titlePic}>
           {CommonUtils.getInitials(personal_customers?.first_name + " " + personal_customers?.last_name)}
          </Text>
          </TouchableOpacity>
      </View>

      </View>
    </View>
  );

  

const renderBalanceCard = () => (
  <View style={styles.balanceCard}>


      {/* BALANCE VALUE */}
      {isFetching ?
        <View style={styles.indicatorLoaderBoc} >
          <ActivityIndicator size="small" color={THEME.primary} />
        </View>
        :
      <>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", height: 50 }} >
        {showbalance ? 
        <Text style={styles.total}>{selectedCurrency?.currency?.iso_code} {selectedCurrency?.available_balance}</Text> 
        : 
        <Text style={styles.total}>**********</Text> 
        }
          <TouchableOpacity style={{  alignItems: "center", justifyContent: "center",height: 50 }} onPress={()=>setshowbalance(!showbalance)} >
        <Icon name={showbalance ? "eye-outline" : "eye-off" } style={{ top: 2 }} size={20} color={THEME.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceTop}>
          <Text style={styles.balanceLabel}>Total Balance</Text>

          <Pressable
            style={styles.currencySelector}
            onPress={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          >
            <Text style={styles.currencyText}>
              {selectedCurrency?.currency?.iso_code || "---"}
            </Text>
            <Icon 
              name={showCurrencyDropdown ? "caret-up-outline" : "caret-down-outline"} 
              size={9} 
              color={THEME.textPrimary} 
            />
          </Pressable>

      {showCurrencyDropdown && (
        <View style={styles.dropdownContainer}>
          <FlatList
            nestedScrollEnabled
            bounces={false}
            data={getCurrencyAccount_DATA?.results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.dropdownItem}
                onPress={() => onSelectCurrency(item)}
              >
                <Text style={styles.dropdownItemText}>
                  {item.currency.iso_code} 
                  {/* — {item.available_balance} */}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}

        </View>
      </>
      }


    
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
    <View style={{ zIndex: -9, marginBottom: 35 }} >
    <HomeCardFeatureButtons features={Sendoption} onPressbtn={(item: any) => handlePressCard(item)} />
    </View>
  );

  const renderTransactionList = () => (
    <View style={{ zIndex: -9 }} >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTransactionTXT}>Activity  ({"DUMMY DATA-" + SHOW_CLIENT})</Text>
        <TouchableOpacity onPress={handleNavigateTransactionHistory}>
          <Text style={styles.viewAllTxt}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleNavigateTransaction} style={styles.item}>
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon name={item.id == 2 ?"arrow-back-outline" : "arrow-forward-outline"} size={16} color={THEME.textPrimary} />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subname}>19 July</Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      />
    </View>
  );

  function renderHeaderStuffs() {
    return(
      <ImageBackground
          imageStyle={styles.botmRadius}
          style={styles.headerContainer}
          source={Images.checking2}
          resizeMode="stretch"
          >
          {renderHeader()}
          {renderBalanceCard()}          
        </ImageBackground>
    )
  }
 
  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={"#7c4fc3"} />
       {renderHeaderStuffs()}

         <ScrollView contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}>
          <GradientLineGraph marginTop={20} />
          {renderCardFeature()}
          {renderTransactionList()}
         </ScrollView>
       
      </SafeAreaView>
    </ImageBackground>

    /* <MainContainer isFlatList barStyle="dark-content" mainContainerStyle={styles.container}>
        <LinearGradient
          colors={["#6B3FA0", "#3A2670", "#0C1445"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
      <StatusBar translucent backgroundColor={THEME.secondary} />
      <SafeAreaView style={{flex: 1}}>
          {renderHeader()}
          {renderBalanceCard()}
      </SafeAreaView>
        </LinearGradient>

      <GradientLineGraph marginTop={20} />

      {renderCardFeature()}
      {renderTransactionList()}
    </MainContainer> */
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1},
  headerContainer: {
    height: Metrics.halfScreen - 40,
    width: Metrics.width,
    // backgroundColor: "red",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // position: 'absolute'
  },
  botmRadius:{
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
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
  titlePicBack: {
    justifyContent: "center", alignItems: "center", width: scale(29),height: scale(29), backgroundColor: THEME.whitergba, borderRadius: 100
  },
  titlePicNotification:{
    justifyContent: "center", backgroundColor: THEME.white, alignItems: "center", width: scale(28),height: scale(28), marginRight: 8, borderRadius: 100
  },
  titlePic: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,

  },
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  titlesub: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
    width: screenWidth - 150,
  },
  headerContainerParent:{
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  headerContainer: {
        height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30

    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 20,
    // marginTop: 20,
  },
  headerRight: { flexDirection: 'row', marginTop: 15,  height: 50, alignItems: "center" },
//   dropdownContainer: {
//   backgroundColor: THEME.white,
//   borderRadius: 10,
//   marginTop: 8,
  
//   maxHeight: 180,
//   overflow: "hidden",
// },

  dropdownContainer: {
  position: "absolute",
  zIndex: 9999,
  backgroundColor: THEME.white,
  borderRadius: 6,
  marginTop: 0,
  // height: 150,
  right: 0,
  top: 28,
  width: 70,
  // maxHeight: 150,
  // overflow: "hidden",
},

dropdownItem: {
  // paddingVertical: 10,
  // paddingHorizontal: 12,
  borderBottomWidth: 0.5,
  justifyContent: "center",
  paddingLeft:10,
  // borderBottomColor: THEME.white,
  height: 32
},

dropdownItemText: {
  color: THEME.textPrimary,
  fontSize: FONT_SIZES.onefour,
  fontFamily: FONTFAMILY.Medium,
},

  balanceCard: {
// backgroundColor: "blue",

    borderRadius: 20,
    height: scale(84),
    // paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 30,
    // flexDirection: 'row',
    alignItems:"center",
    justifyContent: "center",
    marginBottom: 10
  },
  balanceTop: { flexDirection: 'row', alignItems: 'center', marginTop: 8,  },
  balanceLabel: { fontSize: FONT_SIZES.onefour, fontFamily: FONTFAMILY.Medium, color: THEME.white },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.white,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
    width: 70,
    height: 25
  },
  currencyText: {
    // marginTop: -1,
    marginRight: 4,
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  indicatorLoaderBoc:{
    position: "absolute",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  availableBalance: {
    fontSize: FONT_SIZES.threesix,
    fontFamily: FONTFAMILY.Light,
    marginTop: 0,
    color: THEME.primary,
    textAlign: "center"
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  cardTransactionTXT: {
    fontSize: FONT_SIZES.oneone,
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
    width: 25,
    height: 25,
    backgroundColor: THEME.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: 10,
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: 10,
  },
    total: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Bold,
    color: THEME.white,
    textAlign: "center",
    marginRight: 10
  },
  amount: {
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
});
