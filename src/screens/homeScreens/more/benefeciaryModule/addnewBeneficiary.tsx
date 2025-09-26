import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MainContainer, Modal } from '../../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../../constants';
import InputField from '../../../../components/textInput';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../../../components/customButton';

const AddnewBeneficiary = () => {

  const navigation = useNavigation()
  const [checked, setChecked] = useState('frontier');
  const [beneficaryName, setBeneficaryName] = useState()
  const [accountType, setaccountType] = useState()
  const [accountNo, setaccountNo] = useState()
  const [bicNo, setBicNo] = useState()
  const [Open, setOpen] = useState(false)
  const [country, setcountry] = useState()
  const [currency, setcurrency] = useState()

  function pressBackArrow() {
    navigation.goBack()
  }

  const handlePress = (key: any) => {
    setChecked(key);
  };

  function onPressBtn() {
    setOpen(true)   
  }

  function transactionTypeSelection() {
    return (
      <View>
        <Text style={styles.checkmarkTitle} >Select Beneficiary Type</Text>
        {[
          { key: 'frontier', label: 'Frontier Pay User (by @username, email, or phone)' },
          { key: 'bank', label: 'Bank Account' },
        ].map((item) => {
          let checkedValue = checked[item.key]
          return (
            <View key={item.key} style={styles.row}>
              <TouchableOpacity style={[styles.boxShape, { borderColor:  THEME.white }]} onPress={() => handlePress(item.key)} >{
                checked === item.key ? 
                  <Icon name="checkmark" size={15} color={THEME.white} />
                  : null
              }
              </TouchableOpacity>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  function renderInputField() {
    return (
      <View>
       <Text style={styles.checkmarkTitle} >Beneficiary Details</Text>
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Beneficiary Name"
          value={beneficaryName}
          onChangeText={setBeneficaryName}
          keyboardType={'default'}
          margBtm={20}
        />


        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={currency}
            onValueChange={itemValue => setcurrency(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Account Type" value="" color={THEME.textPrimary} />
            <Picker.Item label="current" value="current" color={THEME.textPrimary} />
            <Picker.Item label="saving" value="savings" color={THEME.textPrimary} />
          </Picker>
        </View>

                <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="IBAN / Account No."
          value={accountNo}
          onChangeText={setaccountNo}
          keyboardType={'default'}
          margBtm={20}
        />


                <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="SWIFT/BIC (optional)"
          value={bicNo}
          onChangeText={setBicNo}
          keyboardType={'default'}
          margBtm={20}
        />



        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={bicNo}
            onValueChange={itemValue => setBicNo(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Country" value="" color={THEME.textPrimary} />
            <Picker.Item label="Pak" value="main" color={THEME.textPrimary} />
            <Picker.Item label="America" value="savings" color={THEME.textPrimary} />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={bicNo}
            onValueChange={itemValue => setBicNo(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Currency" value="" color={THEME.textPrimary} />
            <Picker.Item label="Main Account" value="main" color={THEME.textPrimary} />
            <Picker.Item label="Savings" value="savings" color={THEME.textPrimary} />
          </Picker>
        </View>

      </View>
    )
  }

    function renderPOPUP() {
    return(
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeBtn} onPress={()=>{ setOpen(false) }} >
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
            onPress={() => {
            setOpen(false)
            }}
          />

        </View>
   
    )
  }

      function renderModal() {
        return (
          <Modal

            isVisible={Open}
            isKeyboardAvoidingView={true}
            children={renderPOPUP()}
            onClose={() => {
              console.log('close');
            }}
          />
        );
      }


    function renderBtn() {
      return(
        <View>
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Save Beneficiary"
        loading={false}
        onPress={() => {
          onPressBtn()
        }}
      />
        </View>
      )
    }
  return (
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={false} barStyle="dark-content" mainContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} >
      <View style={{ marginHorizontal: 20 }} >
        <Text style={styles.title}>Add Beneficiary</Text>
        <Text style={styles.subtitle}>Save recipient details for quicker payments in the future.</Text>
        {transactionTypeSelection()}
        {renderInputField()}
        {renderBtn()}
        {renderModal()}

      </View>
      </ScrollView>
    </MainContainer>
  )
}

export default AddnewBeneficiary;

const styles = StyleSheet.create({
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
  },
  subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30
  },
    forgetTxt:
  { marginTop: 20, marginBottom: 50 },
  container: { flex: 1, backgroundColor: THEME.white },


  checkmarkTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginVertical: 10,
    marginBottom: 10
  },
  boxShape:
    { width: 20, height: 20, borderWidth: 1.5, borderRadius: 50 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    marginLeft: 8,
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 16,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },

    inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 16,
    // width: METRICS.width - 45,
    color: THEME.white,
    height: scale(60),
    marginLeft: 10,
  },


  
     modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: FONT_SIZES.foureight,
    color: THEME.white,
  },
  iconCircle: {
    backgroundColor:THEME.primary,
    borderRadius: 100,
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  forgetTxtpop:{
width: '100%',
marginTop: 30, marginBottom: 20 
  },
  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twosix,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',

  },
});
