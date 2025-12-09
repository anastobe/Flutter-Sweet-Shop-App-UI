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
import { useAdminBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/Admin/adminBeneficiaryStatusViewModel';
import Metrics from '../../../../styles/metrics';
import { SHOW_CLIENT } from '../../../../APICall/constants';
import BluryModal from '../../../../components/Modal/bluryModal';
import { Images } from '../../../../config';
import { handleSize } from '../../../../config/responsiveTheme'; // import handleSize
import StatusBarManager from '../../../../components/statusBarManager';

const AdminBeneficiaryStatus = () => {
  const vm = useAdminBeneficiariesManagementViewModel();

  const renderTransactionType = () => (
    <View>
      <Text style={styles.checkmarkTitle}>Select Beneficiary Type</Text>
      {vm.BENEFICIARY_TYPES.map((item) => (
        <View key={item.key} style={styles.row}>
          <TouchableOpacity
            style={[styles.boxShape, { borderColor: THEME.white }]}
            onPress={() => vm.handlePressType(item.key)}
          >
            {vm.checked === item.key && (
              <Icon name="checkmark" size={ handleSize.f(13)} color={THEME.white} />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderInputFields = () => (
    <View>
      <InputField
        margBtm={10}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Beneficiary Name"
        value={vm.beneficiaryName}
        onChangeText={vm.setBeneficiaryName}
      />

      <InputField
        placeholder="IBAN / Account No."
        value={vm.accountNo}
                // customInpStyle={styles.forgetTxt}
        onChangeText={vm.setAccountNo}
      />

      <InputField
       margTp={10}
         margBtm={10}
        placeholder="SWIFT/BIC (optional)"
        value={vm.bicNo}
        onChangeText={vm.setBicNo}
      />

      <InputField
        disabled={false} 
        placeholder="To Account"
        value={vm.country} 
        enableDropdown={true}
        dropdownData={[
          { name: "Pak" },
          { name: "China" },
        ]} 
        margBtm={10}
      isOpen={vm.openDropdown === 'acc_type'} 
        onToggleDropdown={() => vm.toggleDropdown('acc_type')}
        onDropdownSelect={(item:any )=> vm.setCountry(item.name)}
      />

    

    </View>
  );


      function renderPopup(icon: any,title: any,btnTxt: any, whichModal: Boolean) {
    return (
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={()=>{
          if (!whichModal) {
            vm.setOpen(!vm.open)
          }else{
            vm.setOpen2(!vm.open2)
          }
        }}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* <View style={styles.iconCircle}>
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View> */}

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={[styles.button,{ backgroundColor: !whichModal ? THEME.medRed : THEME.primary }]}
          title={btnTxt}
          showmyStyleOnly={true}
          txtColor={[styles.buttonText,{ color: !whichModal ?  THEME.white : THEME.textPrimary }]}
           onPress={()=>{
            
     Alert.alert("NEED",SHOW_CLIENT)
          if (!whichModal) {
            vm.setOpen(!vm.open)
          }else{
            vm.setOpen2(!vm.open2)
          }
        }}
        />
      </View>
    );
  }
  
  function renderAccept() {
    return ( 
      <Modal
        isVisible={vm.open}
        isKeyboardAvoidingView={true}
        // children={renderPopup("alert-outline","Are you sure you want to reject","Yes",false)} 
        children={
          <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
            backImg={Images.addCardGradient}
            visible={vm.open}
            onClose={() => vm.setOpen(false)}
            btnLoader={false}
            marginTopTitle={40}
            onConfirm={() =>{
               Alert.alert("NEED",SHOW_CLIENT)
              vm.setOpen(!vm.open)
            }}
            showSubBody={false} 
            showCancelBtn={false}
            downConfirmText={'Cancel'}
            title={'Are you sure you want to reject'}
            body={''}
            subBody={
              'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
            }
            iconName={"alert-outline"}
            confirmText={'Yes'}
          />
        }
        onClose={vm.setOpen}
      />
    );
  }
  
  function renderReject() {
  return (
    <Modal
      isVisible={vm.open2}
      isKeyboardAvoidingView={true}
      // children={renderPopup("checkmark-outline","Are you sure you want to accept","Yes",true)} 
      children={
        <BluryModal
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          backImg={Images.addCardGradient}
          visible={vm.open2}
          onClose={() => vm.setOpen2(false)}
          btnLoader={false}
          marginTopTitle={40}
          onConfirm={() =>{
              Alert.alert("NEED",SHOW_CLIENT)
            vm.setOpen2(!vm.open2)
          }}
          showSubBody={false} 
          showCancelBtn={false}
          downConfirmText={'Cancel'}
          title={'Are you sure you want to accept'}
          body={''}
          subBody={
            'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.'
          }
          iconName={"checkmark-outline"}
          confirmText={'Yes'}
        />
      }
      onClose={vm.setOpen2}
    />
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
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Beneficiary</Text>
          <Text style={styles.subtitle}>
Please review and confirm the beneficiary details before proceeding
          </Text>

          {renderInputFields()}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: handleSize.h(50) }} >
         <CustomButton
            btnContSty={styles.transferBtnReject}
            loading={false}
            txtColor={styles.btnStyle}
            showmyStyleOnly={true}
            title="Reject"
            onPress={()=>{ vm.setOpen(!vm.open) }}
          />

          <CustomButton
            btnContSty={styles.transferBtnAccept}
            loading={false}
            txtColor={styles.btnStyle2}
            showmyStyleOnly={true} 
            title="Accept"
            onPress={()=>{ vm.setOpen2(!vm.open2) }}
          />
            </View>

            {renderAccept()}
            {renderReject()}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default AdminBeneficiaryStatus;

const styles = StyleSheet.create({
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
    marginBottom: handleSize.h(30),
    lineHeight: handleSize.h(20),
  },
  container: { flex: 1, backgroundColor: THEME.white },
  checkmarkTitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginVertical: handleSize.h(10),
  },
  btnStyle: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
  },
  btnStyle2: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
    lineHeight: handleSize.h(20),
  },
  transferBtnReject: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(50),
    width: handleSize.w(Metrics.width / 2 - 30),
    borderColor: THEME.white,
    borderWidth: handleSize.f(1.5),
  },
  transferBtnAccept: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(50),
    width: handleSize.w(Metrics.width / 2 - 30),
  },
  boxShape: { 
    width: handleSize.w(20), 
    height: handleSize.h(20), 
    borderWidth: handleSize.f(1.5), 
    borderRadius: 50,
    justifyContent: "center", 
    alignItems: 'center' 
  },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: handleSize.h(4) },
  label: {
    marginLeft: handleSize.w(8),
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
  },
  pickerWrapper: {
    borderWidth: handleSize.f(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    height: handleSize.h(56),
    marginBottom: handleSize.h(10),
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.gray,
    borderWidth: handleSize.f(1),
    borderRadius: handleSize.f(16),
    color: THEME.white,
    height: handleSize.h(56),
    marginLeft: handleSize.w(10),
  },
  forgetTxt: { marginTop: handleSize.h(10), marginBottom: handleSize.h(10) },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
    borderRadius: handleSize.f(16),
    padding: handleSize.f(24),
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: 100,
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
    marginTop: handleSize.h(50),
  },
  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
  button: {
    borderRadius: handleSize.f(10),
    justifyContent: "center",
    alignItems: 'center',
    height: handleSize.h(56),
    width: '100%',
    marginTop: handleSize.h(20),
  },
  buttonText: {
    fontFamily: FONTFAMILY.Regular,
   fontSize: handleSize.f(FONT_SIZES.oneeight),
  },
});
