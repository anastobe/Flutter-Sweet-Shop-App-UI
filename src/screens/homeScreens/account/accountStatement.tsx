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
import { SHOW_CLIENT } from '../../../APICall/constants';

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
          removeTitle
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
        <TouchableOpacity
          onPress={() => {
            Alert.alert('NEED', SHOW_CLIENT);
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
          <Icon name="download-outline" size={22} color={THEME.textPrimary} />
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
              <Icon name={item.id == 2 ? 'swap-horizontal-outline' : 'arrow-forward-outline'} size={16} color={THEME.textPrimary} />
            </View>
            <View style={{ width: screenWidth - 160 }} >
              <Text style={styles.name}>{item.name}</Text>
              {/* <Text style={styles.subname}>19 July</Text> */}
            </View>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
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
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Account Statement</Text>
        {renderFilter()}
        {renderTransactions()}

        <BottomSheet
          height={((Metrics.height / 2) + 100)}
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
  rightIconCont: {
    backgroundColor: THEME.primary,
    width: 40,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  // innerinput: {  height: scale(53), width: Metrics.width-130, paddingRight: 50 },
      innerinput: 
    {  
      height: 56, 
      width: Metrics.width-130,
      paddingLeft: 40   //calculated value  
    },
  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    height: 56,
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
    fontSize: FONT_SIZES.onetwo,
    lineHeight: 20, 
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginLeft: 10,
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    // 
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10,
  },
  amount: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
});
