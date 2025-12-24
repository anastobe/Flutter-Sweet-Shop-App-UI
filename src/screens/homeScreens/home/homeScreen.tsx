// src/screens/Home/HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../../config';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
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
import { cardsScroll } from '../../../utils/data';
import { useIsFocused } from '@react-navigation/native';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import commonUtils from '../../../utils/common.utils';
import SmallBtn from '../../../components/smallBtn';
import TransactionList from '../../../components/transactionList';
import { HOME_ROUTES } from '../../../constants';
import { LoaderOnly } from '../../../components/activityIndicator';
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
    // getCurrencyAccount_DATA,
    showCurrencyDropdown, 
    setShowCurrencyDropdown,
    // selectedCurrency, 
    // setSelectedCurrency,
    assetsList, 
    setAssetsList,
    onSelectCurrency,
    loader,
    showbalance, 
    setshowbalance,
    transactions,
    isPendingpaymentHistry,
    navigation,
    getDashboardData_Data,
    getDashboardDataPending,
    cards,
    isPendingfetchLinkedAccCards,

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
      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: handleSize.w(20), }} >
      <View style={{marginTop: handleSize.h(20), }} >
        <Text style={styles.title}>Great to See You,</Text>
        {/* <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>{personal_customers?.first_name || "" + " " + personal_customers?.last_name || "" }</Text> */}
                <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>Alex!</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity  style={styles.titlePicNotification} onPress={handleNavigateNotification}>
          <Icon name="notifications-outline" size={handleSize.f(18)} color={THEME.textPrimary} />
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
      {loader ?
        <View style={styles.indicatorLoaderBoc} >
          <ActivityIndicator size="small" color={THEME.primary} />
        </View>
        :
      <>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", height: handleSize.h(50) }} >
        {showbalance ? 
        <Text style={styles.total}>{assetsList?.firstObject?.currency?.iso_code} {assetsList?.firstObject?.available_balance}</Text> 
        : 
        <Text style={styles.total}>**********</Text> 
        }
          <TouchableOpacity style={{  alignItems: "center", justifyContent: "center",height: handleSize.h(50) }} onPress={()=>setshowbalance(!showbalance)} >
        <Icon name={showbalance ? "eye-outline" : "eye-off" } style={{ top: handleSize.h(2) }} size={handleSize.f(20)} color={THEME.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceTop}>
          <Text style={styles.balanceLabel}>Total Balance</Text>

          <Pressable
            style={styles.currencySelector}
            onPress={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          >
            <Text style={styles.currencyText}>
              {assetsList?.firstObject?.currency?.iso_code || "---"}
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
            data={assetsList?.array}
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


  // const renderGraph = () => (
  //   <LineGraph
  //     labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  //     data={[10, 40, 20, 90, 75, 60, 100]}
  //     lineColor={THEME.white}
  //     bgColor={THEME.secondary}
  //   />
  // );

  const renderCardFeature = () => (
    <View style={{ zIndex: -9, marginBottom: handleSize.h(35) }} >
    <HomeCardFeatureButtons  features={Sendoption} onPressbtn={(item: any) => handlePressCard(item)} />
    </View>
  );

  
  /** 🔹 Transaction Item */
  const renderItem = ({ item }) => (
    <TransactionList
      item={item}
      onPress={()=>{
        navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
      }}
    />
  );

  // console.log(isPendingpaymentHistry,"transactions==>",transactions);

  const renderTransactionList = () => (
    <View style={{ zIndex: -9 }} >
      <FlatList
        data={isPendingpaymentHistry ? [] : transactions}
        keyExtractor={item => item?.id}
        /** 🔹 Initial Loader */
        ListEmptyComponent={
           isPendingpaymentHistry ? (
            <View style={{ marginTop: handleSize.h(40) }}>
              <ActivityIndicator size="large" color={THEME.primary} />
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: THEME.white }}>
              No Transactions Found
            </Text>
          )
        }
        /** 🔹 Footer Loader (Pagination) */
        ListFooterComponent={
          transactions?.length < commonUtils.MAX_LENGTH_10 ? null : (
            <SmallBtn
              title="Show More"
              onPress={handleNavigateTransactionHistory}
            />
          )
        }
        // onEndReachedThreshold={0.1}
        // onEndReached={loadMoreTransactions}

        ListHeaderComponent={renderSubHeaderStuffs}
        nestedScrollEnabled
        renderItem={renderItem}
        contentContainerStyle={{  paddingBottom: handleSize.h(50) }}
      />
    </View>
  );

  
  function renderSubHeaderStuffs() {
    return(
      <View>
          <GradientLineGraph 
                data={getDashboardData_Data?.graph}
                loading={getDashboardDataPending}
                marginTop={handleSize.h(25)} 
          />
          {ScrollableCards()}
          {renderCardFeature()}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTransactionTXT}>Activity</Text>
            <TouchableOpacity onPress={handleNavigateTransactionHistory}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }


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

  
  console.log("card_name======>",cards);
  
 

