import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { Auth_ROUTES } from '../../../constants';
import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';


const AddNewCurrencyAcount = () => {

    const navigation = useNavigation()
    const [AccountName, setAccountName] = useState("");
    const [currency, setcurrency] = useState("");
    const [modalAddCurrency, setmodalAddCurrency] = useState(false);
    const [requestSubmites, setrequestSubmites] = useState(false);

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderField() {
        return (
            <View>
                <InputField
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="Account Name"
                    value={AccountName}
                    onChangeText={setAccountName}
                    keyboardType={'numeric'}
                    margBtm={20}
                />

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={currency}
            onValueChange={itemValue => setcurrency(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Select Currency" value="" color={THEME.textPrimary} />
            <Picker.Item label="PKR" value="main" color={THEME.textPrimary} />
            <Picker.Item label="EURO" value="savings" color={THEME.textPrimary} />
          </Picker>
        </View>
            </View>
        )
    }

      function renderPOPUPStyle() {
    return(
        <FreezeCardModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          iconName={"checkmark-outline"}
          backImg={Images.addCardGradient}
          visible={modalAddCurrency}
          btnLoader={false}
          onClose={() => setmodalAddCurrency(false)}
          onConfirm={() => {
   setrequestSubmites(true)
          }}
          title="Do you want to Add New Currency?"
          body=""
          showSubBody={false}
          confirmText="Yes"
          downConfirmText={"No"}
        />
    )
  }

        function renderPOPUP() {
        return (
          <Modal
            isVisible={modalAddCurrency}
            isKeyboardAvoidingView={true}
            children={renderPOPUPStyle()}
            onClose={() => {
              console.log('close');
            }}
          />
        );
      }

     function renderPOPUPrequestSumitedStyle() {
    return(
        <FreezeCardModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          iconName={"checkmark-outline"}
          backImg={Images.addCardGradient}
          visible={requestSubmites}
          btnLoader={false}
          onClose={() => setrequestSubmites(false)}
          onConfirm={() => {
           setrequestSubmites(false)
          }}
          title="Account Request Submitted"
          body="Your request to open a new currency account has been submitted successfully. We’ll notify you once it’s approved and ready to use."
          showSubBody={false}
          confirmText="Yes"
          downConfirmText={"No"}
        />
    )
  }

        function renderPOPUPrequestSumited() {
        return (
          <Modal
            isVisible={requestSubmites}
            isKeyboardAvoidingView={true}
            children={renderPOPUPrequestSumitedStyle()}
            onClose={() => {
              console.log('close');
            }}
          />
        );
      }


    function renderBtn() {
        return(
        <CustomButton
        btnContSty={styles.forgetTxt}
        title="Add Currency"
        onPress={() => {
            setmodalAddCurrency(true)
        }}
      />

        )
    }

    return (
        <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
            <View style={{ marginHorizontal: 20 }} >

                <Text style={styles.title}>Add New Currency Account </Text>
                <Text style={styles.subtitle}>Select a Currency to create a new account in your wallet</Text>

                {renderField()}
                {renderBtn()}
                {renderPOPUP()}
                {renderPOPUPrequestSumited()}
            </View>
        </MainContainer>
    )
}

export default AddNewCurrencyAcount;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.white },
  title:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop:10
  },
    subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
  },
      forgetTxt:
  { marginTop: 20, marginBottom: 20 },


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

});
