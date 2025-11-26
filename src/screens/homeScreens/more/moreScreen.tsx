import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BottomSheet, CardBox, MainContainer, Modal } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import HelpSheet from '../../../components/bottomSheet/helpSheet';
import useMoreViewModel from '../../../viewModels/homeViewModel/more/useMoreViewModel';
import CustomButton from '../../../components/customButton';
import { SHOW_CLIENT } from '../../../APICall/constants';
import { Images } from '../../../config';
import { ImageBackground } from 'react-native';
import BluryModal from '../../../components/Modal/bluryModal';
// import * as Keychain from 'react-native-keychain';

const MoreScreen = () => {
  const vm = useMoreViewModel();

//   async function getToken() {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       console.log('Token retrieved:', credentials.password);
//       return credentials.password; // this is your token
//     } else {
//       console.log('No token stored');
//       return null;
//     }
//   } catch (error) {
//     console.log('Error retrieving token:', error);
//     return null;
//   }
// }

// getToken()


  function renderExchangeReq(heading) {
    return (
      <View>
        <Text style={styles.headingTxt}>{heading}</Text>
        <CardBox
          rotate="-45deg"
          titleLeft="Request"
          iconRight="arrow-forward-outline"
          TL_radius={10}
          TR_radius={10}
          onPress={vm.onPressRequest}
        />
      </View>
    );
  }

  function renderExchangeCurrency(heading) {
    return (
      <View>
        <Text style={styles.headingTxt}>{heading}</Text>
        <CardBox
          rotate="-45deg"
          titleLeft="Currency Exchange"
          iconRight="arrow-forward-outline"
          TL_radius={10}
          TR_radius={10}
          onPress={vm.onPressCurrencyExchange}
        />
        <CardBox
          rotate="-45deg"
          titleLeft="Conversion history"
          iconRight="arrow-forward-outline"
          BL_radius={10}
          BR_radius={10}
          onPress={vm.ConversionHistory}
        />
      </View>
    );
  }

  function renderBeneficiaries(heading) {
    return (
      <View>
        <Text style={styles.headingTxt}>{heading}</Text>
        <CardBox
          rotate="-45deg"
          titleLeft="Your Beneficiaries"
          iconRight="arrow-forward-outline"
          TL_radius={10}
          TR_radius={10}
          onPress={vm.onPressBeneficiary}
        />
        <CardBox
          rotate="-45deg"
          titleLeft="Add Beneficiary"
          iconRight="arrow-forward-outline"
          BL_radius={10}
          BR_radius={10}
          onPress={vm.onPressAddnewBeneficiary}
        />
      </View>
    );
  }

  function renderSettings(heading) {
    return (
      <View>
        <Text style={styles.headingTxt}>{heading}</Text>
       
        <CardBox
          rotate="-45deg"
          titleLeft="Profile"
          iconRight="arrow-forward-outline"
          TL_radius={10}
          TR_radius={10}
          onPress={vm.onPressProfile}
        />
        <CardBox
          rotate="-45deg"
          titleLeft="Change Password"
          iconRight="arrow-forward-outline"
          onPress={vm.onPressChangePassword}
        />
        <CardBox
          rotate="-45deg"
          titleLeft="Contact & Address"
          iconRight="arrow-forward-outline"
          onPress={vm.onPresscontact}
        />
        <CardBox
          rotate="-45deg"
          titleLeft="Security"
          iconRight="arrow-forward-outline"
          BL_radius={10}
          BR_radius={10}
          onPress={vm.onPressSecurity}
        />
      </View>
    );
  }

  function faqSupport() {
    return (
      <LinearGradient
        colors={['#433c71ff', '#2c2d5e', '#272d5a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.boxContainerBigBox}
      >
        <Text style={styles.boxTitleTextHeading}>Legal & Policies</Text>
        <TouchableOpacity onPress={vm.onPressPrivacyPolicy} style={styles.policyRow}>
          <Image style={{ width: 24, height: 24, marginRight: 10 }} source={Images.arrow} resizeMode='contain' />
          <Text style={styles.boxTitleText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={vm.onPressTermsofUse} style={styles.policyRow}>
          <Image style={{ width: 24, height: 24, marginRight: 10 }} source={Images.arrow} resizeMode='contain' />
          <Text style={styles.boxTitleText}>Terms of Use</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  function LogOutBtn() {
    return (
      <CardBox
        rotate="0deg"
        titleLeft="Log out"
        iconRight="log-out-outline"
        BL_radius={10}
        BR_radius={10}
        onPress={vm.onPressLogout}
      />
    );
  }

      function renderPopup(icon,title,btnTxt) {
    return (
        <ImageBackground
          // imageStyle={{ borderRadius: 16 }}
          source={Images.universalModalBack} 
          resizeMode="contain"
          style={styles.modal}
        >

      {/* <View style={styles.modal}> */}
        <TouchableOpacity style={styles.closeBtn} onPress={vm.onPressSecurity}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <View style={styles.iconCircle}>
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View>

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={styles.forgetTxtpop}
          title={btnTxt}
          onPress={vm.onPressSecurity}
        />
      </ImageBackground>
    );
  }

  function renderModalDelete() {
    return (
      <Modal
        isVisible={vm.open}
        isKeyboardAvoidingView={true}
        children={
          // renderPopup("alert","Kindly visit your nearest ATM","Ok")
          <BluryModal
            style={{ flex: 1, paddingHorizontal: 20 }}
            onClose={vm.onPressSecurity}
            btnLoader={false}
            marginTopTitle={20}
            onConfirm={vm.onPressSecurity}
            iconNameBottom={-20}
            body={"Kindly visit your nearest ATM"}
            iconName={"alert-outline"}
            confirmText={'Continue'}
          />
        } 
        onClose={vm.onPressSecurity}
      />
    );
  }


  return (
    <MainContainer
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      mainContainerStyle={styles.container}
    >
      <Text style={styles.title}>More</Text>

      {renderExchangeReq('Request')}
      {renderExchangeCurrency('Currency Exchange')}
      {renderBeneficiaries('Beneficiaries')}
      {renderSettings('Settings')}

      <Text style={styles.headingTxtDiff}>FAQs</Text>

      <TouchableOpacity onPress={vm.onPressSupport}>
        <Text style={styles.headingTxtDiff}>Support</Text>
      </TouchableOpacity>

      {faqSupport()}
      {LogOutBtn()}

      {renderModalDelete()}

      <BottomSheet
        height={METRICS.halfScreen - 40}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={vm.cardDetailRef}
      >
        <HelpSheet
          onPress1={vm.onCloseHelpSheet}
          onPress2={vm.onCloseHelpSheet}
          style={{ flex: 1, paddingHorizontal: 20 }}
          title="Need Help?"
          subtitle={`You can reach us at anytime at: \n ${SHOW_CLIENT}`}
        />
      </BottomSheet>
    </MainContainer>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginTop: 20,
    marginBottom: 10
  },
  boxTitleTextHeading:{
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.twozero,
    color: THEME.white,    
  },
  boxTitleText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
  },
  boxContainerBigBox: {
    backgroundColor: THEME.textPrimary,
    paddingVertical: 17,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  headingTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
    paddingBottom: 5,
    marginTop: 16,
  },
    forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },
  headingTxtDiff: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefive,
    color: THEME.white,
    paddingBottom: 5,
    marginTop: 15,
  },
  rotateIcon: {
    transform: [{ rotate: '-45deg' }],
    marginRight: 10,
  },
  policyRow: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  
    modal: {
      // backgroundColor: 'rgba(64, 64, 65, 0.98)',
      // borderRadius: 16,
      // padding: 24,
      height: 270,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: 'center',

    },
    closeBtn: { position: 'absolute', top: 10, right: 15 },
    closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
    iconCircle: {
      backgroundColor: THEME.primary,
      borderRadius: 100,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
      color: THEME.white,
      textAlign: 'center',
      lineHeight: 30,
      marginTop: 13
    },
    description: {
      marginTop: 10,
      fontFamily: FONTFAMILY.Regular,
      fontSize: FONT_SIZES.onefour,
      color: THEME.white,
      textAlign: 'center',
    },



});
