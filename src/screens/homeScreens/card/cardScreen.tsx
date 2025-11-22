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

const CardScreen = () => {
  const navigation = useNavigation<any>();
  const vm = useCardScreenViewModel();

  const currentItem = vm.getCardsData?.results?.values?.[vm.currentIndex];
 

  function renderPopup(icon: any, title: any, btnTxt: any) {
    return (
        <ImageBackground
          imageStyle={{ borderRadius: 16 }}
          source={Images.addCardGradient}
          style={styles.modal}
        > 

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => vm.setopen(false)}
        >
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <View style={styles.iconCircle}>
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View>

        <Text style={styles.titles}>{title}</Text>

        <CustomButton
          btnContSty={styles.forgetTxtpop}
          title={btnTxt}
          onPress={() => vm.setopen(false)}
        />
        </ImageBackground>
    );
  }

  function renderNearestAtm() {
    return (
      <Modal
        isVisible={vm.open}
        isKeyboardAvoidingView={true}
        children={renderPopup('alert', 'Kindly visit your nearest ATM', 'Ok')}
        onClose={vm.setopen}
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
          data={vm.getCardsData?.results?.values}
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
          contentContainerStyle={{ marginTop: 10 }}
        />

        <View style={styles.dotsContainer}>
          {vm.getCardsData?.results?.values?.map((item: any, index: number) => (
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
      <View style={{ marginTop: 35 }}>
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
          contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 40 }}
        />
      </View>
    );
  };

  function Options() {
    return (
      <OptionsHeader
        leftTxt={"Manage Cards"}
        showBackIcon={false}
        onPressNotification={() => Alert.alert('SHOW_CLIENT')}
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
      <StatusBar translucent backgroundColor={"#7c4fc3"} />
       {renderHeaderStuffs()}
       
       
         <ScrollView>
           {renderCardFeatureButtons()}
           {TransactionList()}
           {/* Modals */}
           <Modal
             backOpacityColor={'rgba(0,0,0,0.4)'}
             isVisible={vm.modalVisible}
             isKeyboardAvoidingView={true}
             children={
               <BluryModal
                style={{ flex: 1, paddingHorizontal: 20 }}
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
             backOpacityColor={'rgba(0,0,0,0.4)'}
             isVisible={vm.modalVisibleUnfreez}
             isKeyboardAvoidingView={true}
             children={
               <BluryModal
                showCancelBtn={false}
                 style={{ flex: 1, paddingHorizontal: 20 }}
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
          height={METRICS.halfScreen - 30}
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={vm.AddCardRef}
          children={
            <AddCardPopup
              backImg={Images.manageCardGradient}
              onPress1={() => vm.HandleOnPress('1', navigation)}
              onPress2={() => vm.HandleOnPress('2', navigation)}
              style={{ flex: 1, paddingHorizontal: 20 }}
            />
          }
        />

        <BottomSheet
          height={METRICS.halfScreen}
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
          height={METRICS.height / 1.6}
          draggable={false}
          openTime={500}
          closeDuration={500}
          onClose={() => {
            const payload = {
              card_id: currentItem?.card_id,
              usage: [{ name: 'allow_atm_withdrawal', enabled: vm.atmSwitch }],
            };
            vm.updateUsageRulesFunc(payload);
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
              backImg={Images.manageCardGradient}
              style={{ flex: 1, paddingHorizontal: 20 }}
            />
          }
        />

        <BottomSheet
          height={METRICS.halfScreen - 80}
          draggable={false}
          openTime={500}
          closeDuration={500}
          bottomSheetRef={vm.manageRef}
          children={
            <ManageOption
              style={{ flex: 1, paddingHorizontal: 20 }}
              backImg={Images.manageCardGradient}
              onPress1={() => vm.onPressOption('1')}
              onPress2={() => vm.onPressOption('2')}
            />
          }
        />

       </SafeAreaView>
      </ImageBackground>

    // <LinearGradient
    //   colors={['#713d9f', '#2A1E60', '#0C1445']}
    //   locations={[0.1, 0.3, 1]}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   style={styles.container}
    // >
    //   <SafeAreaView style={styles.container}>
    //     <LinearGradient
    //       colors={['#6B3FA0', '#3A2670', '#0C1445']}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 0, y: 1 }}
    //       style={{
    //         height: 340,
    //         borderBottomLeftRadius: 30,
    //         borderBottomRightRadius: 30,
    //       }}
    //     >
    //       {Options()}
    //       {SlidingCards()}
    //     </LinearGradient>

    //     <ScrollView>
    //       {renderCardFeatureButtons()}
    //       {TransactionList()}
    //       {/* Modals */}
    //       <Modal
    //         isVisible={vm.modalVisible}
    //         isKeyboardAvoidingView={true}
    //         children={
    //           <FreezeCardModal
    //             style={{ flex: 1, paddingHorizontal: 20 }}
    //             backImg={Images.addCardGradient}
    //             visible={vm.modalVisible}
    //             onClose={() => vm.setModalVisible(false)}
    //             btnLoader={vm.isPendingfreezUnFreezCard}
    //             onConfirm={() => vm.freezCardApi('freeze')}
    //             showSubBody={true}
    //             downConfirmText={'Cancel'}
    //             title={'Freeze This Card?'}
    //             body={
    //               'Freezing will temporarily disable all transactions from this card.'
    //             }
    //             subBody={
    //               'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
    //             }
    //             iconName={'snow-outline'}
    //             confirmText={'Freeze Card'}
    //           />
    //         }
    //         onClose={() => {}}
    //       />

    //       <Modal
    //         isVisible={vm.modalVisibleUnfreez}
    //         isKeyboardAvoidingView={true}
    //         children={
    //           <FreezeCardModal
    //             style={{ flex: 1, paddingHorizontal: 20 }}
    //             backImg={Images.addCardGradient}
    //             visible={vm.modalVisibleUnfreez}
    //             btnLoader={vm.isPendingfreezUnFreezCard}
    //             onClose={() => vm.setmodalVisibleUnfreez(false)}
    //             onConfirm={() => vm.freezCardApi('active')}
    //             title={'Card is Frozen'}
    //             body={
    //               'Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending.'
    //             }
    //             showSubBody={false}
    //             confirmText={'Unfreeze Card'}
    //             downConfirmText={'Cancel'}
    //           />
    //         }
    //         onClose={() => {}}
    //       />
    //     </ScrollView>

    //     {renderNearestAtm()}

    //     {/* BottomSheets */}
    //     <BottomSheet
    //       height={METRICS.halfScreen - 30}
    //       draggable={false}
    //       openTime={500}
    //       closeDuration={500}
    //       bottomSheetRef={vm.AddCardRef}
    //       children={
    //         <AddCardPopup
    //           backImg={Images.addCardGradient}
    //           onPress1={() => vm.HandleOnPress('1', navigation)}
    //           onPress2={() => vm.HandleOnPress('2', navigation)}
    //           style={{ flex: 1, paddingHorizontal: 20 }}
    //         />
    //       }
    //     />

    //     <BottomSheet
    //       height={METRICS.halfScreen}
    //       draggable={false}
    //       openTime={500}
    //       closeDuration={500}
    //       bottomSheetRef={vm.cardDetailRef}
    //       children={
    //         <CardDetail
    //           isPendinggetSucureCard={vm.isPendinggetSucureCard}
    //           getSucureCardData={vm.getSucureCardData}
    //           saveCureentDisplayData={vm.saveCureentDisplayData}
    //           onPress1={() => vm.HandleOnPressCardDetail('1')}
    //           onPress2={() => vm.HandleOnPressCardDetail('2')}
    //           style={{ paddingHorizontal: 20 }}
    //           iconColor={THEME.white}
    //         />
    //       }
    //     />

    //     <BottomSheet
    //       height={METRICS.height / 1.6}
    //       draggable={false}
    //       openTime={500}
    //       closeDuration={500}
    //       onClose={() => {
    //         const payload = {
    //           card_id: currentItem?.card_id,
    //           usage: [{ name: 'allow_atm_withdrawal', enabled: vm.atmSwitch }],
    //         };
    //         vm.updateUsageRulesFunc(payload);
    //       }}
    //       bottomSheetRef={vm.methodsRef}
    //       children={
    //         <Methods
    //           Data={vm.getCardsUsageRulesData}
    //           loading={vm.isPendingGetCardsUsageRules}
    //           atmSwitch={vm.atmSwitch}
    //           setAtmSwitch={vm.setAtmSwitch}
    //           onlineSwitch={vm.onlineSwitch}
    //           setOnlineSwitch={vm.setOnlineSwitch}
    //           chipSwitch={vm.chipSwitch}
    //           setChipSwitch={vm.setChipSwitch}
    //           walletSwitch={vm.walletSwitch}
    //           setWalletSwitch={vm.setWalletSwitch}
    //           backImg={Images.manageCardGradient}
    //           style={{ flex: 1, paddingHorizontal: 20 }}
    //         />
    //       }
    //     />

    //     <BottomSheet
    //       height={METRICS.halfScreen - 80}
    //       draggable={false}
    //       openTime={500}
    //       closeDuration={500}
    //       bottomSheetRef={vm.manageRef}
    //       children={
    //         <ManageOption
    //           style={{ flex: 1, paddingHorizontal: 20 }}
    //           backImg={Images.manageCardGradient}
    //           onPress1={() => vm.onPressOption('1')}
    //           onPress2={() => vm.onPressOption('2')}
    //         />
    //       }
    //     />
    //   </SafeAreaView>
    // </LinearGradient>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    height: 300,
    width: Metrics.width,
    // backgroundColor: "red",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // position: 'absolute'
  },
  botmRadius:{
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleTop:{
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.oneeight,
    color: THEME.white,
    marginLeft: scale(25),
    // backgroundColor: "red",
    marginTop: 12,
    marginBottom: 10
  },
  cardLoadingContainer: {
    height: 174,
    justifyContent: 'center',
    alignItems: 'center',
    width: METRICS.width,
  },
  balanceContainer: {
    backgroundColor: THEME.whitergba,
    padding: scale(8),
    width: '100%',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    marginTop: 5,
  },
  balanceTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  balanceAmountTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.white,
    padding: 1,
  },
  renderRightInputContainer: {
    height: scale(55),
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumber: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  inputNumbergbpcont: {
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3,
  },
  inputNumbergbp: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  forgetTxtpop: {
    backgroundColor: THEME.primary,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.98)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 10, right: 15 },
  closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: 100,
    width: scale(55),
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 13,
  },
  cardHeadr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  cardTransactinTXT: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  viewAllTxt: {
    fontSize: FONT_SIZES.oneone,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
  item: {
    backgroundColor: THEME.secondary,
    borderRadius: 10,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: 25,
    height: 25,
    backgroundColor: THEME.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginLeft: 15,
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginLeft: 15,
  },
  amount: {
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: { width: 6, height: 6, borderRadius: 5, marginHorizontal: 2 },
  dotInactive: { backgroundColor: THEME.SlateBlue },
  dotActive: { backgroundColor: THEME.white },
});







// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, SectionList, ImageBackground, ScrollView, Alert } from 'react-native';
// import { BottomSheet, MainContainer, Modal } from '../../../components';
// import { Images } from '../../../config';
// import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
// import { scale } from 'react-native-size-matters';
// import { Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { LineChart } from 'react-native-chart-kit';
// import Metrics from '../../../styles/metrics';
// import { screenWidth } from '../../../utils/style.utils';
// import { Accounts, DATA } from '../../../utils/data';
// import AccountCard from '../../../components/accountCard';
// import CardFeatureButtons from '../../../components/cardFeatureButtons';
// import AddCardPopup from '../../../components/bottomSheet/addCardPopup';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { Auth_ROUTES, HOME_ROUTES } from '../../../constants';
// import CustomButton from '../../../components/customButton';
// import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';
// import { createCard,  freezUnFreezCard, getCards, unfreezCard } from '../../../queries/auth.query';
// import { useDispatch } from 'react-redux';
// import CardDetail from '../../../components/bottomSheet/cardDetail';
// import Methods from '../../../components/bottomSheet/methods';
// import ManageOption from '../../../components/bottomSheet/manageOption';
// import { ActivityIndicator } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import OptionsHeader from '../../../components/topHeader';
// import { StatusBar } from 'react-native';
// import { SHOW_CLIENT } from '../../../APICall/constants';
// import { Toast } from "../../../utils";
// import { getCardsUsageRules, getSucureCard, updateUsageRules } from '../../../queries/card.Queries/card.query';
// import { handleLoader } from '../../../Redux/Action/Auth/AuthActions';

// const CardScreen = () => {


//   const [atmSwitch, setAtmSwitch] = useState(true);
//   const [onlineSwitch, setOnlineSwitch] = useState(false);
//   const [chipSwitch, setChipSwitch] = useState(true);
//   const [walletSwitch, setWalletSwitch] = useState(false);

//   const [open, setopen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [saveCureentDisplayData, setsaveCureentDisplayData] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);
//   const AddCardRef = useRef(null)
//   const cardDetailRef = useRef(null)
//   const methodsRef = useRef(null)
//   const manageRef = useRef(null)
//   const dispatch = useDispatch()
//   const FOCUS = useIsFocused()
//   const navigation = useNavigation()

//   const {mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard} = freezUnFreezCard({
//       callback: (response: any) => {
//         refetchgetCardsData()
//         setModalVisible(false)
//         setmodalVisibleUnfreez(false)
//       },
//     });

//     const {mutate: updateUsageRulesFunc, isPending: isPendingupdateUsageRules} = updateUsageRules({
//       callback: (response: any) => {
//         refetchgetCardsData()
//         setModalVisible(false)
//         setmodalVisibleUnfreez(false)
//       },
//     });
   
//   // // get me
//   const {data: getCardsData, refetch: refetchgetCardsData, isPending} = getCards({
//     enabled: false,
//     dispatch,
//   });

//   let currentItem =  getCardsData?.results?.values[currentIndex]

//   const {data: getCardsUsageRulesData, refetch: refetchgetCardsUsageRules, isFetching: isPendingGetCardsUsageRules } = getCardsUsageRules({
//     enabled: false,
//     dispatch,
//     card_id: currentItem?.card_id
//   });

//   const {data: getSucureCardData, refetch: refetchgetSucureCard, isFetching: isPendinggetSucureCard } = getSucureCard({
//     enabled: false,
//     dispatch,
//     card_id: currentItem?.card_id
//   });

//   console.log("ASdasdasd=>",getCardsUsageRulesData);
  
//   useEffect(()=>{
//     if (getCardsUsageRulesData?.success) {
//       const rule = findRule(getCardsUsageRulesData?.results?.usages, "allow_atm_withdrawal");
//       setAtmSwitch(rule?.enabled)
//     }
//   },[getCardsUsageRulesData])

//   useEffect(()=>{
//       refetchgetCardsData()
//   },[FOCUS])

//   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index ?? 0);
//     }
//   }).current;

  
//   const findRule = (rulesArray, ruleName) => {
//     return rulesArray.find(item => item.name === ruleName);
//   }; 

//   const onRefresh = () => {
//     setRefreshing(true);
//     // refetchgetCardsData()
//     // Simulate a network request or any async task
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000); // replace this with your actual refresh logic
//   };
  
 
//   const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


// function openFreezCard() {
//   if (currentItem?.card_status == "active") {
//     setModalVisible(true) 
//   } else  {
//     setmodalVisibleUnfreez(true)
//   }
// }

//   function onPressCard(item: any) {
//     setsaveCureentDisplayData(item)
//     cardDetailRef?.current?.open()
//   }
//   // console.log("getCardsData?.results?.values==>",getCardsData?.results?.values);
   

// const SlidingCards = () => {
//   return (
//     <View>
//       <FlatList
//         data={getCardsData?.results?.values} 
//         horizontal
//         pagingEnabled
//         ListEmptyComponent={()=>{
//           return(
//             <View style={styles.cardLoadingContainer} >
//               <ActivityIndicator size="small" color={THEME.primary} />
//             </View>
//           )
//         }}
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item?.card_id}
//         scrollEventThrottle={16}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         renderItem={({ item, index }) => <AccountCard onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index} />}
//         contentContainerStyle={{ marginTop: 10, 
//           // marginHorizontal: 20 
//         }}
//       />
       
//     <View style={styles.dotsContainer}>
//         {getCardsData?.results?.values?.map((item, index) => (          
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               index == currentIndex ? styles.dotActive : styles.dotInactive,
//             ]}
//           />
//         ))}
//       </View>
//     </View>

//   );
// };

// function onPressSecurity() {
//   setopen(false)
// }

//       function renderPopup(icon,title,btnTxt) {
//     return (
//       <View style={styles.modal}>
//         <TouchableOpacity style={styles.closeBtn} onPress={onPressSecurity}>
//           <Text style={styles.closeText}>×</Text>
//         </TouchableOpacity>

//         <View style={styles.iconCircle}>
//           <Icon name={icon} size={25} color={THEME.textPrimary} />
//         </View>

//         <Text style={styles.titles}>{title}</Text>
//         {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

//         <CustomButton
//           btnContSty={styles.forgetTxtpop}
//           title={btnTxt}
//           onPress={onPressSecurity}
//         />
//       </View>
//     );
//   }

//   function renderNearestAtm() {
//     return (
//       <Modal
//         isVisible={open}
//         isKeyboardAvoidingView={true}
//         children={renderPopup("alert","Kindly visit your nearest ATM","Ok")} 
//         onClose={setopen}
//       />
//     );
//   }


// function onPressfeature(item: any) {
//   if(!currentItem){
//     return    
//   }
//   else{
//     if (item.text == "Freeze Card" || item.text == "Unfreeze Card" ) {
//       openFreezCard()
//     } else if(item.text == "Replace Card"){
//       navigation.navigate(HOME_ROUTES.REPLACE_CARD,{cardDetail: currentItem})
//     } else if(item.text == "Methods"){
//       methodsRef?.current?.open() 
//       refetchgetCardsUsageRules()
//     } else if(item.text == "Manage"){
//       manageRef?.current?.open()
//     }
//   }
// }

// function renderCardFeature() {
  
//   return(
//     <CardFeatureButtons features={[
//   { icon: 'snow-outline', text: (currentItem?.card_status == "freeze" || currentItem?.card_status == "inactive") ? "Unfreeze Card" : "Freeze Card" },
//   { icon: 'copy-outline', text: "Replace Card" },
//   { icon: 'options-outline' , text: "Methods" },
//   { icon: 'menu-outline', text: "Manage" }
// ]} onPressbtn={(item: any)=>{onPressfeature(item)}} />
//   )
// }

// const TransactionList = () => {
//   return (
//     <View style={{ marginTop: 30 }} >
//       <View style={styles.cardHeadr} >
//         <Text style={styles.cardTransactinTXT} >Card Transactions ({"DUMMY DATA"})</Text>
//         <TouchableOpacity onPress={()=>{ navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY) }} >
//           <Text style={styles.viewAllTxt} >View All</Text>
//         </TouchableOpacity>
//       </View>
//     <FlatList
//       data={DATA}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <TouchableOpacity  onPress={()=>{ navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL)}}  style={styles.item}>
//           <View style={styles.sectionLeft} >            
//             <View style={styles.iconCONT} >
//                <Icon name={"arrow-forward-outline"} size={16} color={THEME.textPrimary} />
//             </View>
//             <View>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.subname}>19 july</Text>
//           </View>
//           </View>
//           <View>
//             <Text style={styles.amount}>{item.amount}</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
//       renderSectionHeader={({ section: { title } }) => (
//         <Text style={styles.header}>{title}</Text>
//       )}
//     />
//     </View>
//   );
// };

//   function Options() {
//    return(
//     <OptionsHeader
//       showBackIcon={false}
//       // onPressNotification={() => navigation.navigate(HOME_ROUTES.NOTIFICATION) }
//       onPressNotification={() => Alert.alert(SHOW_CLIENT)}
      
//       onPressAdd={() => AddCardRef?.current?.open()}
//     />
//    ) 
//   }

  
//   function HandleOnPress(txt: any) {
//     if (txt == 1) {
//       AddCardRef?.current?.close()
//       setTimeout(()=>{
//         navigation.navigate(HOME_ROUTES.CREATE_VC)
//       },500)
//     }    
//     else{
//       AddCardRef?.current?.close()
//       setTimeout(()=>{
//         navigation.navigate(HOME_ROUTES.CREATE_PC)
//       },500)
//     }
//   }


//   async function HandleOnPressCardDetail(txt: any) {
//     if (txt == 1) {
//       // cardDetailRef?.current?.close()
//         await refetchgetSucureCard();
      
//     }    
//     else{
//       // cardDetailRef?.current?.close()
//         await refetchgetSucureCard();
//     }
//   }

//   function freezCardApi(status: any) {
//   // setModalVisible(false)
//   //        setmodalVisibleUnfreez(false)

//     let payload = {
//       card_id: currentItem?.card_id,
//       status: `${status}`,
//       note: `Card confirmed ${status}`
//     }
//     freezUnFreezCardFunc(payload)    
//   }
      
//   function renderPOPUP() {
//     return(
//         <FreezeCardModal
//           style={{ flex: 1, paddingHorizontal: 20 }}
//           backImg={Images.addCardGradient}
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           // btnLoader={isPendingfreezUnFreezCard}
//           btnLoader={isPendingfreezUnFreezCard}
//           onConfirm={() => {
//             freezCardApi("freeze")
//           }}
//           showSubBody={true}
//           downConfirmText={"Cancel"}
//           title="Freeze This Card?"
//           body="Freezing will temporarily disable all transactions from this card."
//           subBody="The card can be unfrozen at any time. Existing subscriptions may still attempt charges."
//           iconName="snow-outline"
//           confirmText="Freeze Card"
//         />
//     )
//   }
    

        
//   function renderPOPUPUnFreez() {
//     return(
//         <FreezeCardModal
//           style={{ flex: 1, paddingHorizontal: 20 }}
//           backImg={Images.addCardGradient}
//           visible={modalVisibleUnfreez}
//           btnLoader={isPendingfreezUnFreezCard}
//           onClose={() => setmodalVisibleUnfreez(false)}
//           onConfirm={() => {
//             freezCardApi("active")
//           }}
//           title="Card is Frozen"
//           body="Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending."
//           showSubBody={false}
//           confirmText="Unfreeze Card"
//           downConfirmText={"Cancel"}
//         />
//     )
//   }
    


//   function renderModal() {
//       return (
//         <Modal
//           isVisible={modalVisible}
//           isKeyboardAvoidingView={true}
//           children={renderPOPUP()}
//           onClose={() => {
//             console.log('close');
//           }}
//         />
//       );
//     }

//       function renderModalUnFreez() {
//       return (
//         <Modal
//           isVisible={modalVisibleUnfreez}
//           isKeyboardAvoidingView={true}
//           children={renderPOPUPUnFreez()}
//           onClose={() => {
//             console.log('close');
//           }}
//         />
//       );
//     }
  

//     function callFunction(id: any) {
//       if (id == 1 && currentItem?.format == "physical") {
//         setopen(true)
//       }
//       else if (id == 1 && currentItem?.format == "virtual") {
//         navigation.navigate(HOME_ROUTES.PIN_SECURITY,{cardDetail: currentItem })  
//       }
//       else if (id == 2) {
//         navigation.navigate(HOME_ROUTES.SET_LIMIT,{cardDetail: currentItem, getCardsData: getCardsData})    
//       }      
//     }
    
//     function onPressOption(id: any) {
//       manageRef?.current?.close()
//       setTimeout(() => {
//         callFunction(id)
//       }, 1000);
//     }

//     console.log("ASdasdassa====>",methodsRef);
    
//   return(
//     <LinearGradient
//         colors={['#713d9f', '#2A1E60', '#0C1445']}
//         locations={[0.1, 0.3, 1]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.container} // 👈 poori screen cover karega
//       >
//         <SafeAreaView     style={styles.container}>
//         <LinearGradient
//           colors={['#6B3FA0', '#3A2670', '#0C1445']}  // 👈 upar ka color dark kar diya
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//           style={{height: 300, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} // 👈 poori screen cover karega
//         >
//         {Options()}
//         {SlidingCards()}     
       
//         </LinearGradient>     
//           <ScrollView>
//             {/* { currentItem?.is_enable ? */}
//              {renderCardFeature() }
//             {/* //  : null} */}
//             {TransactionList()}
//             {renderModal()}
//             {renderModalUnFreez()}
//           </ScrollView>
          
//           {renderNearestAtm()}

//      <BottomSheet
//       height={METRICS.halfScreen - 30}
//       draggable={false}
//       openTime={500}
//       closeDuration={500}
//       bottomSheetRef={AddCardRef}
//       children={<AddCardPopup backImg={Images.addCardGradient} onPress1={()=>HandleOnPress('1')} onPress2={()=>HandleOnPress('2')}  style={{ flex: 1, paddingHorizontal: 20 }} />}
//      />

//      <BottomSheet
//       height={METRICS.halfScreen}
//       draggable={false}
//       openTime={500}
//       closeDuration={500}
//       bottomSheetRef={cardDetailRef}
//       children={<CardDetail 
//         isPendinggetSucureCard={isPendinggetSucureCard}
//         getSucureCardData={getSucureCardData}
//       saveCureentDisplayData={saveCureentDisplayData}
//        onPress1={()=>HandleOnPressCardDetail('1')} 
//        onPress2={()=>HandleOnPressCardDetail('2')} 
//        style={{ paddingHorizontal: 20 }}  
//        iconColor={THEME.white}
//        />}
//      />

//      <BottomSheet
//       height={METRICS.height / 1.6}
//       draggable={false}
//       openTime={500}
//       closeDuration={500}
//       onClose={()=>{
//         let payload = {
//           card_id: currentItem.card_id,
//           usage: [
//             { name: "allow_atm_withdrawal", "enabled": atmSwitch }
            
//           ]
//         }
//         updateUsageRulesFunc(payload)
//       }}
//       bottomSheetRef={methodsRef} 
//       children={<Methods  
//         Data={getCardsUsageRulesData}
//         loading={isPendingGetCardsUsageRules}
//         atmSwitch={atmSwitch}
//         setAtmSwitch={setAtmSwitch}
//         onlineSwitch={onlineSwitch}
//         setOnlineSwitch={setOnlineSwitch}
//         chipSwitch={chipSwitch}
//         setChipSwitch={setChipSwitch}
//         walletSwitch={walletSwitch}
//         setWalletSwitch={setWalletSwitch}
//         backImg={Images.manageCardGradient} 
//         style={{ flex: 1, paddingHorizontal: 20 }}  />}
//      />

//      <BottomSheet
//       height={METRICS.halfScreen - 80}
//       draggable={false}
//       openTime={500}
//       closeDuration={500}
//       bottomSheetRef={manageRef}
//       children={<ManageOption style={{ flex: 1, paddingHorizontal: 20 }} backImg={Images.manageCardGradient}  onPress1={()=>{onPressOption('1')}} onPress2={()=>{onPressOption('2')}}  />}
//      />

//        </SafeAreaView>
//       </LinearGradient>
//     )

// }

// export default CardScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, 
//     // justifyContent: 'center', 
//     // alignItems: 'center', 
//     // backgroundColor: THEME.white, 
//   },
//   logo: {
//     width: METRICS.width,
//     height: scale(25),
//     resizeMode: 'contain',
//     alignSelf: "center",
//     marginTop: 20
//   },
//   cardLoadingContainer:
//   { height: 174, justifyContent: "center", alignItems: "center", width: METRICS.width},
//    screenTitle: {
//     color: THEME.primary,
//     fontSize: FONT_SIZES.threetwo,
//     fontFamily: FONTFAMILY.Light
//   },

//    rightIconCont: 
//     { width: 28, height: 28, borderRadius: 50, justifyContent: "center", alignItems: "center", marginTop: 20, backgroundColor: THEME.white },
    
//     titleRight:{
//       fontSize: FONT_SIZES.twozero,
//       fontFamily: FONTFAMILY.SemiBold,
//       color: THEME.textPrimary,
//       top: -2
//     },

//     header: {
//     fontSize: FONT_SIZES.onesix,
//     fontFamily: FONTFAMILY.Light,
//     color: THEME.primary,
//     marginVertical: 5
//   },
//   item: {
//     // borderWidth: 1,
//     backgroundColor: THEME.secondary,
//     borderRadius: 10,
//     height: 68,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: "center",
//     paddingHorizontal: 10,
//     marginTop: 10
//   },
//   sectionLeft:
//   { flexDirection: "row", alignItems: "center" },
//   iconCONT:
//   { width: 22, height: 22, backgroundColor: THEME.primary, borderRadius: 100, justifyContent: "center", alignItems: "center" },
//   name: {
//     fontSize: FONT_SIZES.onesix,
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//     marginLeft: 10
//   },
//   subname: {
//     fontSize: FONT_SIZES.oneZero,
//     fontFamily: FONTFAMILY.Light,
//     color: THEME.white,
//     marginLeft: 10
//   },
//   amount: {
//     fontSize: FONT_SIZES.oneeight,
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white
//   },

//   //pagination dots
//     dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 10
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 5,
//     marginHorizontal: 2,
//   },
//   dotInactive: {
//     backgroundColor: THEME.lightGrey,
//   },
//   dotActive: {
//     backgroundColor: THEME.textPrimary,
//   },


//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//     marginHorizontal: 20,
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     backgroundColor: THEME.prinkishBlue,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }, 

//   cardHeadr: 
//   { flexDirection: 'row',justifyContent: "space-between", marginHorizontal: 20, marginVertical: 5 },
//   cardTransactinTXT:
//   { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.white },
//   viewAllTxt:
//   { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.white, backgroundColor: THEME.SlateBlue,paddingHorizontal: 9, paddingVertical: 3, borderRadius: 10 },

//   ICONcONT:
//   { width: scale(36), height: scale(36), backgroundColor: THEME.lightGrey, justifyContent: "center", alignItems: "center", borderRadius: 12 },


  
//     modal: {
//       backgroundColor: 'rgba(64, 64, 65, 0.98)',
//       borderRadius: 16,
//       padding: 24,
//       alignItems: 'center',
//     },
//     closeBtn: { position: 'absolute', top: 10, right: 15 },
//     closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
//     iconCircle: {
//       backgroundColor: THEME.primary,
//       borderRadius: 100,
//       width: scale(55),
//       height: scale(55),
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     titles: {
//       fontFamily: FONTFAMILY.Medium,
//       fontSize: FONT_SIZES.twotwo,
//       color: THEME.white,
//       textAlign: 'center',
//       lineHeight: 30,
//       marginTop: 20
//     },
//     description: {
//       marginTop: 10,
//       fontFamily: FONTFAMILY.Regular,
//       fontSize: FONT_SIZES.onefour,
//       color: THEME.white,
//       textAlign: 'center',
//     },

//     forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },

// });
