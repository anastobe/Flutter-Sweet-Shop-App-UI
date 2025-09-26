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


const SetLimits = () => {

    const navigation = useNavigation()
    const [limitType, setLimitType] = useState('Weekly');
    const [reason, setreason] = useState("");
    const [spendingLimit, setSpendingLimit] = useState('');

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderLimitType() {
      return(
        <View>
        <Text style={styles.label}>Limit Type</Text>
      <View style={styles.radioRow}>
        {['Daily', 'Weekly', 'Monthly'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setLimitType(type)}
            style={styles.radioOption}
          >
            <View style={[styles.radio,{ borderColor: limitType === type ? THEME.prinkishBlue : THEME.gray }]} >
               {limitType === type && <Icon name="checkmark-outline" size={18} color={THEME.prinkishBlue} />}
            </View>
            <Text style={[styles.radioLabel,{ fontFamily: limitType === type ? FONTFAMILY.Medium : FONTFAMILY.Light  }]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </View>
      )
    }

    function renderlimitType() {
      return(
      <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false} 
          placeholder="Spending Limit"
          value={spendingLimit}
          onChangeText={setSpendingLimit}
          keyboardType={'numeric'}
          margBtm={20}
        />
      )}

    function renderlimitandBTN() {
      return(
        <View>
                 <View style={styles.limitInfo}>
        <Text style={styles.limitTitle}>{limitType} Limit</Text>
        <Text style={styles.limitDetail}>
          You've set a limit of <Text style={styles.boldText}> €{spendingLimit || '0'}/{limitType.toLowerCase()} </Text> for this card.
        </Text>
        <Text style={styles.limitNote}>
          This means your card won’t allow spending above this amount within a calendar month.
        </Text>
      </View>

        </View>
      )
    }

    function renderBtn() {
        return(
        <CustomButton
        btnContSty={styles.forgetTxt}
        title="Save Limit"
        onPress={() => {
          console.log("Login pressed");
        }}
      />

        )
    }

    return (
        <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
            <View style={{ marginHorizontal: 20 }} >

                <Text style={styles.title}>Set Daily Spending Limit</Text>
                <Text style={styles.subtitle}>Control how much can be spent from this card per day.</Text>

                <View style={styles.pickerWrapper}>
                    <Picker
                                dropdownIconColor={THEME.white}
                    selectedValue={reason}
                    onValueChange={itemValue => setreason(itemValue)}
                    style={styles.inputInnerPicker}
                    >
                    <Picker.Item label="Select Card" value="" color={THEME.white} />
                    <Picker.Item label="Business Visa (•••• 1234)" value="Business Visa (•••• 1234)" color={THEME.white} />
                    <Picker.Item label="Visa Card (•••• 4321)" value="Visa Card (•••• 4321)" color={THEME.white} />
                    <Picker.Item label="Business Visa (•••• 1232)" value="Business Visa (•••• 1232)" color={THEME.white} />
                    <Picker.Item label="Visa Card (•••• 4232)" value="Visa Card (•••• 4232)" color={THEME.white} />
                    </Picker>
                </View>


                {renderLimitType()}
                {renderlimitType()}
                {renderlimitandBTN()}
                {renderBtn()}

            </View>
        </MainContainer>
    )
}

export default SetLimits;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.white },
    title:
    {
        fontSize: FONT_SIZES.threetwo,
        fontFamily: FONTFAMILY.Light,
        color: THEME.primary,
        marginBottom: 10,
        marginTop: 10
    },
    subtitle:
    {
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Light,
        color: THEME.white,
        marginBottom: 20,
    },
      forgetTxt:
  { marginTop: 20, marginBottom: 20 },



  label: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  radioSelected: {
    backgroundColor: '#d08dfc',
    borderColor: '#d08dfc',
  },
  radioLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },

  
    limitInfo: {
    backgroundColor: THEME.textPrimary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  limitTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  limitDetail: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: 3
  },
  boldText: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    backgroundColor: THEME.white,
  },
  limitNote: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
        color: THEME.white,
        marginTop: 5
  },
    pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.gray,
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
