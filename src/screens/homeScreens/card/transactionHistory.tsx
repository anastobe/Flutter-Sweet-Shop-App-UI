import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import InputField from '../../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useTransactionHistoryViewModel from '../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
import Metrics from '../../../styles/metrics';

export default function TransactionHistoryView() {
  const {
    DATA,
    cardName,
    onSearch,
    cardDetailRef,
    pressBackArrow,
    closeFilterSheet
  } = useTransactionHistoryViewModel();

  function renderFilter() {
    return (
      <View style={styles.filtersearchContainer}>
        <InputField
          imageLeft={'search-outline'}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Search"
          value={cardName}
          onChangeText={onSearch}
          keyboardType={'default'}
          imagetintColorLeft={THEME.white}
          customInpStyle={styles.innerinput}
        />
      </View>
    );
  }

  function renderTransactions() {
    return (
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon name="arrow-forward-outline" size={16} color={THEME.textPrimary} />
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
          height={Metrics.height - 100}
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
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 10,
    marginTop: 10,
  },
  filtersearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  innerinput: { paddingLeft: 50, height: 45, width: Metrics.width - 40 },
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
