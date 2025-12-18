import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StatusBar,
  Image,
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

const header_flatlist_BottomSizeAdjust = 260;

const AccountScreen = () => {
  const vm = useAccountScreenViewModel();
  const navigation = useNavigation();

  // console.log("asdsa=>",vm.currentAccDetail);

  const renderTransactionList = () => (
    <View style={{ zIndex: -9 }}>
      <FlatList
        data={vm.transactions}
        keyExtractor={item => item?.id}
        ListHeaderComponent={() => {
          return (
            <View>
              <CardFeatureButtons
                features={vm.features}
                onPressbtn={(item: any) => item.onPress()}
              />

              <GradientLineGraph
                data={vm?.getDashboardData_Data?.graph}
                loading={vm?.getDashboardDataPending}
                marginTop={handleSize.h(60)}
              />

              <View style={styles.statecontainer}>
                <StatCard
                  value={vm?.getDashboardData_Data?.average_spent}
                  title="Avg monthly spend (DUMMY)"
                  amount="£820.0"
                  percentage={11.9}
                  //           // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
                  onPress={() => console.log('Avg monthly ')}
                  isPositive
                />
                <StatCard
                  value={vm?.getDashboardData_Data?.monthly_spend}
                  title="Spent this month (DUMMY)"
                  amount="£440.24"
                  percentage={11.9}
                  // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
                  onPress={() => console.log('Avg monthly ')}
                  isPositive={false}
                />
              </View>

              <View style={styles.cardHeader}>
                <Text style={styles.cardTransactionTXT}>
                  Activity ({'DUMMY DATA-' + SHOW_CLIENT})
                </Text>
                <TouchableOpacity onPress={vm.handleNavigateTransactionHistory}>
                  <Text style={styles.viewAllTxt}>View All</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        nestedScrollEnabled
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          console.log('onMomentumScrollBegin');
        }}
        onEndReached={() => {
          console.log('onEndReached');
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={vm.handleNavigateTransaction}
            style={styles.item}
          >
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon
                  name={
                    item?.id == 2
                      ? 'arrow-back-outline'
                      : 'arrow-forward-outline'
                  }
                  size={handleSize.f(16)}
                  color={THEME.textPrimary}
                />
              </View>
              <View>
                <Text
                  style={styles.name}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item?.frontier_customer?.business_customer?.company_name}
                </Text>
                <Text style={styles.subname}>
                  {commonUtils.timeHumanize(item?.created_at)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>{item?.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingBottom: handleSize.h(header_flatlist_BottomSizeAdjust + 20),
        }}
      />
    </View>
  );

  function renderHeaderStuffs() {
    return (
      <ImageBackground
        imageStyle={styles.botmRadius}
        style={styles.headerContainer}
        source={Images.checking2}
        resizeMode="stretch"
      >
        <OptionsHeader
          onPressNotification={() =>
            vm.navigation.navigate(HOME_ROUTES.NOTIFICATION)
          }
          onPressAdd={() =>
            vm.navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)
          }
        />
        <FlatList
          ref={vm.flatListRef}
          data={vm.getAccounts_Data}
          // contentContainerStyle={{ backgroundColor: "red" }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.cardLoadingContainer}>
                <ActivityIndicator size="small" color={THEME.primary} />
              </View>
            );
          }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AccountCardBox
              showBalance={vm.showbalance}
              total={`${item?.currency?.iso_code} ${item?.available_balance}`}
              onHold={`${item?.currency?.iso_code} ${item?.pending_balance}`}
              available={`${item?.currency?.iso_code} ${item?.available_balance}`}
              onPress={() => vm.editRef?.current?.open()}
              onPresseye={() => vm.setshowbalance(!vm.showbalance)}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={vm.handleScroll}
          scrollEventThrottle={16}
        />
        <View style={styles.pagination}>
          {vm.getAccounts_Data.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, vm.activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      source={Images.universalGradientBackground}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBarManager
          backgroundColor={THEME.gradientStatusBarColor}
          barStyle="light-content"
        />

        {renderHeaderStuffs()}
        {renderTransactionList()}

        <BottomSheet
          height={500} // minimum height
          maxHeightPercent={0.62} // optional, override for screen
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
                    label: 'Account Name',
                    value: vm.currentAccDetail.name,
                    bold: true,
                  },
                  { label: 'IBAN', value: vm.currentAccDetail.iban },
                  { label: 'SWIFT Code', value: 'DUMMY' },
                  {
                    label: 'Currency',
                    value: vm.currentAccDetail.linkedAccount,
                  },
                  { label: 'Account Type', value: 'DUMMY' },
                  {
                    label: 'Created On',
                    value: vm.currentAccDetail.created_at,
                  },
                  {
                    label: 'Linked Cards',
                    value: vm.currentAccDetail.iso_code,
                  },
                ]}
              />
            </ScrollView>
          </ImageBackground>
        </BottomSheet>

        <BottomSheet
          height={300} // minimum height
          maxHeightPercent={0.5} // optional, override for screen
          draggable={false}
          bottomSheetRef={vm.editRef}
        >
          <EditAccountPreferences
            accountName="Primary GBP Wallet"
            onPressEdit={() => vm.editAccountRef?.current?.open()}
            onPressSave={vm.onPressSave}
            isPendingAccFreeze={vm.isPendingAccFreeze}
            isPendingAccDelete={vm.isPendingAccDelete}
            onPressFreeze={vm.onPressFreeze}
            onPressDelete={vm.onPressDelete}
          />
        </BottomSheet>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerContainer: {
    height: handleSize.h(header_flatlist_BottomSizeAdjust),
    width: METRICS.width, // ya screen width
    borderBottomLeftRadius: handleSize.h(30),
    borderBottomRightRadius: handleSize.h(30),
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
    height: handleSize.h(6),
    width: handleSize.w(6),
    borderRadius: handleSize.h(10),
    backgroundColor: THEME.SlateBlue,
    marginHorizontal: handleSize.w(4),
  },

  activeDot: {
    backgroundColor: THEME.white,
    width: handleSize.w(6),
    height: handleSize.h(6),
  },

  statecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: handleSize.h(16),
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: handleSize.w(20),
    marginVertical: handleSize.h(10),
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
    borderRadius: handleSize.h(10),
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
});
