// TransactionHistory.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import InputField from '../../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useTransactionHistoryViewModel from '../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import Metrics from '../../../styles/metrics';

export default function TransactionHistory() {
  const {
    DATA,
    cardName,
    setCardName,
    cardDetailRef,
    pressBackArrow,
    closeFilterSheet,
    handleNavigateTransactionHistory
  } = useTransactionHistoryViewModel();

  function renderFilter() {
    return (
      <View style={styles.filtersearchContainer}>
        <InputField
          removeTitle={true}
          textInputStyle={styles.innerinput}
          imgViewLeft={styles.imgViewLeft}
          imageLeft={'search-outline'}
          imagetintColorLeft={THEME.white}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Search"
          value={cardName}
          onChangeText={setCardName}
          keyboardType={'default'}
          // customInpStyle={styles.innerinput}
        />
        <TouchableOpacity
          onPress={() => cardDetailRef?.current?.open()}
          style={styles.filterBtn}
        >
          <Icon name="filter-outline" size={handleSize.f(22)} color={THEME.textPrimary} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderTransactions() {
    return (
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={handleNavigateTransactionHistory} 
            style={styles.item}
          >
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon 
                  name={item.id == 2 ? "arrow-back-outline" : "arrow-forward-outline"}  
                  size={handleSize.f(16)} 
                  color={THEME.textPrimary} 
                />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subname}>19 July</Text>
              </View>
            </View>
            <Text style={styles.amount}>{item.amount}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: handleSize.h(100) }}
      />
    );
  }

  return (
    <MainContainer
      refreshingeffect={false}
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />
      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Transactions History</Text>
        {renderFilter()}
        {renderTransactions()}

        <BottomSheet
          height={550}              // minimum height
          maxHeightPercent={0.8}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={cardDetailRef}
        >
          <TransactionFilter style={{ marginHorizontal: handleSize.w(20) }} onPress={closeFilterSheet} />
        </BottomSheet>
      </View>
    </MainContainer>
  );
}

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
  innerinput: {  
    height: handleSize.h(46),
    width: Metrics.width - handleSize.w(95),
    paddingLeft: handleSize.w(40),   //calculated value 
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
  filterBtn: {
    width: handleSize.w(46),
    height: handleSize.h(46),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },
  subname: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },
  amount: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
});
