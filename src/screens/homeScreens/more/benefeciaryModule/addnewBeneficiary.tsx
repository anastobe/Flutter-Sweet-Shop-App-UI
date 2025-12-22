import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { MainContainer, Modal } from '../../../../components';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useAddNewBeneficiaryViewModel } from '../../../../viewModels/homeViewModel/more/useAddNewBeneficiaryViewModel';
import FreezeCardModal from '../../../../components/Modal/FreezeCardModal ';
import { Images } from '../../../../config';
import Metrics from '../../../../styles/metrics';
import BluryModal from '../../../../components/Modal/bluryModal';
import { SHOW_CLIENT } from '../../../../APICall/constants';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';
import { BENEFICIARY_ADD_FOR, BENEFICIARY_KEY_FOR } from '../../../../utils/data';

const AddNewBeneficiary = () => {
  const vm = useAddNewBeneficiaryViewModel();

    //   countryList,
    // currencyList,
    // accountTypeList
  const renderTransactionType = () => (
    <View>
      <Text style={styles.checkmarkTitle}>Select Beneficiary Type</Text>
      {vm.BENEFICIARY_TYPES.map((item) => (
        <View key={item.key} style={styles.row}>
          <TouchableOpacity
            style={[styles.boxShape, { borderColor:vm.checked === item.key ? THEME.primary : THEME.white }]}
            onPress={() => vm.handlePressType(item.key)}
          >
            {vm.checked === item.key && (
              <Icon name="checkmark" size={handleSize.f(13)} color={THEME.primary} />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderInputFields = () => (
    <View>
      <Text style={styles.checkmarkTitleDown}>Beneficiary Details</Text>

      <InputField
        margBtm={23}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="First Name"
        value={vm.firstName}
        onChangeText={vm.setfirstName}
      />
      
      <InputField
        margBtm={23}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Last Name"
        value={vm.lastName}
        onChangeText={vm.setlastName}
      />

      <InputField
        margBtm={23}
        autoCapital={'none'}
        keyboardType={'email-address'}
        blurOnSubmit={false}
        placeholder="Email"
        value={vm.email}
        onChangeText={vm.setemail}
      />

      {/* <InputField
        disabled={false} 
        placeholder='Account Type'
        value={vm.accountType} 
        enableDropdown={true}
        dropdownData={vm.accountTypeList} 
        margBtm={23}
        isOpen={vm.openDropdown === 'acc_type'} 
        onToggleDropdown={() => vm.toggleDropdown('acc_type')}
        onDropdownSelect={(item:any )=> vm.setAccountType(item.name)}
      />     */}

      <InputField
        disabled={false} 
        placeholder='Select Beneficiary For'
        value={vm.selectBeneficiary}
        enableDropdown={true}
        dropdownData={vm.BENEFICIARY_ADD_FOR} 
        margBtm={23}
        isOpen={vm.openDropdown === 'beneficiary_for'} 
        onToggleDropdown={() => vm.toggleDropdown('beneficiary_for')}
        onDropdownSelect={(item:any )=>{
          vm.setselectBeneficiary(item.value)

          // console.log("ASDasdad=>",item.value, "--",BENEFICIARY_KEY_FOR.bank);
          // return

          if (item.value == BENEFICIARY_KEY_FOR.bank) {
            vm.setBicNo("")
          }
          else{
            vm.setAccountNo("")
          }
           }
          }
      />
      

      {vm.selectBeneficiary == BENEFICIARY_KEY_FOR.bank ?
        <InputField
        margBtm={23}
        placeholder="IBAN / Account No."
        value={vm.accountNo}
        returnKeyType="done"
                // customInpStyle={styles.forgetTxt}
        onChangeText={vm.setAccountNo}
      />
      :
      vm.selectBeneficiary === BENEFICIARY_KEY_FOR.international ?
      <InputField
        margBtm={23}
        placeholder="SWIFT/BIC (optional)"
        value={vm.bicNo}
        onChangeText={vm.setBicNo}
      /> 
      : null}

      {/* <InputField
        disabled={false} 
        placeholder="Select Country"
        value={vm.country} 
        enableDropdown={true}
        dropdownData={vm.countryList} 
        margBtm={23}
        isOpen={vm.openDropdown === 'country'} 
        onToggleDropdown={() =>{ vm.toggleDropdown('country') }}
        onDropdownSelect={(item:any )=> vm.setCountry(item.name)}
      /> */}

       <InputField
        disabled={false} 
        placeholder='Select Currency'
        value={vm.currency.name} 
        enableDropdown={true}
        dropdownData={vm.currencyList} 
        margBtm={23}
        isOpen={vm.openDropdown === 'currency'} 
        onToggleDropdown={() =>{ vm.toggleDropdown('currency') 
          // vm.setadjustScrollHeight(!vm.adjustScrollHeight)
        }}
        onDropdownSelect={(item:any )=> {
          vm.setCurrency({
            id: item?.id,
            name: item?.iso_code
          })
        }}
      />

    </View>
  );

  const renderPopup = () => (
    // <FreezeCardModal
    //     style={{ flex: 1, paddingHorizontal: 20 }}
    //     backImg={Images.addCardGradient}
    //     visible={vm.modalVisible}
    //     btnLoader={false}
    //     onClose={vm.onClosePopup}
    //     onConfirm={vm.pressTransferMoney}
    //     title="Beneficiary Added Successfully"
    //     body={`Beneficiary added successfully and is ready to use in payments.`}
    //     showSubBody={false}
    //     confirmText="Transfer Money"
    //     downConfirmText={"Cancel"}
    //   />


     <BluryModal
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          onClose={()=>{
            vm.onClosePopup()
            setTimeout(() => {
              vm.navigation.goBack()
            }, 500);
          }}
          btnLoader={false}
          marginTopTitle={40}
          onConfirm={vm.pressTransferMoney}
          showSubBody={false} 
          showCancelBtn={false}
          downConfirmText={'Cancel'}
          title={"Beneficiary Added Successfully"}
          body={`Beneficiary added successfully and is ready to use in payments.`}
          iconName={""}
          confirmText={"Transfer Money"}
      />


  );

  
         
  function renderPOPUP() {
    return(
        // <FreezeCardModal
        //   style={{ flex: 1, paddingHorizontal: 20 }}
        //   backImg={Images.addCardGradient}
        //   visible={vm.modalVisible}
        //   btnLoader={vm.isPending_AddnewBeneficiaryApi}
        //   onClose={() => vm.setModalVisible(false)}
        //   onConfirm={vm.onPressBtn}
        //   title="Save Beneficiary"
        //   body={`Sure, You want to add this beneficiary to your account?`}
        //   showSubBody={false}
        //   confirmText="Save"
        //   downConfirmText={"Cancel"}
        // />

        
        <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            onClose={() =>{
                if (vm.isPending_AddnewBeneficiaryApi) {
                  return
                }
                else{
                  vm.setModalVisible(false)}
                }
              }
            btnLoader={vm.isPending_AddnewBeneficiaryApi}
            marginTopTitle={40}
            onConfirm={vm.onPressBtn}
            showSubBody={false} 
            showCancelBtn={false}
            downConfirmText={'Cancel'}
            title={'Save Beneficiary'}
            body={`Sure, You want to add this beneficiary to your account?`}
            iconName={""}
            confirmText={'Save'}
          />
    )
  }
    


  function renderModal() {
      return (
        <>
        <Modal
          isVisible={vm.modalVisible}
          isKeyboardAvoidingView={true}
          children={renderPOPUP()}
          onClose={() => {
            console.log('close');
          }}
        />

        <Modal
          isVisible={vm.open}
          isKeyboardAvoidingView
          children={renderPopup()}
          onClose={vm.onClosePopup}
        />
        </>
      );
    }

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={vm.pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}     
    >
      
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <ScrollView contentContainerStyle={{ paddingBottom: handleSize.h(80) }}> 
        <View style={{ marginHorizontal: handleSize.w(20) }}>
          <Text style={styles.title}>Add Beneficiary</Text>
          <Text style={styles.subtitle}>
            Save recipient details for quicker payments in the future.
          </Text>

          {/* {renderTransactionType()} */}
          {renderInputFields()}
        </View>
        {renderModal()}
          <CustomButton
            btnContSty={styles.forgetTxt}
            title="Save Beneficiary"
            loading={false}
            onPress={vm.openConfirmationModal}
            />
      </ScrollView>
            
        {/* <View style={{ backgroundColor: "#0e1546", width: Metrics.width, position: "absolute", bottom: 0, alignSelf: "center" }} > */}
        {/* </View> */}

    </MainContainer>
  );
};


        //  <BluryModal
        //     style={{ flex: 1, paddingHorizontal: 20 }}
        //     backImg={Images.addCardGradient}
        //     visible={vm.modalVisible}
        //     onClose={() => vm.setModalVisible(false)}
        //     btnLoader={false}
        //     marginTopTitle={40}
        //     onConfirm={() => {
        //       Alert.alert('NEED', SHOW_CLIENT);
        //       vm.setModalVisible(!vm.modalVisible);
        //     }}
        //     showSubBody={false}
        //     showCancelBtn={false}
        //     downConfirmText={'Cancel'}
        //     title={'Are you sure you want to reject'}
        //     body={''}
        //     subBody={
        //       'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
        //     }
        //     iconName={'alert-outline'}
        //     confirmText={'Yes'}
        //   />
export default AddNewBeneficiary;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(24),
    lineHeight: handleSize.h(20),
  },

  checkmarkTitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginBottom: handleSize.h(18),
  },
  checkmarkTitleDown: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginBottom: handleSize.h(14),
    marginTop: handleSize.h(0),
  },

  boxShape: {
    width: handleSize.w(20),
    height: handleSize.h(20),
    borderWidth: 1.5,
    borderRadius: handleSize.f(50),
    justifyContent: "center",
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: handleSize.h(4),
  },
  label: {
    marginLeft: handleSize.w(8),
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(18),
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    height: handleSize.h(56),
    marginBottom: handleSize.h(10),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },

  forgetTxt: {
    marginTop: handleSize.h(10),
    marginBottom: handleSize.h(20),
    marginHorizontal: handleSize.w(20),
  },

  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.98)',
    borderRadius: handleSize.f(16),
    padding: handleSize.f(24),
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },

  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },

  forgetTxtpop: { width: '100%', marginTop: handleSize.h(30), marginBottom: handleSize.h(20) },

  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(10),
  },

  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
});