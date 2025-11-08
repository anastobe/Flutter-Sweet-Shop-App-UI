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
    isFetching
  } = useHomeViewModel();
  

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.title}>Great to See You,</Text>
        <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>{personal_customers?.first_name + " " + personal_customers?.last_name }</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={handleNavigateNotification} style={{ marginRight: 15 }}>
          <Icon name="notifications-outline" size={25} color={THEME.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateProfile} >
        <Image
          source={{
            uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTiahjx-m6ySbhuyQ7wbTQupWSjr0KW5DY38Cge23U_7bdxC8UC_gO9pWvIUHkZpQVNx2H-Q2fa4A1JVzJiLAGbQpdbNZ_Cf9sdMjhrRdZJOg',
          }}
          style={styles.avatar}
          />
          </TouchableOpacity>
      </View>
    </View>
  );

  console.log("selectedCurrency==>",selectedCurrency); 
  

const renderBalanceCard = () => (
  <View style={styles.balanceCard}>
    <View>

      {/* Top Row */}
      <View style={styles.balanceTop}>
        <Text style={styles.balanceLabel}>Available Balance</Text>

        {/* CURRENCY DROPDOWN BUTTON */}
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
      </View>
 
      {/* BALANCE VALUE */}
      {isFetching  ? 
        <View style={styles.indicatorLoaderBoc} >
          <ActivityIndicator size="small" color={THEME.primary} />
        </View>
         :
        <Text style={styles.availableBalance}>
        {selectedCurrency
          ? `${selectedCurrency.currency.iso_code} ${selectedCurrency.available_balance}`
          : "---"}
      </Text>}

      {/* DROPDOWN LIST */}
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
    <View style={{ zIndex: -9 }} >
    <CardFeatureButtons features={Sendoption} onPressbtn={(item: any) => handlePressCard(item)} />
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

  return (
    <MainContainer isFlatList barStyle="dark-content" mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
      {renderHeader()}
      {renderBalanceCard()}
      {/* {renderGraph()} */}
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
    width: screenWidth - 150,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
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
  borderRadius: 10,
  marginTop: 8,
  // height: 150,
  right: 0,
  top: 33,
  width: 100,
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
    backgroundColor: THEME.whitergba,
    borderRadius: 20,
    height: scale(84),
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 10
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
    width: 100,
    height: 30
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
    bottom: 25,
    left: 0
  },
  availableBalance: {
    fontSize: FONT_SIZES.threesix,
    fontFamily: FONTFAMILY.Light,
    marginTop: 0,
    color: THEME.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
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
