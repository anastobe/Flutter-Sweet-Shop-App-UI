import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MainContainer, BottomSheet } from '../../../components';
import { THEME, FONT_SIZES, FONTFAMILY } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import { scale } from 'react-native-size-matters';
import { useAccountStatementViewModel } from '../../../viewModels/homeViewModel/account/useAccountStatementViewModel';
import Metrics from '../../../styles/metrics';
import { DATA_STATEMENT } from '../../../utils/data';
import { screenWidth } from '../../../utils/style.utils';
import { Images } from '../../../config';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme'; 

const AccountStatement = () => {
  const {
    cardDetailRef,
    cardName,
    setCardName,
    pressBackArrow,
    openFilterSheet,
    closeFilterSheet,
    DATA,
    Metrics,
    handleNavigateTransactionHistory
  } = useAccountStatementViewModel();


  function renderFilter() {
    return (
      <View style={styles.filtersearchContainer}>
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
          onChangeText={setCardName}
          keyboardType={'default'}
          // customInpStyle={styles.innerinput}
        />
        <TouchableOpacity
          onPress={() => {
            cardDetailRef?.current?.open();
          }}
          style={{
            width: handleSize.w(40),
            height: handleSize.h(46),
            backgroundColor: THEME.primary,
            borderRadius: handleSize.f(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="filter-outline" size={handleSize.f(22)} color={THEME.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
           console.log("need");
          }}
          style={{
            width: handleSize.w(40),
            height: handleSize.h(46),
            backgroundColor: THEME.primary,
            borderRadius: handleSize.f(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="download-outline" size={handleSize.f(22)} color={THEME.textPrimary} />
        </TouchableOpacity>
      </View>
    );
  }

  const renderTransactions = () => (
    <FlatList
      data={DATA_STATEMENT}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={handleNavigateTransactionHistory}  style={styles.item}>
          <View style={styles.sectionLeft}>
            <View style={styles.iconCONT}>
              <Icon name={item.id == 2 ? 'swap-horizontal-outline' : 'arrow-forward-outline'} size={handleSize.f(16)} color={THEME.textPrimary} />
            </View>
            <View style={{ width: screenWidth - handleSize.w(160) }} >
              <Text style={styles.name}>{item.name}</Text>
              {/* <Text style={styles.subname}>19 July</Text> */}
            </View>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: handleSize.h(100) }}
    />
  );

  return (
    <MainContainer
      refreshingeffect={false}
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}>
        
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />


      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Account statement</Text>
        {renderFilter()}
        {renderTransactions()}

        <BottomSheet
          height={550}              // minimum height
          maxHeightPercent={0.8}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={cardDetailRef}
          children={<TransactionFilter onPress={closeFilterSheet} onPress2={closeFilterSheet} />}
        />
      </View>
    </MainContainer>
  );
};

export default AccountStatement;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },

  filtersearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: handleSize.h(7),
  },

  rightIconCont: {
    backgroundColor: THEME.primary,
    width: handleSize.w(40),
    height: handleSize.h(55),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: handleSize.w(10),
    borderRadius: handleSize.h(10),
  },

  innerinput: {
    height: handleSize.h(46),
    width:  Metrics.width - handleSize.w(130),
    paddingLeft: handleSize.w(40),
    paddingRight: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    justifyContent: "center",
  },

  imgViewLeft: {
    width: handleSize.w(35),
    height: handleSize.h(46),
    position: 'absolute',
    left: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.h(10),
    height: handleSize.h(56),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: handleSize.w(10),
    marginTop: handleSize.h(10),
  },

  sectionLeft: { flexDirection: 'row', alignItems: 'center' },

  iconCONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.h(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    lineHeight: handleSize.h(20),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  subname: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: handleSize.w(10),
  },

  amount: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
});
