// src/screens/home/CardScreen.tsx
import React from 'react';
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

const CardScreen = () => {
  const navigation = useNavigation<any>();
  const vm = useCardScreenViewModel();

  // const currentItem = vm?.getCardsData?.[vm.currentIndex];
 

  // function renderPopup(icon: any, title: any, btnTxt: any) {
  //   return (
  //       <ImageBackground
  //         // imageStyle={{ borderRadius: 16 }}
  //         source={Images.universalModalBack} 
  //         resizeMode="contain"
  //         style={styles.modal}
  //       >
 
  //       <TouchableOpacity
  //         style={styles.closeBtn}
  //         onPress={() => vm.setopen(false)}
  //       >
  //         <Text style={styles.closeText}>×</Text>
  //       </TouchableOpacity>

  //       <View style={styles.iconCircle}>
  //         <Icon name={icon} size={25} color={THEME.textPrimary} />
  //       </View>

  //       <Text style={styles.titles}>{title}</Text>

  //       <CustomButton
  //         btnContSty={styles.forgetTxtpop}
  //         title={btnTxt}
  //         onPress={() => vm.setopen(false)}
  //       />
  //       </ImageBackground>
  //   );
  // }

  function renderNearestAtm() {
    return (
      <Modal
        isVisible={vm.open}
        isKeyboardAvoidingView={true}
        children={<BluryModal
            style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            onClose={() => vm.setopen(false)}
            btnLoader={false}
            marginTopTitle={20}
            onConfirm={() => vm.setopen(false)}
            iconNameBottom={-20}
            body={"Kindly visit your nearest ATM"}
            iconName={"alert-outline"}
            confirmText={'Continue'}
          />}
        onClose={() => vm.setopen(false)}
      />
    );
  }

  function renderCardFeatureButtons() {
    const features = vm.renderCardFeature();
    return (
      <CardFeatureButtons
        features={features}
        onPressbtn={(item: any) => vm.onPressfeature(item, navigation)}
      />
    );
  }

  const SlidingCards = () => {
    return (
      <View>
        <FlatList
          data={vm.getCardsData}
          horizontal
          pagingEnabled
          ListEmptyComponent={() => (
            <View style={styles.cardLoadingContainer}>
              <ActivityIndicator size="small" color={THEME.primary} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item?.card_id}
          scrollEventThrottle={16}
          onViewableItemsChanged={vm.SlidingCardsProps.onViewableItemsChanged}
          viewabilityConfig={vm.SlidingCardsProps.viewabilityConfig}
          renderItem={({ item, index }: any) => (
            <AccountCard
              onPressCard={(it: any) => vm.onPressCard(it)}
              item={item}
              index={index}
            />
          )}
          contentContainerStyle={{ marginTop: handleSize.h(10) }}
        />

        <View style={styles.dotsContainer}>
          {vm.getCardsData?.map((item: any, index: number) => (
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

  const TransactionList = () => {
    return (
      <View style={{ marginTop: handleSize.h(20) }}>
        <View style={styles.cardHeadr}>
          <Text style={styles.cardTransactinTXT}>
            
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TRANSACTIONHISTORY' as any)}
          >
            <Text style={styles.viewAllTxt}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Replace DATA with your transactions list */}
        <FlatList
          data={DATA}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TRANSACTION_DETAIL' as any)}
              style={styles.item}
            >
              <View style={styles.sectionLeft}>
                <View style={styles.iconCONT}>
                  <Icon
                    name={'arrow-forward-outline'}
                    size={16}
                    color={THEME.textPrimary}
                  />
                </View>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.subname}>19 july</Text>
                </View>
              </View>
              <View>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ marginHorizontal: handleSize.w(20), paddingBottom: handleSize.h(40) }}
        />
      </View>
    );
  };

  function Options() {
    return (
      <OptionsHeader
        leftTxt={"Manage Cards"}
        showBackIcon={false}
        onPressNotification={() => navigation.navigate(HOME_ROUTES.NOTIFICATION) }
        onPressAdd={() => vm.AddCardRef?.current?.open()}
      />
    );
  }

  function renderHeaderStuffs() {
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

  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <SafeAreaView style={styles.container}>

      <StatusBarManager
        backgroundColor={THEME.gradientStatusBarColor} 
        barStyle="light-content" 
      />

       {renderHeaderStuffs()}
       
       
         <ScrollView>
           {renderCardFeatureButtons()}
           {TransactionList()}
           {/* Modals */}
           <Modal
             isVisible={vm.modalVisible}
             isKeyboardAvoidingView={true}
             children={
               <BluryModal
                style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
                 backImg={Images.addCardGradient}
                 visible={vm.modalVisible}
                 onClose={() => vm.setModalVisible(false)}
                 btnLoader={vm.isPendingfreezUnFreezCard}
                 onConfirm={() => vm.freezCardApi('freeze')}
                 showSubBody={true}
                 showCancelBtn={false}
                 downConfirmText={'Cancel'}
                 title={'Freeze This Card?'}
                 body={
                   'Freezing will temporarily disable all transactions from this card.'
                 }
                 subBody={
                   'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
                 }
                 iconName={'snow-outline'}
                 confirmText={'Freeze Card'}
               />
             }
             onClose={() => {}}
           />

           <Modal
             isVisible={vm.modalVisibleUnfreez}
             isKeyboardAvoidingView={true}
             children={
               <BluryModal
                showCancelBtn={false}
                 style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
                 backImg={Images.addCardGradient}
                 visible={vm.modalVisibleUnfreez}
                 btnLoader={vm.isPendingfreezUnFreezCard}
                 onClose={() => vm.setmodalVisibleUnfreez(false)}
                 onConfirm={() => vm.freezCardApi('active')}
                 title={'Card is Frozen'}
                 body={
                   'Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending.'
                 }
                 showSubBody={false}
                 confirmText={'Unfreeze Card'}
                 downConfirmText={'Cancel'}
               />
             }
             onClose={() => {}}
           />
         </ScrollView>
    
         {renderNearestAtm()}

         {/* BottomSheets */}
         <BottomSheet
          height={300}
          maxHeightPercent={0.55}   // optional, override for screen
          draggable={false} 
          openTime={500}
          closeDuration={500}
          bottomSheetRef={vm.AddCardRef}
          children={
            <AddCardPopup
              backImg={Images.addCardGradient}
              onPress1={() => vm.HandleOnPress('1', navigation)}
              onPress2={() => vm.HandleOnPress('2', navigation)}
              style={{ flex: 1, paddingHorizontal: 20 }}
            />
          }
        />

        <BottomSheet
          height={320}              // minimum height
          maxHeightPercent={0.55}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={vm.cardDetailRef}
          children={
            <CardDetail
              isPendinggetSucureCard={vm.isPendinggetSucureCard}
              getSucureCardData={vm.getSucureCardData}
              saveCureentDisplayData={vm.saveCureentDisplayData}
              onPress1={() => vm.HandleOnPressCardDetail('1')}
              onPress2={() => vm.HandleOnPressCardDetail('2')}
              style={{ paddingHorizontal: 20 }}
              iconColor={THEME.white}
            />
          }
        />

        <BottomSheet
          height={500}
          maxHeightPercent={0.65}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          onClose={() => {
            vm.updateCardStatuses()
          }}
          bottomSheetRef={vm.methodsRef}
          children={
            <Methods
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
          }
        />

        <BottomSheet
          height={200}
          maxHeightPercent={0.33}   // optional, override for screen
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={vm.manageRef}
          children={
            <ManageOption
              style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
              backImg={Images.addCardGradient}
              onPress1={() => vm.onPressOption('1')}
              onPress2={() => vm.onPressOption('2')}
            />
          }
        />

       </SafeAreaView>
      </ImageBackground>
  );
};

export default CardScreen;

export const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    height: handleSize.h(290),
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
  },
  cardTransactinTXT: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  viewAllTxt: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: handleSize.w(9),
    paddingVertical: handleSize.h(3),
    borderRadius: handleSize.f(10),
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
    marginTop: handleSize.h(15),
  },
  dot: { width: handleSize.w(6), height: handleSize.w(6), borderRadius: handleSize.f(5), marginHorizontal: handleSize.w(2) },
  dotInactive: { backgroundColor: THEME.SlateBlue },
  dotActive: { backgroundColor: THEME.white },
});