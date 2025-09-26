import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { Auth_ROUTES, HOME_ROUTES } from '../../../constants';
import CardDetail from '../../../components/bottomSheet/cardDetail';
import VerifyAddress from '../../../components/bottomSheet/verifyAddress';
import { createCard } from '../../../queries/auth.query';

const  InfoRow = ({ icon, label, value }:{ icon:any, label:any, value:any }) => (
  <View style={styles.infoRow}>
    <View style={{flexDirection: "row" }} >
        <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const ConfirmCardRequest = ({...props}) => {

  let payload = props?.route?.params?.data

    const navigation = useNavigation();
    const cardDetailRef = useRef(null)
    const [tick, settick] = useState(false);
    const [Open, setOpen] = useState(false);

    const {mutate: createCardFunc, isPending} = createCard({
        callback: (response: any) => {
          if (response.success) {
            setOpen(true)
          }
        },
      });
    

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderCardDetails() {
        return(
        <View style={styles.summaryBox}>
        <InfoRow icon="card-outline" label="Card Type" value="Visa" />
        <InfoRow icon="person-outline" label="Cardholder Name" value="John Doe" />
        <InfoRow icon="home-outline" label="Delivery Address" value="221B Baker Street" />
        <InfoRow icon="time-outline" label="Estimated Delivery" value="3–5 Business Days" />
        <InfoRow icon="pricetag-outline" label="Card Issuance Fee" value="£4.95 GBP" />
        <InfoRow icon="flash-outline" label="Delivery Fee" value="Free" />
      </View>
        )
    }

    function renderTtlAunt() {
      return(
        <>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>£4.95 GBP</Text>
        </>
      )    
    }

    function choseFundingAcc() {
        return(
                  <View style={styles.accountBox}>
        <View style={{ flexDirection: "row" }} >
        <View>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          style={styles.flag}
        />
        </View>
        
        <View>
            <Text style={styles.accountText}>Choose Funding Account</Text>
          <View style={{ flexDirection: "row" }} >
            <Text style={styles.accountTextbelow}>Clearbank Account</Text>
            <View style={{ backgroundColor: THEME.secondary_hover, borderRadius: 6, padding:3, marginLeft: 10 }} >
            <Text style={styles.badgeText}>GBP</Text>
            </View>
          </View>
        </View>
        </View>

        <View style={{ marginRight: 10 }} >
          <Icon name="chevron-down-outline" size={20} color="#555" />
        </View>
  
      </View>
        )
    }

    function rendrConfirmation() {
        return(
            <View style={styles.checkboxContainer}>
  <TouchableOpacity onPress={() => settick(!tick)} style={styles.checkbox}>
    {tick ? <Icon name="checkmark-outline" size={18} color={THEME.primary} /> : null}
  </TouchableOpacity>
  <Text style={styles.confirmText}>
    I confirm that <Text style={styles.boldText}>£4.95</Text> will be deducted from my account to issue my physical card.
  </Text>
</View>
        )
    }

    
    function renderlimitandBTN() {
      return(
        <View>
      <CustomButton
        btnContSty={styles.forgetTxt}
        loading={isPending}
        title="Pay"
        onPress={() => {
          createCardFunc(payload)
        }}
      />
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
                <Icon name="checkmark" size={25} color={THEME.white} /> 
            </View>
        

          <Text style={styles.titles}>Card Created Successfully.</Text>
          <Text style={styles.description}>
            Virtual card created and ready to use.
          </Text>

         <CustomButton
            btnContSty={styles.forgetTxtpop}
            title="Manage Card"
            onPress={() => {
              navigation.navigate(HOME_ROUTES.TABSTACK)
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

    return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
    <View style={{ marginHorizontal: 20 }} >

    <Text style={styles.title}>Confirm Card Request</Text>
    <Text  style={styles.subtitle}>A small fee will be deducted from your account to issue and ship your card.</Text>
   
    {renderCardDetails()}
    {renderTtlAunt()}
    {choseFundingAcc()}
    {rendrConfirmation()}
    {renderlimitandBTN()}
    {renderModal()}



    </View>
    </MainContainer>
  )
}

export default ConfirmCardRequest;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white  },
  arrowCont:
  { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginTop: 20 },
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
  },
    forgetTxt:
  { marginTop: 50, marginBottom: 50 },
  forgetTxtpop:{
width: '100%',
marginTop: 50, marginBottom: 50 
  },
    subtitle:
  {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: THEME.textPrimary,
    borderRadius: 1,
    padding: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: {
    backgroundColor: THEME.lightGrey,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
  },
  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    marginBottom: 4,
    marginTop: 10
  },
  totalAmount: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.foureight,
    color: THEME.primary,
    marginBottom: 30,
  },
  accountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
    borderWidth: 1,
    borderColor: THEME.gray,
    borderRadius: 16,
    height: 60,
    marginBottom: 10,
  },
  flag: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 16,
    marginLeft: 10
  },
  accountText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
  },
  accountTextbelow:{
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
  },
  badgeText: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: THEME.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  confirmText: {
    flex: 1,
    color: THEME.primary,
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
     modal: {
    backgroundColor: '#fff',
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
    fontSize: 24,
    color: '#888',
  },
  iconCircle: {
    backgroundColor:THEME.green,
    borderRadius: 100,
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain"
  },
  titles: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',

  },
  okButton: {
    backgroundColor: '#e184ff',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 12,
  },
});
