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
import { freezUnFreezCard, useLogin } from '../../../queries/auth.query';
import { useReplaceCard } from '../../../queries/card.query';
import { Toast } from '../../../utils';

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={{ flexDirection: "row" }} >
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);


const ReplaceCard = (props: any) => {

  const navigation = useNavigation()
  const [reason, setreason] = useState("");
  const [firstName, setfirstName] = useState("");

  const { mutate: useReplaceCardFunc, isPending } = useReplaceCard({
    callback: (response: any) => {
      navigation.goBack()
    }
  });

  const {mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard} = freezUnFreezCard({
      callback: (response: any) => {
        
      // must add resaon field
      let payload = {
        card_id: props?.route?.params?.cardDetail?.card_id,
        emboss_name: firstName,
        format: "virtual"
      }
      useReplaceCardFunc(payload)
      },
    });
    
    
  function pressBackArrow() {
    navigation.goBack()
  }

  function renderField() {
    return (
      <View>

        <View style={styles.pickerWrapper}>
          <Picker
                      dropdownIconColor={THEME.white}
            selectedValue={reason}
            onValueChange={itemValue => setreason(itemValue)}
            style={styles.inputInnerPicker}
          >
            <Picker.Item label="Reason for Replacement" value="" color={THEME.white} />
            <Picker.Item label="snetched" value="snetched" color={THEME.white} />
            <Picker.Item label="broken" value="broken" color={THEME.white} />
          </Picker>
        </View>

        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Full Name"
          value={firstName}
          onChangeText={setfirstName}
          keyboardType={'default'}
          margBtm={20}
        />
      </View>
    )
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <Text style={styles.labelHead}>Cards will be sent to your default address:</Text>
        <InfoRow icon="card-outline" label="Address" value="221B Baker Street" />
        <InfoRow icon="person-outline" label="City" value="London" />
        <InfoRow icon="home-outline" label="Postal Code" value="NW1 6XE" />
        <InfoRow icon="time-outline" label="Country" value="United Kingdom" />
        <View style={styles.botmLine} ></View>
        <Text style={styles.valueChangeTxt}>Change Address</Text>
      </View>
    )
  }

  function renderWarning() {
    return (
      <View style={styles.containerAlert} >
        <View style={styles.ICONcONT} >
          <Icon name={'alert-circle-outline'} size={30} color={THEME.prinkishBlue} />
        </View>
        <Text style={styles.descriptionbelow}>
          Your existing card will be disabled when the new one is activated.
          If this card is lost or stolen, freeze it immediately.
        </Text>
      </View>
    )
  }

  function reqReplacement() {

    if (reason == "") {
      Toast.showToast("Please Select Reason for Replacement", '', 'error');
    } 
    else if(firstName == ""){
      Toast.showToast("Please enter you name", '', 'error');
    }
    else {

    let payload = {
      card_id: props?.route?.params?.cardDetail?.card_id,
      status: 'lost',
      note: 'Card is lost'
    }

    console.log("payload==>",payload);
    
    freezUnFreezCardFunc(payload)    
    }
  }

  function renderBtn() {
    return (
      <CustomButton
        btnContSty={styles.forgetTxt}
        loading={isPending || isPendingfreezUnFreezCard}
        title="Request Replacement"
        onPress={() => {
          reqReplacement()
        }}
      />

    )
  }

  return (
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 20 }} >

        <Text style={styles.title}>Replace Card</Text>
        <Text style={styles.subtitle}>Request a new card to replace your current one. Your old card will be deactivated once the new card is activated.</Text>

        {renderField()}
        {renderCardDetails()}
        {renderWarning()}
        {renderBtn()}

      </View>
    </MainContainer>
  )
}

export default ReplaceCard;

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


  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
  },
  labelHead: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    marginVertical: 5
  },
  botmLine:
    { height: 1, backgroundColor: THEME.lightGray },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: {
    // backgroundColor: THEME.lightGrey,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },
  valueChangeTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.prinkishBlue,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5
  },
  summaryBox: {
    backgroundColor: THEME.textPrimary,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10
  },



  containerAlert: {
    backgroundColor: THEME.textPrimary,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    marginLeft: 10,
    flex: 1,
  },
  okButton: {
    backgroundColor: '#e184ff',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 12,
  },
  ICONcONT: {
    width: scale(36),
    height: scale(36),
    backgroundColor: THEME.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
