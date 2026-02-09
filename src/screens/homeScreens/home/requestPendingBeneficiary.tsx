import React, { useRef } from 'react';
import {
 FlatList,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import { LoaderOnly } from '../../../components/activityIndicator';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import InputField from '../../../components/textInput';
import { useRequestBeneficiaryViewModal } from '../../../viewModels/homeViewModel/home/useRequestBeneficiaryViewModal';
import { CommonUtils } from '../../../utils';
import { Auth_ROUTES } from '../../../constants';


export default function RequestPendingBeneficiary() {
 const {
   pressBackArrow,
   pressRightArrow,
   open,
   setOpen,
   onPressDelete,
   onPressPayment,
   beneficiaries,
   onLoadMore,
   isPending,
   isSearching,
   onSearch,
   search,
   navigation,
   userData,
   loginUserData
 } = useRequestBeneficiaryViewModal();


 const onEndReachedCalledDuringMomentum = useRef(false);


function handleonPress(item: any) {
  navigation.navigate(Auth_ROUTES.ADMIN_BENEFICIAY_STATUS, { Detail: item })     
}

  function renderItem({item}: any) {


    return (
      <TouchableOpacity onPress={() => { handleonPress(item) }} style={styles.item}>
        <View style={styles.iconCONTContainer}>
          <View style={styles.iconCONT}>
            <Icon name={'person-outline'} size={handleSize.f(22)} color={THEME.textPrimary} />
          </View>
        </View>

        <View style={styles.rightSide}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.txt16}>Beneficiary Request</Text>
            <Text style={styles.txt13}>{item?.status}</Text>
          </View>

          <View>
            <Text style={styles.midTxt}>Your have a new beneficiary request with name {item?.first_name} {item?.last_name}.</Text>
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
     pressRightArrow={pressRightArrow}
     showBackArrow
     pressBackArrow={pressBackArrow}
     mainContainerStyle={styles.container}
   >
     <StatusBarManager
       backgroundColor={THEME.darkSecondary}
       barStyle="light-content"
     />


     <View style={{ paddingHorizontal: handleSize.w(20), flex: 1 }}>
       <Text style={styles.title}>Request Pending Beneficiary</Text>


       {renderFilter()}


       <FlatList
         data={beneficiaries}
         renderItem={renderItem}
         showsVerticalScrollIndicator={false}
         keyExtractor={item => item.id}
         onEndReachedThreshold={0.3}
         onMomentumScrollBegin={() => {
           onEndReachedCalledDuringMomentum.current = false;
         }}
         onEndReached={() => {
           if (!onEndReachedCalledDuringMomentum.current) {
             onLoadMore();
             onEndReachedCalledDuringMomentum.current = true;
           }
         }}
         ListFooterComponent={() =>{
          return(
            <View style={{ marginBottom: 50 }} >
            {isPending && beneficiaries.length > 0 ? <LoaderOnly /> : null}
            </View>
          )
         }}
         ListEmptyComponent={() => {
           if (isSearching || isPending) {
             return <LoaderOnly />;
           }


           return (
             <Text style={styles.txtEmptyTxt}>
               No Beneficiary Found
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
   marginBottom: handleSize.h(10),
   marginTop: handleSize.h(10),
 },
 txtEmptyTxt: {
   fontSize: handleSize.f(FONT_SIZES.onesix),
   fontFamily: FONTFAMILY.Regular,
   color: THEME.white,
   marginBottom: handleSize.h(10),
   textAlign: 'center',
 },
 subtitle: {
   fontSize: handleSize.f(FONT_SIZES.onesix),
   fontFamily: FONTFAMILY.Regular,
   color: THEME.white,
   lineHeight: handleSize.h(20),
   marginBottom: handleSize.h(10),
   // marginBottom: handleSize.h(30),
 },
//  item: {
//    backgroundColor: THEME.textPrimary,
//    borderRadius: handleSize.f(12),
//    // padding: handleSize.h(12),
//    // height: 100,
//    marginBottom: handleSize.h(10),
//  },
 avatar: {
   width: handleSize.f(40),
   height: handleSize.f(40),
   borderRadius: handleSize.f(14),
   backgroundColor: THEME.primary,
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: handleSize.w(12),
   marginLeft: handleSize.w(5),
 },
 avatarText: {
   color: THEME.textPrimary,
   fontFamily: FONTFAMILY.Medium,
   fontSize: handleSize.f(FONT_SIZES.onesix),
   textTransform: "capitalize"
 },
 name: {
   fontSize: handleSize.f(FONT_SIZES.onefour),
   fontFamily: FONTFAMILY.SemiBold,
   color: THEME.white,
   lineHeight: handleSize.f(16),
   textTransform: "capitalize"
 },
 currency: {
   fontSize: handleSize.f(FONT_SIZES.onefour),
   fontFamily: FONTFAMILY.Light,
   color: THEME.white,
   marginTop: handleSize.f(4)
 },
 forgetTxtpop: {
   backgroundColor: THEME.primary,
   width: '100%',
   marginTop: handleSize.h(20),
   marginBottom: handleSize.h(20),
 },
 butnCont: {
   width: handleSize.w(35),
   height: handleSize.h(40),
   justifyContent: 'center',
   alignItems: 'center',
   marginRight:handleSize.w(5),
 },
 butnCont2:{
   width: handleSize.w(35),
   height: handleSize.h(40),
   justifyContent: 'center',
   alignItems: 'center',
   transform: [{ rotate: '-45deg' }],
   // backgroundColor: "red"
 },
 modal: {
   backgroundColor: 'rgba(64, 64, 65, 0.98)',
   borderRadius: handleSize.f(16),
   padding: handleSize.h(24),
   alignItems: 'center',
 },
 closeBtn: {
   position: 'absolute',
   top: handleSize.h(10),
   right: handleSize.w(15),
 },
 closeText: {
   fontSize: handleSize.f(FONT_SIZES.foureight),
   color: THEME.white,
 },
 iconCircle: {
   backgroundColor: THEME.primary,
   borderRadius: handleSize.f(100),
   width: handleSize.w(56),
   height: handleSize.h(56),
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: handleSize.h(10),
 },
 titles: {
   fontFamily: FONTFAMILY.Medium,
   fontSize: handleSize.f(FONT_SIZES.twotwo),
   color: THEME.white,
   textAlign: 'center',
   lineHeight: handleSize.h(30),
   marginTop: handleSize.h(20),
 },
 description: {
   marginTop: handleSize.h(10),
   fontFamily: FONTFAMILY.Regular,
   fontSize: handleSize.f(FONT_SIZES.onefour),
   color: THEME.white,
   textAlign: 'center',
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

 //renderItem
   item: {
    backgroundColor: "#252c57",
    flexDirection: 'row',
    marginVertical: handleSize.h(4),
    borderRadius: handleSize.f(10),
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
  rightSide: {
    width: '75%',
    paddingTop: handleSize.f(15),
    paddingRight: handleSize.f(15),
    paddingBottom: handleSize.f(15),
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


});
