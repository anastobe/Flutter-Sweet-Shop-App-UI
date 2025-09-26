import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { BottomSheet, CardBox, MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { storeUserToken } from '../../../Redux/Action/Auth/AuthActions';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ContactAdressSheet from '../../../components/bottomSheet/contactAdressSheet';
import HelpSheet from '../../../components/bottomSheet/helpSheet';

const MoreScreen = () => {

  const navigation = useNavigation();
  const cardDetailRef = useRef(null)
  const dispatch = useDispatch();

  function onPressCurrencyExchange() {
      navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE)
  }

  function ConversionHistory() {
      navigation.navigate(HOME_ROUTES.CONVERSION_HISTORY)
  }

  function onPressBeneficiary() {
      navigation.navigate(HOME_ROUTES.BENEFICIARY_MANAGEMENT)
  }

  function onPressAddnewBeneficiary() {
      navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)
  }

    function onPressProfile() {
      navigation.navigate(HOME_ROUTES.PROFILE)
  }

  function onPressChangePassword() {
      navigation.navigate(HOME_ROUTES.UpdatePassword)
  }

  function onPresscontact() {
      navigation.navigate(HOME_ROUTES.CONTACTADDRESS)
  }

  function onPressSecurity() {
      navigation.navigate(HOME_ROUTES.PIN_SECURITY)
  }

  function onPressFaqs() {
      navigation.navigate(HOME_ROUTES.FAQ)
  }

  function onPressSupport() {
      navigation.navigate(HOME_ROUTES.SUPPORT)
  }

  function onPressPrivacyPolicy() {
      navigation.navigate(HOME_ROUTES.PRIVACY_POLICY)
  }

  function onPressTermsofUse() {
      navigation.navigate(HOME_ROUTES.TERMS_USE)
  }
  
  function renderExchangeCurrency(heading:any) {
    return(
      <View>
        <Text  style={styles.headingTxt} >{heading}</Text>
          <CardBox
            rotate={'-45deg'}
            titleLeft="Currency Exchange"
            iconRight="arrow-forward-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={() => onPressCurrencyExchange()}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="Conversion history"
            iconRight="arrow-forward-outline"
            BL_radius={10}
            BR_radius={10}
            onPress={() => ConversionHistory()}
          />
      </View>
    )
  }
  
  function renderBeneficiaries(heading:any) {
    return(
      <View>
        <Text  style={styles.headingTxt} >{heading}</Text>
          <CardBox
            rotate={'-45deg'}
            titleLeft="Your Beneficiaries"
            iconRight="arrow-forward-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={() => onPressBeneficiary()}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="Add New Beneficiary"
            iconRight="arrow-forward-outline"
            BL_radius={10}
            BR_radius={10}
            onPress={() => onPressAddnewBeneficiary()}
          />
      </View>
    )
  }

    function renderSettings(heading:any) {
    return(
      <View>
        <Text  style={styles.headingTxt} >{heading}</Text>
          <CardBox
            rotate={'-45deg'}
            titleLeft="Profile"
            iconRight="arrow-forward-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={() => onPressProfile()}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="Change Password"
            iconRight="arrow-forward-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={() => onPressChangePassword()}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="Contact & Address"
            iconRight="arrow-forward-outline"
            TL_radius={10}
            TR_radius={10}
            onPress={() => onPresscontact()}
          />
          <CardBox
            rotate={'-45deg'}
            titleLeft="Security"
            iconRight="arrow-forward-outline"
            BL_radius={10}
            BR_radius={10}
            onPress={() => onPressSecurity()}
          />
      </View>
    )
  }

  
    function faqSuport() {
    return(
    <LinearGradient
        colors={["#433c71ff", "#2c2d5e", "#272d5a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
        styles.boxContainerBigBox
      ]}
    >
       <Text style={styles.boxTitleText}>Legal & Policies</Text>

      <View style={{flexDirection: "row", marginTop: 15}} >
        <View style={{ transform: [{ rotate: '-45deg' }] }}>
          <Icon name={"arrow-forward-outline"} size={24} color={THEME.primary} />
        </View>     
        <View style={{marginLeft:10 }} >
          <Text style={styles.boxTitleText}>Privacy Policy</Text>
        </View>
      </View>

      <View style={{flexDirection: "row", marginTop: 15}} >
        <View style={{ transform: [{ rotate: '-45deg' }] }}>
          <Icon name={"arrow-forward-outline"} size={24} color={THEME.primary} />
        </View>     
        <View style={{marginLeft:10 }} >
          <Text style={styles.boxTitleText}>Privacy Policy</Text>
        </View>
      </View>

     </LinearGradient>
    )
  }

  function LogOu() {
    return(
          <CardBox
            rotate={'0deg'}
            titleLeft="Log out"
            iconRight="log-out-outline"
            BL_radius={10}
            BR_radius={10}
            onPress={() => dispatch(storeUserToken({})) }
          />
    )
  }

  return(
    <MainContainer isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}   mainContainerStyle={styles.container}>
     <Text style={styles.title}>More</Text>
        {renderExchangeCurrency("Currency Exchange")}
        {renderBeneficiaries("Beneficiaries")}
        {renderSettings("Settings")}
        <Text  style={styles.headingTxtDiff} >FAQs</Text>
        <TouchableOpacity onPress={()=>{ cardDetailRef?.current?.open() }} >
        <Text  style={styles.headingTxtDiff} >Support</Text>
        </TouchableOpacity>
        {faqSuport()} 
        {LogOu()}


    <BottomSheet
      height={METRICS.halfScreen - 40}
      draggable={false}
      openTime={500}
      closeDuration={500}
      bottomSheetRef={cardDetailRef}
      children={<HelpSheet
        onPress1={()=>{cardDetailRef?.current?.close()}}
        onPress2={()=>{cardDetailRef?.current?.close()}}
        style={{ flex: 1, paddingHorizontal: 20 }}
        title="Need Help?" 
        subtitle="You can reach us at anytime at:"
        />}
    />

    </MainContainer>
  )
}

export default MoreScreen;

const styles = StyleSheet.create({
  container: {  flex: 1, backgroundColor: THEME.white},
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop:10,
  },
  belowTxt:{
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5
  },
  logo: {
    width: METRICS.width,
    height: scale       (25),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 20
  },
  boxTitleText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
  },
  boxTitleTextBig: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.twozero,
    color: THEME.white
  },
  boxContainer:{
    backgroundColor: THEME.textPrimary, 
    height: scale(55), 
    justifyContent: "space-between", 
    paddingHorizontal: 20
  },
  boxContainerBigBox:{
    backgroundColor: THEME.textPrimary, 
    paddingVertical: 17,
    justifyContent: "space-between", 
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  headingTxt:{
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    paddingBottom: 5,
    marginTop: 15
  },
headingTxtDiff:{
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    paddingBottom: 5,
    marginTop: 15
  }


});
