import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MainContainer } from '../../../../components';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../../utils/data';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HOME_ROUTES } from '../../../../constants';
import InputField from '../../../../components/textInput';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../../../components/customButton';

const CurrencyExchange = () => {

  const navigation = useNavigation()
  const [sendFrom, setsendFrom] = useState('')
  const [reveiveIn, setreveiveIn] = useState('')

    function pressBackArrow() {
        navigation.goBack()
    }

    function onPressBtn() {
        navigation.navigate(HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE)
    }

    
    function renderRightInput() {
      return(
        <View
          style={styles.renderRightInputContainer}
        >
            <Text style={styles.inputNumber}>1000.00</Text>
            <View style={styles.inputNumbergbpcont} >
              <Text style={styles.inputNumbergbp}>GBP</Text>
            </View>
        </View>
      )
    }

    function renderInput() {
      return(
        <View>
        <InputField
          renderRightInput={renderRightInput}
          margTp={50}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Send From"
          value={sendFrom}
          onChangeText={setsendFrom}
          keyboardType={'default'}
          margBtm={20}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            dropdownIconColor={THEME.white}
            selectedValue={reveiveIn}
            onValueChange={itemValue => setreveiveIn(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item  label="Receive In" value="" color={THEME.textPrimary} />
            <Picker.Item label="account" value="account" color={THEME.textPrimary} />
            <Picker.Item label="cash" value="cash" color={THEME.textPrimary} />
          </Picker>
        </View>
        </View>
      )
    }

    function renderBtn() {
      return(
        <View>
      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Get Rate"
        loading={false}
        onPress={() => {
          onPressBtn()
        }}
      />
        </View>
      )
    }


    return(
      <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
        <View style={{ marginHorizontal: 20 }} >
        <Text style={styles.title}>Quick Currency Exchange</Text>
        <Text  style={styles.subtitle}>Convert currency instantly and view real-time rates before confirming your payment.</Text>
        {renderInput()}
        {renderBtn()}

      </View>
      </MainContainer>
    )
}

export default CurrencyExchange;

const styles = StyleSheet.create({
  title:
  {
    fontSize: FONT_SIZES.onefour,
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
  },
  renderRightInputContainer :{
    height: scale(55),
    position: 'absolute',
    right: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputNumber:{
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
  inputNumbergbpcont:{
    backgroundColor: THEME.primary,
    marginLeft: 6,
    borderRadius: 6,
    padding: 3
  },
  inputNumbergbp:{
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },
  container: { flex: 1, backgroundColor: THEME.white  },
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
  forgetTxt:
  { marginTop: 20, marginBottom: 50 },

});
