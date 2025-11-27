import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import InputField from '../../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useTransactionHistoryViewModel from '../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
import Metrics from '../../../styles/metrics';
import { scale } from 'react-native-size-matters';
import { SHOW_CLIENT } from '../../../APICall/constants';

export default function TransactionHistory() {
  const {
    DATA,
    cardName,
    setCardName,
    onSearch,
    cardDetailRef,
    pressBackArrow,
    closeFilterSheet,
    handleNavigateTransactionHistory
  } = useTransactionHistoryViewModel();

  function renderFilter() {
    return (
      <View style={styles.filtersearchContainer}>
        <InputField
          // removeTitle
          imageLeft={'search-outline'}
          imagetintColorLeft={THEME.white}
          // image={'search-outline'}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Search"
          value={cardName}
          onChangeText={setCardName}
          keyboardType={'default'}
          customInpStyle={styles.innerinput}
        />
        <TouchableOpacity
          onPress={() => {
            cardDetailRef?.current?.open();
          }}
          style={{
            width: 40,
            height: scale(42),
            backgroundColor: THEME.primary,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="filter-outline" size={22} color={THEME.textPrimary} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => { Alert.alert("NEED",SHOW_CLIENT) }}  style={{ width: 40, height: scale(42), backgroundColor: THEME.primary, borderRadius: 10, justifyContent: "center", alignItems: "center" }} >
          <Icon name="download-outline" size={22} color={THEME.textPrimary} />
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderTransactions() {
    return (
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleNavigateTransactionHistory} style={styles.item}>
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon name={item.id == 2 ?"arrow-back-outline" : "arrow-forward-outline"}  size={16} color={THEME.textPrimary} />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subname}>19 July</Text>
              </View>
            </View>
            <Text style={styles.amount}>{item.amount}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
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
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Transactions History</Text>
        {renderFilter()}
        {renderTransactions()}

        <BottomSheet
          height={((Metrics.height / 2) + 100)}
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
    marginBottom: 10,
    marginTop: 10,
  },
  filtersearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  // innerinput: { paddingLeft: 50, height: 45 },
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
    width: 36,
    height: 36,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: 10,
  },
  subname: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: 10,
  },
  amount: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  // innerinput: {  height: scale(53), width: Metrics.width-95, paddingRight: 50 },
    innerinput: 
    {  
      height: 56,
      width: Metrics.width-95,
      paddingLeft: 40   //calculated value  
    }
});
