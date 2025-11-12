import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { MainContainer, Modal } from '../../../../components';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useAddNewBeneficiaryViewModel } from '../../../../viewModels/homeViewModel/more/useAddNewBeneficiaryViewModel';

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
            style={[styles.boxShape, { borderColor: THEME.white }]}
            onPress={() => vm.handlePressType(item.key)}
          >
            {vm.checked === item.key && (
              <Icon name="checkmark" size={15} color={THEME.white} />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderInputFields = () => (
    <View>
      <Text style={styles.checkmarkTitle}>Beneficiary Details</Text>

      <InputField
        margBtm={10}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Beneficiary Name"
        value={vm.beneficiaryName}
        onChangeText={vm.setBeneficiaryName}
      />

      <InputField
        disabled={false} 
        placeholder='Account Type'
        value={vm.accountType} 
        enableDropdown={true}
        dropdownData={vm.accountTypeList} 
        margBtm={10}
        isOpen={vm.openDropdown === 'acc_type'} 
        onToggleDropdown={() => vm.toggleDropdown('acc_type')}
        onDropdownSelect={(item:any )=> vm.setAccountType(item.name)}
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
        placeholder="Select Country"
        value={vm.country} 
        enableDropdown={true}
        dropdownData={vm.countryList} 
        margBtm={10}
        isOpen={vm.openDropdown === 'country'} 
        onToggleDropdown={() => vm.toggleDropdown('country')}
        onDropdownSelect={(item:any )=> vm.setCountry(item.name)}
      />

       <InputField
        disabled={false} 
        placeholder='Select Currency'
        value={vm.currency} 
        enableDropdown={true}
        dropdownData={vm.currencyList} 
        margBtm={10}
        isOpen={vm.openDropdown === 'currency'} 
        onToggleDropdown={() => vm.toggleDropdown('currency')}
        onDropdownSelect={(item:any )=> vm.setCurrency(item.iso_code)}
      />

    </View>
  );

  const renderPopup = () => (
    <View style={styles.modal}>
      <TouchableOpacity style={styles.closeBtn} onPress={vm.onClosePopup}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Icon name="checkmark" size={36} color={THEME.textPrimary} />
      </View>

      <Text style={styles.titles}>Beneficiary Added Successfully</Text>
      <Text style={styles.description}>
        Beneficiary added successfully and is ready to use in payments.
      </Text>

      <CustomButton
        btnContSty={styles.forgetTxtpop}
        title="Transfer Money"
        onPress={vm.pressTransferMoney}
      />
    </View>
  );

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={vm.pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Add Beneficiary</Text>
          <Text style={styles.subtitle}>
            Save recipient details for quicker payments in the future.
          </Text>

          {renderTransactionType()}
          {renderInputFields()}

          <CustomButton
            btnContSty={styles.forgetTxt}
            title="Save Beneficiary"
            loading={vm.isPending_AddnewBeneficiaryApi}
            onPress={vm.onPressBtn}
          />

          <Modal
            isVisible={vm.open}
            isKeyboardAvoidingView
            children={renderPopup()}
            onClose={vm.onClosePopup}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default AddNewBeneficiary;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 20,
  },
  container: { flex: 1, backgroundColor: THEME.white },
  checkmarkTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginVertical: 10,
  },
  boxShape: { width: 20, height: 20, borderWidth: 1.5, borderRadius: 50 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  label: {
    marginLeft: 8,
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    height: scale(55),
    marginBottom: 10
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 16,
    color: THEME.white,
    height: scale(55),
    marginLeft: 10,
  },
  forgetTxt: { marginTop: 10, marginBottom: 10 },
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
  forgetTxtpop: { width: '100%', marginTop: 30, marginBottom: 20 },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.twotwo,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',
  },
});
