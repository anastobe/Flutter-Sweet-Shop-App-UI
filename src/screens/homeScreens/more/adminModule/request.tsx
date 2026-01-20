
import React, { useRef } from 'react';
import {
 FlatList,
 RefreshControl,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { LoaderOnly } from '../../../../components/activityIndicator';
import BluryModal from '../../../../components/Modal/bluryModal';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';
import InputField from '../../../../components/textInput';
import { useadminRequestViewModal } from '../../../../viewModels/homeViewModel/more/Admin/adminRequestViewModal';
import { CommonUtils } from '../../../../utils';
import { Auth_ROUTES } from '../../../../constants';


export default function Request() {
 const {
   pressBackArrow,
   open,
   onRefresh,
   setOpen,
   onPressDelete,
   onPressPayment,
   request,
   onLoadMore,
   isPending,
   isSearching,
   onSearch,
   search,
   navigation,
  
   refreshing, 
   setRefreshing

 } = useadminRequestViewModal();


 const onEndReachedCalledDuringMomentum = useRef(false);

   function handleonPress(item: any) {

    navigation.navigate(Auth_ROUTES.ADMIN_CARD_STATUS, { Detail: item })    
    return

    if (item.type == "payment") {
      navigation.navigate(Auth_ROUTES.ADMIN_PAYMENT_STATUS)      
    } else if (item.type == "beneficiary") {
      navigation.navigate(Auth_ROUTES.ADMIN_BENEFICIAY_STATUS)      
    } else if (item.type == "cardcreated") {
      navigation.navigate(Auth_ROUTES.ADMIN_CARD_STATUS)      
    }
  }

  function renderItem({item}: any) {

    return (
      <TouchableOpacity onPress={() => { handleonPress(item) }} style={styles.item}>
        <View style={styles.iconCONTContainer}>
          <View style={styles.iconCONT}>
            <Icon name={'card-outline'} size={handleSize.f(22)} color={THEME.textPrimary} />
          </View>
        </View>

        <View style={styles.rightSide}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.txt16}>Card Created</Text>
            <Text style={styles.txt13}>{item?.status}</Text>
          </View>

          <View>
            <Text style={styles.midTxt}>Your card with name {item?.card_name} has been created and is ready to use.</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: handleSize.h(10) }}>
            <Text style={styles.txt10}>{CommonUtils.formatDateTime(item?.created_at)}</Text>
            {/* <Text style={styles.txt10}>{CommonUtils.formatTime(item?.created_at)}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

 function renderFilter() {
   return (
       <InputField
         removeTitle={true}
         margBtm={15}
         textInputStyle={styles.innerinput}
         imgViewLeft={styles.imgViewLeft}
         imageLeft={'search-outline'}
         imagetintColorLeft={THEME.white}
         // image={'search-outline'}
         autoCapital={'none'}
         blurOnSubmit={false}
         placeholder="Search"
         value={search}
         onChangeText={onSearch}
         keyboardType={'default'}
         imagetintColor={THEME.white}
         customInpStyle={styles.innerinput}
       />
   );
 }


 return (
    <MainContainer
      refreshingeffect={false}
      // showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
     <StatusBarManager
       backgroundColor={THEME.darkSecondary}
       barStyle="light-content"
     />


    <View style={{ paddingHorizontal: handleSize.w(20), flex: 1 }}>
    <Text style={styles.title}>Request</Text>

       {/* {renderFilter()} */}

       <FlatList
         data={request}
         renderItem={renderItem}
         showsVerticalScrollIndicator={false}
         keyExtractor={item => item?.id}
         onEndReachedThreshold={0.3}
         contentContainerStyle={{ paddingBottom: handleSize.f(80) }}
         onMomentumScrollBegin={() => {
           onEndReachedCalledDuringMomentum.current = false;
         }}
         onEndReached={() => {
           if (!onEndReachedCalledDuringMomentum.current) {
             onLoadMore();
             onEndReachedCalledDuringMomentum.current = true;
           }
         }}
        refreshControl={(
            <RefreshControl
              tintColor={THEME.white} // iOS
              colors={[THEME.white, THEME.white, THEME.white]} // Android
              progressBackgroundColor={THEME.white} // Android background
              refreshing={refreshing} 
              onRefresh={onRefresh}
               />
          )}
         ListFooterComponent={() =>
           isPending && request.length > 0 ? <LoaderOnly /> : null
         }
         ListEmptyComponent={() => {
           if (isSearching || isPending ) {
             return <LoaderOnly />;
           }


           return (
             <Text style={styles?.txtEmptyTxt}>
               No request found
             </Text>
           );
         }}
       />
     </View>

   </MainContainer>
 );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(15),
    marginTop: handleSize.h(10),
  },
  filtersearchContainer: {
    marginVertical: handleSize.h(10),
  },
  item: {
    backgroundColor: "#252c57",
    flexDirection: 'row',
    marginVertical: handleSize.h(4),
    borderRadius: handleSize.f(10),
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  rightSide: {
    width: '75%',
    paddingTop: handleSize.f(15),
    paddingRight: handleSize.f(15),
    paddingBottom: handleSize.f(15),
  },
  iconCONTContainer:{
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCONT:{
    width: handleSize.f(45),
    height: handleSize.f(45),
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.f(12),
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  txt13: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  txt10: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  txt16:{
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  midTxt:{
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginVertical: handleSize.h(5),
    lineHeight: handleSize.h(16),
    width: '80%',
  },
  subname: {
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  amount: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  innerinput: {  
    height: handleSize.h(56),
    paddingLeft: handleSize.w(20),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour), 
    color: THEME.white,
    justifyContent: "center",
  },
  imgViewLeft: {
    width: handleSize.w(35),
    height: handleSize.h(56),
    position: 'absolute',
    left: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
   txtEmptyTxt: {
   fontSize: handleSize.f(FONT_SIZES.onesix),
   fontFamily: FONTFAMILY.Regular,
   color: THEME.white,
   marginBottom: handleSize.h(10),
   textAlign: 'center',
 },


});






// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { BottomSheet, MainContainer } from '../../../../components';
// import TransactionFilter from '../../../../components/bottomSheet/transactionFilter';
// import InputField from '../../../../components/textInput';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
// import useTransactionHistoryViewModel from '../../../../viewModels/homeViewModel/card/useTransactionHistoryViewModel';
// import Metrics from '../../../../styles/metrics';
// import { scale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { HOME_ROUTES } from '../../../../constants';
// import StatusBarManager from '../../../../components/statusBarManager';
// import { handleSize } from '../../../../config/responsiveTheme';
// import { REQUEST_DATA } from '../../../../utils/data';

// export default function Request() {
//   const {
//     DATA,
//     cardName,
//     onSearch,
//     cardDetailRef,
//     pressBackArrow,
//     closeFilterSheet
//   } = useTransactionHistoryViewModel();

//   const navigation = useNavigation()

//   function renderFilter() {
//     return (
//         <InputField
//           removeTitle={true}
//           textInputStyle={styles.innerinput}
//           imgViewLeft={styles.imgViewLeft}
//           imageLeft={'search-outline'}
//           imagetintColorLeft={THEME.white}
//           // image={'search-outline'}
//           autoCapital={'none'}
//           blurOnSubmit={false}
//           placeholder="Search"
//           value={cardName}
//           onChangeText={onSearch}
//           keyboardType={'default'}
//           imagetintColor={THEME.white}
//           customInpStyle={styles.innerinput}
//         />
//     );
//   }

//   function handleonPress(item: any) {
//     if (item.type == "payment") {
//       navigation.navigate(HOME_ROUTES.ADMIN_PAYMENT_STATUS)      
//     } else if (item.type == "beneficiary") {
//       navigation.navigate(HOME_ROUTES.ADMIN_BENEFICIAY_STATUS)      
//     } else if (item.type == "cardcreated") {
//       navigation.navigate(HOME_ROUTES.ADMIN_CARD_STATUS)      
//     }
//   }

//   function renderTransactions() {
//     return (
//       <FlatList
//         data={REQUEST_DATA}
//         keyExtractor={(item: any) => item?.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={()=>{ handleonPress(item) }} style={styles.item}>
//             <View style={styles.iconCONTContainer}>
//               <View style={styles.iconCONT}>
//                 <Icon name={item.icon} size={handleSize.f(22)} color={THEME.textPrimary} />
//               </View>
//             </View>

//             <View style={styles.rightSide}>
//               <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                 <Text style={styles.txt16}>{item.title}</Text>
//                 <Text style={styles.txt13}>{item.status}</Text>
//               </View>

//               <View>
//                 <Text style={styles.midTxt}>{item.message}</Text>
//               </View>

//               <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: handleSize.h(10) }}>
//                 <Text style={styles.txt10}>{item.date}</Text>
//                 <Text style={styles.txt10}>By: {item.by}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={{ paddingBottom: handleSize.h(140), marginTop: handleSize.h(10) }}
//       />
//     );
//   }

//   return (
//     <MainContainer
//       refreshingeffect={false}
//       showBackArrow={true}
//       pressBackArrow={pressBackArrow}
//       isFlatList={false}
//       barStyle="dark-content"
//       mainContainerStyle={styles.container}
//     >
//       <StatusBarManager
//         backgroundColor={THEME.darkSecondary} 
//         barStyle="light-content" 
//       />

//       <View style={{ marginHorizontal: handleSize.w(20) }}>
//         <Text style={styles.title}>Request</Text>
//         {renderFilter()}
//         {renderTransactions()}

//         <BottomSheet
//           height={550}              // minimum height
//           maxHeightPercent={0.8}   // optional, override for screen
//           draggable={false}
//           openTime={500} 
//           closeDuration={500}
//           bottomSheetRef={cardDetailRef}
//         >
//           <TransactionFilter style={{ marginHorizontal: handleSize.w(20) }} onPress={closeFilterSheet} />
//         </BottomSheet>
//       </View>
//     </MainContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: THEME.white },
//   title: {
//     fontSize: handleSize.f(FONT_SIZES.onesix),
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//     marginBottom: handleSize.h(15),
//     marginTop: handleSize.h(10),
//   },
//   filtersearchContainer: {
//     marginVertical: handleSize.h(10),
//   },
//   item: {
//     backgroundColor: "#252c57",
//     flexDirection: 'row',
//     marginVertical: handleSize.h(4),
//     borderRadius: handleSize.f(10),
//   },
//   sectionLeft: { flexDirection: 'row', alignItems: 'center' },
//   rightSide: {
//     width: '80%',
//     padding: handleSize.f(10),
//   },
//   iconCONTContainer:{
//     width: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconCONT:{
//     width: handleSize.f(45),
//     height: handleSize.f(45),
//     backgroundColor: THEME.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: handleSize.f(12),
//   },
//   name: {
//     fontSize: handleSize.f(FONT_SIZES.onefour),
//     fontFamily: FONTFAMILY.Light,
//     color: THEME.white,
//   },
//   txt13: {
//     fontSize: handleSize.f(FONT_SIZES.onetwo),
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//   },
//   txt10: {
//     fontSize: handleSize.f(FONT_SIZES.oneZero),
//     fontFamily: FONTFAMILY.Regular,
//     color: THEME.white,
//   },
//   txt16:{
//     fontSize: handleSize.f(FONT_SIZES.onesix),
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//   },
//   midTxt:{
//     fontSize: handleSize.f(FONT_SIZES.onetwo),
//     fontFamily: FONTFAMILY.Light,
//     color: THEME.white,
//     marginVertical: handleSize.h(5),
//     lineHeight: handleSize.h(16),
//     width: '80%',
//   },
//   subname: {
//     fontSize: handleSize.f(FONT_SIZES.oneZero),
//     fontFamily: FONTFAMILY.Light,
//     color: THEME.white,
//   },
//   amount: {
//     fontSize: handleSize.f(FONT_SIZES.onesix),
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.white,
//   },
//   innerinput: {  
//     height: handleSize.h(56),
//     paddingLeft: handleSize.w(20),
//     fontFamily: FONTFAMILY.Regular,
//     fontSize: handleSize.f(FONT_SIZES.onefour), 
//     color: THEME.white,
//     justifyContent: "center",
//   },
//   imgViewLeft: {
//     width: handleSize.w(35),
//     height: handleSize.h(56),
//     position: 'absolute',
//     left: handleSize.w(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,
//   },
// });