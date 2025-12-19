// TransactionHistory.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { BottomSheet, MainContainer } from '../../../components';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import InputField from '../../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';

import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import useTransactionHistoryViewModel from '../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import Metrics from '../../../styles/metrics';
import { CommonUtils } from '../../../utils';
import TransactionList from '../../../components/transactionList';

export default function TransactionHistory(props) {
  const {
    transactions,
    search,
    setSearch,
    cardDetailRef,
    pressBackArrow,
    loadMoreTransactions,
    applyFilters,
    resetFilters,
    handleNavigateTransactionHistory,
    isLoadingMore,
    isPending,
  } = useTransactionHistoryViewModel(props);

  /** 🔹 Search + Filter Row */
  const renderFilter = () => {
    return (
      <View style={styles.filtersearchContainer}>
        <InputField
          removeTitle
          textInputStyle={styles.innerinput}
          imgViewLeft={styles.imgViewLeft}
          imageLeft="search-outline"
          imagetintColorLeft={THEME.white}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity
          onPress={() => cardDetailRef?.current?.open()}
          style={styles.filterBtn}
        >
          <Icon
            name="filter-outline"
            size={handleSize.f(22)}
            color={THEME.textPrimary}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /** 🔹 Transaction Item */
const renderItem = ({ item }) => (
  <TransactionList
    item={item}
    onPress={handleNavigateTransactionHistory}
  />
);

  /** 🔹 Footer Loader */
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color={THEME.primary} />
      </View>
    );
  };

  return (
    <MainContainer
      refreshingeffect={false}
      showBackArrow
      pressBackArrow={pressBackArrow}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <View style={{ marginHorizontal: handleSize.w(20), flex: 1 }}>
        <Text style={styles.title}>Transactions History</Text>

        {renderFilter()}

        {/* 🔹 LIST */}
        {isPending && transactions.length === 0 ? (
          <ActivityIndicator
            size="large"
            color={THEME.primary}
            style={{ marginTop: 40 }}
          /> 
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={renderItem}
            onEndReached={loadMoreTransactions}
            onEndReachedThreshold={0.6}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{
              paddingBottom: handleSize.h(120),
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* 🔹 FILTER BOTTOM SHEET */}
        <BottomSheet
          height={550}
          maxHeightPercent={0.8}
          draggable={false}
          openTime={400}
          closeDuration={400}
          bottomSheetRef={cardDetailRef}
        >
          <TransactionFilter
            onPress={applyFilters}
            onPress2={resetFilters}
          />
        </BottomSheet>
      </View>
    </MainContainer>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginVertical: handleSize.h(10),
  },
  filtersearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  innerinput: {
    height: handleSize.h(46),
    width: Metrics.width - handleSize.w(95),
    paddingLeft: handleSize.w(40),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  imgViewLeft: {
    width: handleSize.w(35),
    height: handleSize.h(46),
    position: 'absolute',
    left: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
