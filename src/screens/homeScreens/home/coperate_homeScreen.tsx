// src/screens/Home/Coperate_homeScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable, RefreshControl, ScrollView } from 'react-native';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../../config';
import {useCoperate_homeScreenViewModel} from '../../../viewModels/homeViewModel/home/useCoperate_homeScreenViewModel';
import { screenWidth } from '../../../utils/style.utils';
import { CommonUtils } from '../../../utils';
import Metrics from '../../../styles/metrics';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import CoperatehomeCardFeatureButtons from '../../../components/coperatehomeCardFeatureButtons';
// import * as Keychain from 'react-native-keychain';

const Coperate_homeScreen = () => {
  const {
    userData,
    SendoptionCorporate,
    handlePressCard,
    onRefresh,
    refreshing, 
    setRefreshing,
    handleNavigateNotification,
    handleNavigateProfile,
  } = useCoperate_homeScreenViewModel();

  const renderHeader = () => (
    <View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: handleSize.w(20), }} >
      <View style={{marginTop: handleSize.f(70), }} >
        <Text style={styles.title}>Great to see you,</Text>
        {/* <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>{personal_customers?.first_name || "" + " " + personal_customers?.last_name || "" }</Text> */}

        <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>{`${userData?.first_name + " " + userData?.last_name }`}</Text>


                {/* <Text 
        numberOfLines={1} ellipsizeMode="tail"
        style={styles.titlesub}>Alex!</Text> */}
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity  style={styles.titlePicNotification} onPress={handleNavigateNotification}>
          <Icon name="notifications-outline" size={handleSize.f(18)} color={THEME.textPrimary} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.titlePicBack} onPress={handleNavigateProfile} >
          <Text style={styles.titlePic}>
           {CommonUtils.getInitials(`${userData?.first_name + " " + userData?.last_name }`)}
          </Text>
          </TouchableOpacity>
      </View>

      </View>
    </View>
  );


  const renderCardFeature = () => (
    <View 
    // style={{ marginBottom: handleSize.f(25) }} 
    >
    <CoperatehomeCardFeatureButtons  features={SendoptionCorporate} onPressbtn={(item: any) => handlePressCard(item)} />
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
        </ImageBackground>
    )
  }

 
  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <View style={styles.topColorBlend} />
      <StatusBarManager
        backgroundColor={THEME.gradientStatusBarColor} 
        barStyle="light-content" 
      />
      <SafeAreaView edges={['top']} style={styles.container}>
       {renderHeaderStuffs()}
        <ScrollView 
          refreshControl={(
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )}
        contentContainerStyle={{ marginTop: handleSize.h(10) }}>
        {renderCardFeature()}
       </ScrollView>

       
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Coperate_homeScreen;


const styles = StyleSheet.create({
  container: { flex: 1 },
    topColorBlend:
  { height: handleSize.f(150), width: Metrics.width , backgroundColor: THEME.gradientStatusBarColor, position: "absolute", top: 0 },
  headerContainer: {
    height: handleSize.f(180),
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
    width: handleSize.f(29),
    height: handleSize.f(29),
    backgroundColor: THEME.whitergba,
    borderRadius: handleSize.f(100),
  },

  titlePicNotification: {
    justifyContent: 'center',
    alignItems: 'center',
    width: handleSize.f(28),
    height: handleSize.f(28),
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
    width: screenWidth - handleSize.f(140),
    marginTop: handleSize.f(8),
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
    // borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingLeft: handleSize.w(10),
    height: handleSize.h(40),
    // backgroundColor: "red"
  },

  dropdownItemText: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
  },

  balanceCard: {
    borderRadius: handleSize.f(20),
    height: handleSize.f(84),
    marginHorizontal: handleSize.w(20),
    marginTop: handleSize.f(25),
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
    width: handleSize.w(160),
    height: handleSize.f(100),
    paddingLeft: handleSize.f(10),
    // paddingVertical: handleSize.f(10),
    marginRight: handleSize.f(14),
    borderRadius: handleSize.f(16),
    justifyContent: 'center',
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
    marginTop: handleSize.f(7),
  },

  balanceTxt: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.f(8),
  },
  

  sheetTitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.h(16),
    color: THEME.white
  },
    separator: {
    height: handleSize.h(0.6),
    color: THEME.white,
    backgroundColor: THEME.white
    
  },

  accountName: {
    fontSize: handleSize.h(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,

  },
  
  noAccCont:{
   width: Metrics.width, justifyContent: 'center'
  },
  noAccountTxt:
{  color: THEME.white, alignSelf: "center", fontSize: FONT_SIZES.onesix, fontFamily: FONTFAMILY.Regular, marginTop: handleSize.h(50) }


});