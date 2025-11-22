// ReplaceCardView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import useReplaceCardViewModel from '../../../viewModels/homeViewModel/card/useReplaceCardViewModel';
import { REASON_OPTION } from '../../../utils/data';
import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';
import { Images } from '../../../config';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default function ReplaceCard(props) {
  const navigation = useNavigation();
  const {
    reason,
    setReason,
    firstName,
    setFirstName,
    isPending,
    isPendingFreezUnFreezCard,
    pressBackArrow,
    reqReplacement,
    toggleDropdown,
    openDropdown,
    loginUserData,
    modalVisible, 
    setModalVisible,
    openConfirmationModal,
  } = useReplaceCardViewModel(navigation, props);

  function renderField() {
    return (
      <View>

      <InputField
        disabled={false} 
        placeholder="Reason for Replacement" 
        value={reason} 
        enableDropdown={true}
        dropdownData={REASON_OPTION}
        margBtm={15}
        isOpen={openDropdown === 'currency'} 
        onToggleDropdown={() => toggleDropdown('currency')}
        onDropdownSelect={(item:any )=> setReason(item.label)}
      />
      
      
        <InputField
          marginTp={20}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Full Name"
          value={firstName}
          onChangeText={setFirstName}
          keyboardType={'default'}
          margBtm={20}
        />
      </View>
    );
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <Text style={styles.labelHead}>Cards will be sent to your default address:</Text>
        <InfoRow label="Address" value={loginUserData.address_line1  || "" + " " + loginUserData.address_line2 || "" + " " + loginUserData.address_line3 || "" }/>
        <InfoRow label="City" value="DUMMY" />
        <InfoRow label="Postal Code" value={loginUserData.postcode} />
        <InfoRow label="Country" value={loginUserData.county || ""}   />
        <View style={styles.botmLine}></View>
        <Text style={styles.valueChangeTxt}>Change Address</Text>
      </View>
    );
  }

  function renderWarning() {
    return (
      <View style={styles.containerAlert}>
        <View style={styles.ICONcONT}>
          <Icon name={'alert-circle-outline'} size={30} color={THEME.white} />
        </View>
        <Text style={styles.descriptionbelow}>
          Your existing card will be disabled when the new one is activated.
          If this card is lost or stolen, freeze it immediately.
        </Text>
      </View>
    );
  }

  function renderBtn() {
    return (
      <CustomButton
        btnContSty={styles.forgetTxt}
        loading={false}
        title="Request Replacement"
        onPress={reqReplacement}
      />
    );
  }

    
         
  function renderPOPUP() {
    return(
        <FreezeCardModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          backImg={Images.addCardGradient}
          visible={modalVisible}
          btnLoader={isPending || isPendingFreezUnFreezCard}
          onClose={() =>{ 
            if (isPending || isPendingFreezUnFreezCard) {
              console.log("not allow api call");
            }
            else{
              setModalVisible(false)
            }
          }}
          onConfirm={openConfirmationModal}
          title="Replace Card"
          body={`Sure, You want to replace this card?`}
          showSubBody={false}
          confirmText="Yes"
          downConfirmText={"Cancel"}
        />
    )
  }
    


  function renderModal() {
      return (
        <Modal
          isVisible={modalVisible}
          isKeyboardAvoidingView={true}
          children={renderPOPUP()}
          onClose={() => {
            console.log('close');
          }}
        />
      );
    }


  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Replace Card</Text>
        <Text style={styles.subtitle}>
          Request a new card to replace your current one. Your old card will be deactivated once the new card is activated.
        </Text>

        {renderField()}
        {renderCardDetails()}
        {renderWarning()}
        {renderBtn()}
      </View>
      {renderModal()}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  // title: {
  //   fontSize: FONT_SIZES.threetwo,
  //   fontFamily: FONTFAMILY.Light,
  //   color: THEME.white,
  //   marginBottom: 10,
  //   marginTop: 10,
  // },
  // subtitle: {
  //   fontSize: FONT_SIZES.onesix,
  //   fontFamily: FONTFAMILY.Light,
  //   color: THEME.white,
  //   marginBottom: 20,
  // },

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
    marginBottom: 30,
  },


  forgetTxt: { marginTop: 20, marginBottom: 20 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 16,
    marginBottom: 15,  
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
  },
  labelHead: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    marginVertical: 5,
  },
  botmLine: { height: 1, backgroundColor: THEME.lightGray },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueChangeTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  summaryBox: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  containerAlert: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 0.4,
    borderColor: THEME.white,
  },
  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    marginLeft: 5,
    lineHeight: 18,
    flex: 1,
  },
  ICONcONT: {
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
