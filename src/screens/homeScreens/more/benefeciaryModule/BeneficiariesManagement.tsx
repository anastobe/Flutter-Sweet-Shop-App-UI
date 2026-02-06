
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
import { MainContainer, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import { LoaderOnly } from '../../../../components/activityIndicator';
import BluryModal from '../../../../components/Modal/bluryModal';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';
import InputField from '../../../../components/textInput';


const BeneficiariesManagement = () => {
 const {
   pressBackArrow,
   pressRightArrow,
   open,
   setOpen,
   onPressDelete,
   onPressDeleteBtn,
   onPressPayment,
   beneficiaries,
   onLoadMore,
   isPending,
   isSearching,
   isPendingDeleteBeneficiary,
   onSearch,
   search,
   userData,
   loginUserData,
   corporateMaker
 } = useBeneficiariesManagementViewModel();


 const onEndReachedCalledDuringMomentum = useRef(false);


 function renderItem({ item }: any) {
   const initials = `${item?.first_name} ${item?.last_name}`
     .split(' ')
     .map((n: any) => n[0])


    return (
      <LinearGradient
        colors={['#433c71ff', '#2c2d5e', '#272d5a']}
        style={styles.item}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: handleSize.f(12) }} >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>


        <View style={{ flex: 1,  }}>
          <Text style={styles.name}>
            {item?.first_name} {item?.last_name}
          </Text>
          <Text style={styles.currency}>
            {item?.currency?.iso_code || 'XXX'}  {corporateMaker ? `( ${item?.status} )` : null}
          </Text>
        </View>


        <TouchableOpacity
          style={styles.butnCont}
          onPress={() => onPressDelete(item)}
        >
          <Icon name="trash-outline" size={handleSize.f(18)} color={THEME.white} />
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.butnCont2}
          onPress={() => onPressPayment(item)}
        >
          <Icon name="arrow-forward-outline" size={handleSize.f(18)} color={THEME.white} />
        </TouchableOpacity>


        </View>
      </LinearGradient>
    );
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
       <Text style={styles.title}>Beneficiaries</Text>
       <Text style={styles.subtitle}>
         Manage your saved recipients for faster payments.
       </Text>


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


     <Modal isVisible={open} onClose={() => setOpen(false)}>
       <BluryModal
         onClose={() =>{
           if (isPendingDeleteBeneficiary) {
             return             
           }
           else{
           setOpen(false)
           }
         }}
         btnLoader={isPendingDeleteBeneficiary}
         onConfirm={onPressDeleteBtn}
         body="Are you sure you want to delete this beneficiary?"
         iconName="warning-outline"
         confirmText="Delete"
       />
     </Modal>
   </MainContainer>
 );
};


export default BeneficiariesManagement;




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
 item: {
   backgroundColor: THEME.textPrimary,
   borderRadius: handleSize.f(12),
   // padding: handleSize.h(12),
   // height: 100,
   marginBottom: handleSize.h(10),
 },
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


});


