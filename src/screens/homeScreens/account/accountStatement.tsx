import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MainContainer, BottomSheet } from '../../../components';
import { THEME, FONT_SIZES, FONTFAMILY } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import { scale } from 'react-native-size-matters';
import { useAccountStatementViewModel } from '../../../viewModels/homeViewModel/account/useAccountStatementViewModel';

const AccountStatementView = () => {
  const {
    cardDetailRef,
    cardName,
    setCardName,
    pressBackArrow,
    openFilterSheet,
    closeFilterSheet,
    DATA,
    Metrics,
  } = useAccountStatementViewModel();

  const renderFilter = () => (
    <View style={styles.filtersearchContainer}>
      <InputField
        imageLeft={'search-outline'}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Search"
        value={cardName}
        onChangeText={setCardName}
        keyboardType={'default'}
        imagetintColorLeft={THEME.white}
        customInpStyle={styles.innerinput}
      />
      <TouchableOpacity onPress={openFilterSheet} style={styles.rightIconCont}>
        <Icon name="filter-outline" size={22} color={THEME.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIconCont}>
        <Icon name="download-outline" size={22} color={THEME.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderTransactions = () => (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft}>
            <View style={styles.iconCONT}>
              <Icon name={'arrow-forward-outline'} size={16} color={THEME.textPrimary} />
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subname}>19 July</Text>
            </View>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
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
          height={Metrics.height - 100}
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

export default AccountStatementView;

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
    marginVertical: 10,
  },
  rightIconCont: {
    backgroundColor: THEME.primary,
    width: 40,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  innerinput: { paddingLeft: 50, height: 45, width: scale(250) },
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
    backgroundColor: THEME.darkOffWhite,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
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
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
});
