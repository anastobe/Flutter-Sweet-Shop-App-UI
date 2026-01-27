// src/screens/home/CardScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { Images } from '../../../config';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import AccountCard from '../../../components/accountCard';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import AddCardPopup from '../../../components/bottomSheet/addCardPopup';
import CustomButton from '../../../components/customButton';
import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import CardDetail from '../../../components/bottomSheet/cardDetail';
import Methods from '../../../components/bottomSheet/methods';
import ManageOption from '../../../components/bottomSheet/manageOption';
import OptionsHeader from '../../../components/topHeader';
import { useCardScreenViewModel } from '../../../viewModels/homeViewModel/card/useCardScreenViewModel';
import { DATA } from '../../../utils/data';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import Metrics from '../../../styles/metrics';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import { HOME_ROUTES } from '../../../constants';
import { LoaderCompleteScreenOnly } from '../../../components/activityIndicator';
import commonUtils from '../../../utils/common.utils';
import SmallBtn from '../../../components/smallBtn';
import TransactionList from '../../../components/transactionList';
import AccountList from '../../../components/accountList';

const header_Height = 290;

const CardScreen = () => {
  const navigation = useNavigation<any>();
  const vm = useCardScreenViewModel();

  const currentItem = vm?.getCardsData?.[vm.currentIndex];
 
  const BOTTOM_SHEETS = [
  {
    key: 'ADD_CARD',
    ref: vm.AddCardRef,
    height: 330,
    maxHeightPercent: 0.55,
    render: () => (
      <AddCardPopup
        backImg={Images.addCardGradient}
        onPress1={() => vm.HandleOnPress('1', navigation)}
        onPress2={() => vm.HandleOnPress('2', navigation)}
        style={{ flex: 1, paddingHorizontal: 20 }}
      />
    ),
  },
  {
    key: 'CARD_DETAIL',
    ref: vm.cardDetailRef,
    height: 320,
    maxHeightPercent: 0.55,
    onClose: vm.updateToSecure,
    render: () => (
      <CardDetail
        showvalidThru={vm.showvalidThru}
        showccvv={vm.showccvv}
        isPendinggetSucureCard={vm.isPendinggetSucureCard}
        getSucureCardData={vm.getSucureCardData}
        saveCureentDisplayData={vm.saveCureentDisplayData}
        onPress1={() => vm.HandleOnPressCardDetail('1',vm?.getSucureCardData)}
        onPress2={() => vm.HandleOnPressCardDetail('2',vm?.getSucureCardData)}
        onPress3={() => vm.HandleOnPressCardDetail('3',vm?.getSucureCardData)}
        style={{ paddingHorizontal: 20 }}
      />
    ),
  },
  {
    key: 'METHODS',
    ref: vm.methodsRef,
    height: currentItem?.format == "physical" ? 500 : 300,
    maxHeightPercent: 0.65,
    onClose: vm.updateCardStatuses,
    render: () => (
      <Methods
        currentItem={currentItem}
        Data={vm.getCardsUsageRulesData}
        loading={vm.isPendingGetCardsUsageRules}
        atmSwitch={vm.atmSwitch}
        setAtmSwitch={vm.setAtmSwitch}
        onlineSwitch={vm.onlineSwitch}
        setOnlineSwitch={vm.setOnlineSwitch}
        chipSwitch={vm.chipSwitch}
        setChipSwitch={vm.setChipSwitch}
        walletSwitch={vm.walletSwitch}
        setWalletSwitch={vm.setWalletSwitch}
        backImg={Images.addCardGradient}
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
      />
    ),
  },
  {
    key: 'MANAGE',
    ref: vm.manageRef,
    height: currentItem?.format == "physical" ? 310 : 210,
    maxHeightPercent: 0.5,
    render: () => (
      <ManageOption
        currentItem={currentItem}
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
        backImg={Images.addCardGradient}
        onPress1={() => vm.onPressOption('1')}
        onPress2={() => vm.onPressOption('2')}
      />
    ),
  },
  ];

  function renderCardFeatureButtons() {
    const features = currentItem?.format == "physical" ? vm.renderCardFeaturePhysical() : vm.renderCardFeatureVirtual()
    return (
      <CardFeatureButtons
        features={features}
        onPressbtn={(item: any) => vm.onPressfeature(item, navigation)}
        btnSize={54}
        txtSize={11}
        txtLineHeight={14}
      />
    );
  }

  function ListTransactionHeader() {
    return(
      <View style={styles.cardHeadr}>
        <Text style={styles.cardTransactinTXT}>
          
        </Text>
        <TouchableOpacity
          style={styles.viewAllTxtCont}
            onPress={vm.handleNavigateTransactionHistory}
        >
          <Text style={styles.viewAllTxt}>View all</Text>
        </TouchableOpacity>
      </View>

    )
  }    

  const SlidingCards = () => {
    return (
      <View>
        <FlatList
          data={vm?.getCardsData}
          ref={vm?.cardListRef}
          horizontal
          pagingEnabled
          ListEmptyComponent={
            <View style={styles.cardLoadingContainer}>
              {vm.isPending ? (
                <View>
                  <ActivityIndicator size="small" color={THEME.primary} />
                </View>
              ) : (
                <Text style={{ textAlign: 'center', color: THEME.white, fontSize: handleSize.h(FONT_SIZES.onefour), marginTop: handleSize.h(10)  }}>
                  No card found
                </Text>
              )}
            </View>
          }
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item?.card_id}
          scrollEventThrottle={16}
          onViewableItemsChanged={vm.SlidingCardsProps.onViewableItemsChanged}
          onScrollToIndexFailed={() => {
            vm?.cardListRef?.current?.scrollToOffset({
              offset: 0,
              animated: false,
            });
          }}
          viewabilityConfig={vm?.SlidingCardsProps?.viewabilityConfig}
          renderItem={({ item, index }: any) => (
            <AccountCard
              key={index}
              onPressCard={(it: any) => vm.onPressCard(it)}
              item={item} 
              index={index}
            />
          )}
          contentContainerStyle={{ marginTop: handleSize.h(10) }}
        />

        <View style={styles.dotsContainer}>
          {vm?.getCardsData?.map((item: any, index: number) => (
            <View
              key={index}
              style={[
                styles.dot,
                index == vm.currentIndex
                  ? styles.dotActive
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

    //   transactions,
    // isPendingpaymentCardHistry

    
  /** 🔹 Transaction Item */
const renderItem = useCallback(({ item }) => (
  <TransactionList
    item={item}
    onPress={vm.handleNavigateTransaction}
  />
), []);


  const renderTransactionList = () => {
    return (

      <FlatList
        // data={vm.transactions}
        data={vm?.isPendingpaymentCardHistry ? [] : vm?.transactions}
        keyExtractor={item => item?.id}
        /** 🔹 Initial Loader */
        ListEmptyComponent={
          vm.isPendingpaymentCardHistry ? (
            <View style={{ marginTop: handleSize.h(40) }}>
              <ActivityIndicator size="large" color={THEME.primary} />
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: THEME.white,fontSize: handleSize.h(FONT_SIZES.onefour), marginTop: handleSize.h(20) }}>
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
        ListHeaderComponent={
            <View>
              {renderCardFeatureButtons()}
              {ListTransactionHeader()}
            </View>
         }
        // onEndReachedThreshold={0.1}
        // onEndReached={vm.loadMoreTransactions}
        refreshing={false}
        onRefresh={vm.onRefresh}
        nestedScrollEnabled
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: handleSize.h(20)
        }}
      />
    );
  };

  function Options() { 
    return (
      <OptionsHeader
          // leftTxt={"Manage cards"} 
          leftTxt={`( ${vm?.selectedAccount_WholeApp?.name} )`}
          // allAccounts={vm?.allAccounts}
          isFetching={false}
          show={'no'}
          loginUserData={vm?.loginUserData}
          // currentAccount={vm?.selectedAccount_WholeApp}
          onPressSelectAccounts={()=>{ vm.selectAccountRef?.current?.open() }}
          // onPressThreeDots={
          //   () => vm.editRef?.current?.open()
          //   // selectAccountRef
          // }
          onPressNotification={() =>
            navigation.navigate(HOME_ROUTES.NOTIFICATION)
          }
          onPressThreeDots={() => vm.AddCardRef?.current?.open()}
          rightIconName={"add-outline"}
      />
    );
  }

  const renderHeaderStuffs = () => {
    return(
    <ImageBackground
       imageStyle={styles.botmRadius}
       style={styles.headerContainer}
       source={Images.checking2}
       resizeMode="stretch"
       >
      {Options()}
      {SlidingCards()}
    </ImageBackground>
    )
  }

  function RenderBluryModal() {
  if (!vm.activeModal) return null;

  const config = vm.MODAL_CONFIG[vm.activeModal];

  return (
    <Modal isVisible>
      <BluryModal
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
        backImg={Images.addCardGradient}
        btnLoader={vm.isPendingfreezUnFreezCard}
        onClose={() => !vm.isPendingfreezUnFreezCard && vm.setActiveModal(false)}
        onConfirm={config?.action}
        title={config?.title}
        body={config?.body}
        subBody={config?.subBody}
        iconName={config?.iconName}
        confirmText={config?.confirmText}
        showSubBody={!!config?.subBody}
        showCancelBtn={false}
        downConfirmText="Cancel"
      />
    </Modal>
  );
}

function renderBottomSheets() {
  return (
    <>
      {BOTTOM_SHEETS.map(sheet => (
        <BottomSheet
          key={sheet.key}
          height={sheet.height}
          maxHeightPercent={sheet.maxHeightPercent}
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={sheet.ref}
          onClose={sheet.onClose}
        >
          {sheet.render()}
        </BottomSheet>
      ))}
    </>
  );
}

  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <View style={styles.topColorBlend} />
      <SafeAreaView edges={['top']} style={styles.container}>

      <StatusBarManager
        backgroundColor={THEME.gradientStatusBarColor} 
        barStyle="light-content" 
      />

              {renderHeaderStuffs()}
           {renderTransactionList()}
       </SafeAreaView>
        
        {/* {renderBottomSheets and Modals */}
        {RenderBluryModal()}
        {renderBottomSheets()}

        
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

        {vm.isPending && <LoaderCompleteScreenOnly />}

      </ImageBackground>
  );
};

export default CardScreen;

export const styles = StyleSheet.create({
  container: { flex: 1 },
    topColorBlend:
  { height: handleSize.f(200), width: Metrics.width , backgroundColor: THEME.gradientStatusBarColor, position: "absolute", top: 0 },
  headerContainer: {
    height: handleSize.f(285),
    width: Metrics.width,
    borderBottomLeftRadius: handleSize.f(30),
    borderBottomRightRadius: handleSize.f(30),
  },
  botmRadius: {
    borderBottomLeftRadius: handleSize.f(30),
    borderBottomRightRadius: handleSize.f(30),
  },
  titleTop: {
    fontFamily: FONTFAMILY.SemiBold,
   fontSize: handleSize.f(FONT_SIZES.oneeight),
    color: THEME.white,
    marginLeft: handleSize.w(25),
    marginTop: handleSize.h(12),
    marginBottom: handleSize.h(10),
  },
  cardLoadingContainer: {
    height: handleSize.h(174),
    justifyContent: 'center',
    alignItems: 'center',
    width: METRICS.width,
  },
  balanceContainer: {
    backgroundColor: THEME.whitergba,
    padding: handleSize.h(8),
    width: '100%',
    alignSelf: 'center',
    marginVertical: handleSize.h(15),
    borderRadius: handleSize.f(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    paddingHorizontal: handleSize.w(10),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(6),
    marginTop: handleSize.h(5),
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.white,
    padding: handleSize.h(1),
  },
  renderRightInputContainer: {
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: handleSize.w(6),
    borderRadius: handleSize.f(6),
    padding: handleSize.h(3),
  },
  inputNumbergbp: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  forgetTxtpop: {
    backgroundColor: THEME.primary,
    width: '100%',
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
  modal: {
    height: handleSize.h(270),
    paddingHorizontal: handleSize.w(20),
    justifyContent: "center",
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.w(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    textAlign: 'center',
    lineHeight: handleSize.h(30),
    marginTop: handleSize.h(13),
  },
  cardHeadr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: handleSize.w(20),
    marginTop: handleSize.h(20),
  },
  cardTransactinTXT: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
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
    backgroundColor: THEME.secondary,
    borderRadius: handleSize.f(10),
    height: handleSize.h(68),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: handleSize.w(20),
    marginTop: handleSize.h(10),
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: handleSize.w(25),
    height: handleSize.w(25),
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: handleSize.w(15),
  },
  subname: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: handleSize.w(15),
  },
  amount: {
   fontSize: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: handleSize.f(15),
  },
  dot: { width: handleSize.f(6), height: handleSize.f(6), borderRadius: handleSize.f(5), marginHorizontal: handleSize.w(2) },
  dotInactive: { backgroundColor: THEME.SlateBlue },
  dotActive: { backgroundColor: THEME.white },
  
  
  sheetTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    marginTop: handleSize.h(16),
    color: THEME.white,
  },
  separator: {
    height: 10,
  },
  
});