import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { BottomSheet, MainContainer } from '../../../components';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../../styles';
import { useAccountScreenViewModel } from '../../../viewModels/homeViewModel/account/useAccountScreenViewModel';
import OptionsHeader from '../../../components/topHeader';
import AccountCardBox from '../../../components/accountCardBox';
import AccountCardzoom from '../../../components/accountCardzoom';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import StatCard from '../../../components/stateCard';
import AccountDetailsCard from '../../../components/bottomSheet/accountDetailsCard';
import EditAccountPreferences from '../../../components/editAccountPreferences';
import EditAccountDetail from '../../../components/editAccountDetail';
import Images from '../../../config/images';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { ActivityIndicator } from 'react-native';
import GradientLineGraph from '../../../components/gradientLineGraph';
import { DATA } from '../../../utils/data';
import Metrics from '../../../styles/metrics';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import commonUtils from '../../../utils/common.utils';
import TransactionList from '../../../components/transactionList';
import SmallBtn from '../../../components/smallBtn';
import { CommonUtils } from '../../../utils';
import AccountList from '../../../components/accountList';
import {
  LoaderCompleteScreenOnly,
  LoaderOnly,
} from '../../../components/activityIndicator';

const header_flatlist_BottomSizeAdjust = 230;

const AccountScreen = () => {
  const vm = useAccountScreenViewModel();
  const navigation = useNavigation();

  let NoAssetOfAccount =
    vm.allAccounts?.length > 0 &&
    vm.allAccounts[0]?.assets?.length > 0;

  const renderTransactionList = () => (
    <View style={{ zIndex: -9 }}>
      <FlatList
        // data={vm.transactions}
        data={vm?.isPendingpaymentHistry ? [] : vm?.transactions}
        keyExtractor={item => item?.id}
        /** 🔹 Initial Loader */
        ListEmptyComponent={
          vm.isPendingpaymentHistry ? (
            <View style={{ marginTop: handleSize.f(20) }}>
              <ActivityIndicator size="large" color={THEME.primary} />
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: THEME.white, fontSize: handleSize.h(FONT_SIZES.onefour), marginTop: handleSize.h(10)  }}>
              No transactions found
            </Text>
          )
        }
        /** 🔹 Footer Loader (Pagination) */
        ListFooterComponent={
          vm?.transactions?.length < commonUtils.MAX_LENGTH_10 ? null : (
            <SmallBtn
              title="Show more"
              onPress={vm.handleNavigateTransactionHistory}
            />
          )
        }
        // onEndReachedThreshold={0.1}
        // onEndReached={vm.loadMoreTransactions}
        refreshing={vm.refreshing}
        onRefresh={vm.onRefresh}
        ListHeaderComponent={
          vm.allAccounts?.[0]?.assets ? renderSubHeaderStuffs() : null
        }
        nestedScrollEnabled
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: handleSize.h(header_flatlist_BottomSizeAdjust + 20),
        }}
      />
    </View>
  );

  /** 🔹 Transaction Item */
  const renderItem = useCallback(
    ({ item }) => (
      <TransactionList item={item} onPress={vm.handleNavigateTransaction} />
    ),
    [],
  );

  // console.log(
  //   'vm?.getDashboardData_Data==>',
  //   vm.allAccounts[0]?.assets?.length,
  // );

  const renderSubHeaderStuffs = useCallback(() => {
    function renderGraphAndAvg() {
      return (
        <View>
          <GradientLineGraph
            data={vm?.getDashboardData_Data?.graph}
            loading={vm?.getDashboardDataPending}
            marginTop={handleSize.f(25)}
          />

          <View style={styles.statecontainer}>
            <StatCard
              value={vm?.getDashboardData_Data?.average_spent}
              title="Avg monthly spend"
              amount="£820.0"
              percentage={
                vm?.getDashboardData_Data?.avg_spent_percentage
                  ? vm?.getDashboardData_Data?.avg_spent_percentage
                  : 0
              }
              //           // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              onPress={() => console.log('Avg monthly ')}
              isPositive
            />
            <StatCard
              value={vm?.getDashboardData_Data?.monthly_spend}
              title="Spent this month"
              amount="£440.24"
              percentage={
                vm?.getDashboardData_Data?.avg_monthly_spend
                  ? vm?.getDashboardData_Data?.avg_monthly_spend
                  : 0
              }
              // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              onPress={() => console.log('Avg monthly ')}
              isPositive={false}
            />
          </View>
        </View>
      );
    }
    return (
      <View>
        <CardFeatureButtons
          features={vm.features}
          onPressbtn={(item: any) => item.onPress()}
          btnSize={56}
          txtSize={9}
          txtLineHeight={12}
        />

        {NoAssetOfAccount && renderGraphAndAvg()}

        <View style={styles.cardHeader}>
          <Text style={styles.cardTransactionTXT}>Activity</Text>
          <TouchableOpacity style={styles.viewAllTxtCont} onPress={vm.handleNavigateTransactionHistory}>
            <Text style={styles.viewAllTxt}>View all</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [vm.features, vm.getDashboardData_Data]);

  // console.log("currentAccount==>????",vm.currentAccount);

  function renderHeaderStuffs() {
    return (
      <ImageBackground
        imageStyle={styles.botmRadius}
        style={styles.headerContainer}
        source={Images.checking2}
        resizeMode="stretch"
      >
        <OptionsHeader
          userData={vm.userData}
          isFetching={vm?.isFetching}
          allAccounts={vm?.allAccounts}
          show={'accountname'}
          loginUserData={vm?.loginUserData}
          currentAccount={vm?.selectedAccount_WholeApp}
          onPressSelectAccounts={
            () => vm.selectAccountRef?.current?.open()
            // selectAccountRef
          }
          onPressThreeDots={
            // () => vm.editRef?.current?.open()
            ()=> navigation.navigate(HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT)
            // selectAccountRef
          }
          onPressNotification={() =>
            vm.navigation.navigate(HOME_ROUTES.NOTIFICATION)
          }
          onPressAdd={() =>
            vm.navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)
          }
          rightIconName={"add-outline"}
        />
        <FlatList
          ref={vm.flatListRef}
          data={vm?.selectedAccount_WholeApp?.assets || []}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.noAccCont}>
              <Text style={styles.noAccountTxt}>No asset found</Text>
            </View>
          }
          onScroll={vm.handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          getItemLayout={(_, index) => ({
            length: Metrics.width,
            offset: Metrics.width * index,
            index,
          })}
          renderItem={({ item }) => (
            <AccountCardBox
              showBalance={vm.showbalance}
              total={`${CommonUtils.getCurrencySymbol(
                item.currency.iso_code,
              )} ${item.available_balance}`}
              onHold={`${CommonUtils.getCurrencySymbol(
                item.currency.iso_code,
              )} ${item.pending_balance}`}
              available={`${CommonUtils.getCurrencySymbol(
                item.currency.iso_code,
              )} ${item.available_balance}`}
              onPresseye={() => vm.setshowbalance(!vm.showbalance)}
            />
          )}
        />
        <View style={styles.pagination}>
          {vm?.selectedAccount_WholeApp?.assets?.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, vm.activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </ImageBackground>
    );
  }

  // console.log("vm?.getAccountsAndAssets_Data=> ?",vm?.getAccountsAndAssets_Data[0]?.accounts);

  return (
    <ImageBackground
      source={Images.universalGradientBackground}
      style={styles.container}
    >
      <View style={styles.topColorBlend} />
      <SafeAreaView style={styles.container}>
        <StatusBarManager
          backgroundColor={THEME.gradientStatusBarColor}
          barStyle="light-content"
        />

        {renderHeaderStuffs()}
        {renderTransactionList()}

        <BottomSheet
          height={450} // minimum height
          maxHeightPercent={0.68} // optional, override for screen
          draggable={false}
          bottomSheetRef={vm.manageRef}
        >
          <ImageBackground
            resizeMode="cover"
            source={Images.addCardGradient}
            style={styles.container}
          >
            <ScrollView
              style={{ marginTop: handleSize.h(10) }}
              showsVerticalScrollIndicator={false}
            >
              <AccountDetailsCard
                onPressShare={vm.onPressShare}
                onPressCopy={vm.onPressCopy}
                onPressEdit={vm.onPressEdit}
                details={[
                  {
                    label: 'Account name',
                    value: vm?.selectedAccount_WholeApp?.name,
                    bold: true,
                  },
                  { label: 'IBAN', value: vm?.selectedAccount_WholeApp?.iban },
                  { label: 'SWIFT code', value: 'DUMMY' },
                  {
                    label: 'Currency',
                    value: vm?.selectedAccount_WholeApp?.currency?.iso_code,
                  },
                  { label: 'Account type', value: vm?.loginUserData?.customer_type == 'personal' ? 'Single currency' : 'Multicurrency' },
                  {
                    label: 'Created cards',
                    value: vm?.selectedAccount_WholeApp?.created_at
                      ? CommonUtils.formatDate(
                          '2025-04-13T19:15:08.556537+00:00',
                        )
                      : 'DUMMY',
                  },
                  // {
                  //   label: 'Linked cards',
                  //   value: 'DUMMY',
                  // },
                ]}
              />
            </ScrollView>
          </ImageBackground>
        </BottomSheet>

        <BottomSheet
          height={250} // minimum height
          maxHeightPercent={0.5} // optional, override for screen
          draggable={false}
          bottomSheetRef={vm.editRef}
        >
          <EditAccountPreferences
            currentAccount={vm?.selectedAccount_WholeApp}
            onPressEdit={() => vm.editAccountRef?.current?.open()}
            onPressSave={vm.onPressSave}
            isPendingAccFreeze={vm.isPendingAccFreeze}
            isPendingAccDelete={vm.isPendingAccDelete}
            onPressFreeze={vm.onPressFreeze}
            onPressDelete={vm.onPressDelete}
          />
        </BottomSheet>

        <BottomSheet
          height={350} // minimum height
          maxHeightPercent={0.5} // optional, override for screen
          draggable={false}
          bottomSheetRef={vm.selectAccountRef}
        >
          <ImageBackground
            resizeMode="cover"
            source={Images.addCardGradient}
            style={[styles.container, { paddingHorizontal: handleSize.w(16) }]}
          >
            <Text style={styles.sheetTitle}>Select Account</Text>

            <FlatList
              data={vm?.allAccounts}
              keyExtractor={item => item?.id}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => (
                // console.log(" FLAT LISTgetAccountsAndAssets_Data==>",item),

                <AccountList
                  length={vm?.allAccounts}
                  index={index}
                  account={item}
                  onPress={() => {
                    vm.selectAccount(item);
                  }}
                />
              )}
            />
          </ImageBackground>
        </BottomSheet>
      </SafeAreaView>
      {/* {vm.isFetching && <LoaderCompleteScreenOnly />} */}
    </ImageBackground>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
    topColorBlend:
  { height: handleSize.f(200), width: Metrics.width , backgroundColor: THEME.gradientStatusBarColor, position: "absolute", top: 0 },
  headerContainer: {
    height: handleSize.h(header_flatlist_BottomSizeAdjust),
    width: METRICS.width, // ya screen width
    borderBottomLeftRadius: handleSize.h(30),
    borderBottomRightRadius: handleSize.h(30),
    // justifyContent: "center",
    // backgroundColor: THEME.white
  },
  botmRadius: {
    borderBottomLeftRadius: handleSize.h(30),
    borderBottomRightRadius: handleSize.h(30),
  },

  cardLoadingContainer: {
    height: handleSize.h(174),
    justifyContent: 'center',
    alignItems: 'center',
    width: METRICS.width,
  },

  // card: {
  //   width: handleSize.w(335),
  //   height: handleSize.h(174),
  //   borderRadius: handleSize.h(20),
  //   marginTop: handleSize.h(10),
  //   borderWidth: handleSize.h(1),
  //   borderStyle: "dashed",
  //   borderColor: THEME.gray,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   alignSelf: "center",
  // },

  // content: { alignItems: "center", justifyContent: "center" },

  // text: {
  //   marginTop: handleSize.h(4),
  //   fontSize: handleSize.f(FONT_SIZES.onefour),
  //   color: THEME.prinkishBlue,
  //   fontFamily: FONTFAMILY.Medium,
  // },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: handleSize.h(12),
  },

  dot: {
    height: handleSize.f(6),
    width: handleSize.f(6),
    borderRadius: handleSize.h(10),
    backgroundColor: THEME.SlateBlue,
    marginHorizontal: handleSize.w(4),
  },

  activeDot: {
    backgroundColor: THEME.white,
    width: handleSize.f(6),
    height: handleSize.f(6),
  },

  statecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: handleSize.f(16),
    marginTop: handleSize.f(6),
    // padding: handleSize.f(16),
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: handleSize.w(20),
    marginVertical: handleSize.h(10),
    marginTop: handleSize.h(15),
  },

  cardTransactionTXT: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },


  viewAllTxtCont:
  { justifyContent: 'center', alignItems: 'center',     backgroundColor: THEME.SlateBlue, width: handleSize.f(70), height: handleSize.f(25), borderRadius: handleSize.f(10), },
  viewAllTxt: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    // paddingHorizontal: handleSize.w(9),
    // paddingVertical: handleSize.h(3),
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: "center"
  },

  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.h(10),
    height: handleSize.h(68),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: handleSize.w(10),
    marginTop: handleSize.h(10),
    marginHorizontal: handleSize.w(20),
  },

  sectionLeft: { flexDirection: 'row', alignItems: 'center' },

  iconCONT: {
    width: handleSize.w(25),
    height: handleSize.h(25),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.h(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: handleSize.w(10),
    width: Metrics.width - handleSize.w(220),
    // backgroundColor: "red",
  },

  subname: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  amount: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    // width: handleSize.w(120),
    // backgroundColor: "red",
    textAlign: 'right',
  },

  //accout list detail
  sheetContainer: {
    // flex: 1,
    // padding: 16,
    // backgroundColor: '#fff',
  },

  sheetTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.h(16),
    color: THEME.white,
  },
  separator: {
    height: 10,
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
  noAccCont: {
    width: Metrics.width,
    justifyContent: 'center',
  },
  noAccountTxt: {
    color: THEME.white,
    alignSelf: 'center',
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
  },
});