const ScrollableCards = () => {
  return (
    <FlatList
      data={cards}
      // data={[]}
      ListEmptyComponent={()=>{
        if (isPendingfetchLinkedAccCards) {
          return(
             <View style={{ width: Metrics.width, alignItems: "center" }} >
              <LoaderOnly />
             </View>
          )
        }
        else{
          return(
            <View style={{ width: Metrics.width, alignItems: "center" }} >
            <Text style={styles.noCards} >No Cards Found</Text>
            </View>
          )
      }}
    }
      keyExtractor={(item) => item?.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: handleSize.w(16), marginTop: handleSize.h(10) }}
      renderItem={({ item }) => (
        <LinearGradient
          colors={['#0d1133', '#0a0f2b']}
          style={styles.card}
        >
          <Text style={styles.lastDigits}>..... {item?.pan}</Text>
          <Text style={styles.amountt}>{item?.available_limit}</Text>
          <Text style={styles.balanceTxt}>Balance</Text>
        </LinearGradient>
      )}
    />
  );
};
 
  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <SafeAreaView style={styles.container}>
       {renderHeaderStuffs()}

      <StatusBarManager
        backgroundColor={THEME.gradientStatusBarColor} 
        barStyle="light-content" 
      />

         <ScrollView contentContainerStyle={{ marginTop: handleSize.h(10) }}>
          {renderTransactionList()}
         </ScrollView>
       
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: { flex: 1 },

  headerContainer: {
    height: handleSize.h(230),
    width: Metrics.width,
    borderBottomLeftRadius: handleSize.f(30),
    borderBottomRightRadius: handleSize.f(30),
    zIndex: 999,
  },

  botmRadius: {
    borderBottomLeftRadius: handleSize.f(30),
    borderBottomRightRadius: handleSize.f(30),
  },

  logo: {
    width: Metrics.width,
    height: handleSize.h(25),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: handleSize.h(20),
  },

  avatar: {
    width: handleSize.h(48),
    height: handleSize.h(48),
    resizeMode: 'contain',
    borderRadius: handleSize.f(100),
  },

  titlePicBack: {
    justifyContent: 'center',
    alignItems: 'center',
    width: handleSize.w(29),
    height: handleSize.h(29),
    backgroundColor: THEME.whitergba,
    borderRadius: handleSize.f(100),
  },

  titlePicNotification: {
    justifyContent: 'center',
    alignItems: 'center',
    width: handleSize.w(28),
    height: handleSize.h(28),
    marginRight: handleSize.w(8),
    backgroundColor: THEME.white,
    borderRadius: handleSize.f(100),
  },

  titlePic: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
  },

  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
  },

  titlesub: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.white,
    width: screenWidth - handleSize.w(160),
  },

  headerContainerParent: {
    height: handleSize.h(300),
    borderBottomLeftRadius: handleSize.f(30),
    borderBottomRightRadius: handleSize.f(30),
  },

  headerRight: {
    flexDirection: 'row',
    marginTop: handleSize.h(15),
    height: handleSize.h(60),
    alignItems: 'center',
  },

  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: THEME.white,
    borderRadius: handleSize.f(6),
    marginTop: 0,
    right: 0,
    top: handleSize.h(28),
    width: handleSize.w(70),
    
    maxHeight: handleSize.h(200), // ✅ IMPORTANT
    overflow: 'hidden',           // ✅ IMPORTANT (Android ke liye)

  },

  dropdownItem: {
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingLeft: handleSize.w(10),
    height: handleSize.h(32),
  },

  dropdownItemText: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
  },

  balanceCard: {
    borderRadius: handleSize.f(20),
    height: handleSize.h(84),
    marginHorizontal: handleSize.w(20),
    marginTop: handleSize.h(25),
    marginBottom: handleSize.h(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  balanceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: handleSize.h(8),
  },

  balanceLabel: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.white,
    borderRadius: handleSize.f(5),
    justifyContent: 'center',
    marginLeft: handleSize.w(10),
    width: handleSize.w(70),
    height: handleSize.h(30),
  },

  currencyText: {
    marginRight: handleSize.w(4),
    fontSize: handleSize.f(FONT_SIZES.onefour),
    lineHeight: handleSize.h(14),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  indicatorLoaderBoc: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  availableBalance: {
    fontSize: handleSize.f(FONT_SIZES.threesix),
    fontFamily: FONTFAMILY.Light,
    marginTop: 0,
    color: THEME.primary,
    textAlign: 'center',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: handleSize.w(20),
    marginTop: handleSize.h(10),
  },

  cardTransactionTXT: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  viewAllTxt: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: handleSize.w(9),
    paddingVertical: handleSize.h(3),
    borderRadius: handleSize.f(10),
  },

  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.f(10),
    height: handleSize.h(68),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: handleSize.w(10),
    marginTop: handleSize.h(10),
  },

  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCONT: {
    width: handleSize.w(25),
    height: handleSize.h(25),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  subname: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  total: {
    fontSize: handleSize.f(FONT_SIZES.threezero),
    fontFamily: FONTFAMILY.Bold,
    color: THEME.white,
    textAlign: 'center',
    marginRight: handleSize.w(10),
  },

  amount: {
   fontSize: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },

  card: {
    width: Metrics.width * 0.44,
    padding: handleSize.w(16),
    marginRight: handleSize.w(14),
    borderRadius: handleSize.f(16),
    justifyContent: 'space-between',
  },

  lastDigits: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Medium,
  },

  noCards: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center"
  },

  amountt: {
    color: THEME.white,
   fontSize: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.h(6),
  },

  balanceTxt: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.h(4),
  },
});