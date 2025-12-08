import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer } from '../../../../components';
import TransactionFilter from '../../../../components/bottomSheet/transactionFilter';
import InputField from '../../../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import useTransactionHistoryViewModel from '../../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
import Metrics from '../../../../styles/metrics';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../../constants';
import StatusBarManager from '../../../../components/statusBarManager';

export default function Request() {
  const {
    DATA,
    REQUEST_DATA,
    cardName,
    onSearch,
    cardDetailRef,
    pressBackArrow,
    closeFilterSheet
  } = useTransactionHistoryViewModel();

  const navigation = useNavigation()

  function renderFilter() {
    return (
        <InputField
          removeTitle={true}
          textInputStyle={styles.innerinput}
          imgViewLeft={styles.imgViewLeft}
          imageLeft={'search-outline'}
          imagetintColorLeft={THEME.white}
          // image={'search-outline'}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Search"
          value={cardName}
          onChangeText={onSearch}
          keyboardType={'default'}
          imagetintColor={THEME.white}
          customInpStyle={styles.innerinput}
        />
    );
  }

  function handleonPress(item: any) {
    if (item.type == "payment") {
      navigation.navigate(HOME_ROUTES.ADMIN_PAYMENT_STATUS)      
    } else if (item.type == "beneficiary") {
      navigation.navigate(HOME_ROUTES.ADMIN_BENEFICIAY_STATUS)      
    } else if (item.type == "cardcreated") {
      navigation.navigate(HOME_ROUTES.ADMIN_CARD_STATUS)      
    }
  }

  function renderTransactions() {
    return (
      <FlatList
        data={REQUEST_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{ handleonPress(item) }} style={styles.item}>
            <View style={styles.iconCONTContainer}>
              <View style={styles.iconCONT}>
                <Icon name={item.icon} size={16} color={THEME.textPrimary} />
              </View>
            </View>

            <View style={styles.rightSide}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.txt16}>{item.title}</Text>
                <Text style={styles.txt13}>{item.status}</Text>
              </View>

              <View>
                <Text style={styles.midTxt}>{item.message}</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Text style={styles.txt10}>{item.date}</Text>
                <Text style={styles.txt10}>By: {item.by}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 140, marginTop: 10 }}
      />
    );
  }

  return (
    <MainContainer
      refreshingeffect={false}
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Request</Text>
        {renderFilter()}
        {renderTransactions()}

        <BottomSheet
          height={500}              // minimum height
          maxHeightPercent={0.6}   // optional, override for screen
          draggable={false}
          openTime={500} 
          closeDuration={500}
          bottomSheetRef={cardDetailRef}
        >
          <TransactionFilter style={{ marginHorizontal: 20 }} onPress={closeFilterSheet} />
        </BottomSheet>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  filtersearchContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 10,
  },
  // innerinput: { paddingLeft: 50, height: 45 },
  item: {
    backgroundColor: "#252c57",
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 10,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  rightSide: {
    width: '80%',
    padding: 10
  },
  iconCONTContainer:{
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
iconCONT:{
          width: 40,
          height: 40,
          backgroundColor: THEME.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
  },name: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  txt13: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  txt10: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  txt16:{
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  midTxt:{
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginVertical: 5,
    lineHeight: 16,
    width: '80%'
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  amount: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
    innerinput: 
    {  
      height: 56,
      paddingLeft: 20,   //calculated value 
      fontFamily: FONTFAMILY.Regular,
      fontSize: FONT_SIZES.onefour, 
      color: THEME.white,
      justifyContent: "center"
    },
    imgViewLeft: {
    width: 35,
    height: 56,
    position: 'absolute',
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    zIndex: 9999,
  },

});
