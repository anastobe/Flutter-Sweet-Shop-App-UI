import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { BottomSheet, CardBox, MainContainer, Modal } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import HelpSheet from '../../../components/bottomSheet/helpSheet';
import useMoreViewModel from '../../../viewModels/homeViewModel/more/useMoreViewModel';
import CustomButton from '../../../components/customButton';
import { SHOW_CLIENT } from '../../../APICall/constants';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import { Images } from '../../../config';
import { handleSize } from '../../../config/responsiveTheme';

const MoreScreen = () => {
  const vm = useMoreViewModel();

  const renderExchangeReq = (heading: string) => (
    <View>
      <Text style={styles.headingTxt}>{heading}</Text>
      <CardBox
        rotate="-45deg"
        titleLeft="Request"
        iconRight="arrow-forward-outline"
        TL_radius={handleSize.f(10)}
        TR_radius={handleSize.f(10)}
        onPress={vm.onPressRequest}
      />
    </View>
  );

  const renderExchangeCurrency = (heading: string) => (
    <View>
      <Text style={styles.headingTxt}>{heading}</Text>
      <CardBox
        rotate="-45deg"
        titleLeft="Currency Exchange"
        iconRight="arrow-forward-outline"
        TL_radius={handleSize.f(10)}
        TR_radius={handleSize.f(10)}
        onPress={vm.onPressCurrencyExchange}
      />
      <CardBox
        rotate="-45deg"
        titleLeft="Conversion History"
        iconRight="arrow-forward-outline"
        BL_radius={handleSize.f(10)}
        BR_radius={handleSize.f(10)}
        onPress={vm.ConversionHistory}
      />
    </View>
  );

  const renderBeneficiaries = (heading: string) => (
    <View>
      <Text style={styles.headingTxt}>{heading}</Text>
      <CardBox
        rotate="-45deg"
        titleLeft="Your Beneficiaries"
        iconRight="arrow-forward-outline"
        TL_radius={handleSize.f(10)}
        TR_radius={handleSize.f(10)}
        onPress={vm.onPressBeneficiary}
      />
      <CardBox
        rotate="-45deg"
        titleLeft="Add Beneficiary"
        iconRight="arrow-forward-outline"
        BL_radius={handleSize.f(10)}
        BR_radius={handleSize.f(10)}
        onPress={vm.onPressAddnewBeneficiary}
      />
    </View>
  );

  const renderSettings = (heading: string) => (
    <View>
      <Text style={styles.headingTxt}>{heading}</Text>
      <CardBox
        rotate="-45deg"
        titleLeft="Profile"
        iconRight="arrow-forward-outline"
        TL_radius={handleSize.f(10)}
        TR_radius={handleSize.f(10)}
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
      {/* <CardBox
        rotate="-45deg"
        titleLeft="Security"
        iconRight="arrow-forward-outline"
        BL_radius={handleSize.f(10)}
        BR_radius={handleSize.f(10)}
        onPress={vm.onPressSecurity}
      /> */}
    </View>
  );

  const faqSupport = () => (
    <LinearGradient
      colors={['#433c71ff', '#2c2d5e', '#272d5a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.boxContainerBigBox}
    >
      <Text style={styles.boxTitleTextHeading}>Legal & Policies</Text>
      <TouchableOpacity onPress={vm.onPressPrivacyPolicy} style={styles.policyRow}>
        <Image style={{ width: handleSize.w(24), height: handleSize.h(24), marginRight: handleSize.w(10) }} source={Images.arrow} resizeMode='contain' />
        <Text style={styles.boxTitleText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={vm.onPressTermsofUse} style={styles.policyRow}>
        <Image style={{ width: handleSize.w(24), height: handleSize.h(24), marginRight: handleSize.w(10) }} source={Images.arrow} resizeMode='contain' />
        <Text style={styles.boxTitleText}>Terms of Use</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const LogOutBtn = () => (
    <CardBox
      rotate="0deg"
      titleLeft="Log out"
      iconRight="log-out-outline"
      BL_radius={handleSize.f(10)}
      BR_radius={handleSize.f(10)}
      onPress={vm.onPressLogout}
    />
  );

  const renderModalDelete = () => (
    <Modal
      isVisible={vm.open}
      isKeyboardAvoidingView={true}
      children={
        <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          onClose={vm.onPressSecurity}
          btnLoader={false}
          marginTopTitle={handleSize.h(20)}
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

  return (
    <MainContainer
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: handleSize.w(20), paddingBottom: handleSize.h(100) }}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Text style={styles.title}>Settings</Text>

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
        height={handleSize.h(300)}
        maxHeightPercent={0.6}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={vm.cardDetailRef}
      >
        <HelpSheet
          onPress1={vm.onCloseHelpSheet}
          onPress2={vm.onCloseHelpSheet}
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
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
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(10)
  },
  boxTitleTextHeading:{
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twozero),
    color: THEME.white,    
  },
  boxTitleText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.primary,
  },
  boxContainerBigBox: {
    backgroundColor: THEME.textPrimary,
    paddingVertical: handleSize.h(17),
    justifyContent: 'space-between',
    paddingHorizontal: handleSize.w(20),
    marginTop: handleSize.h(10),
    marginBottom: handleSize.h(10),
    borderRadius: handleSize.f(10),
  },
  headingTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
    paddingBottom: handleSize.h(5),
    marginTop: handleSize.h(16),
  },
  forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: handleSize.h(20), marginBottom: handleSize.h(20) },
  headingTxtDiff: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefive),
    color: THEME.white,
    paddingBottom: handleSize.h(5),
    marginTop: handleSize.h(15),
  },
  rotateIcon: {
    transform: [{ rotate: '-45deg' }],
    marginRight: handleSize.w(10),
  },
  policyRow: {
    flexDirection: 'row',
    marginTop: handleSize.h(15),
    alignItems: 'center',
  },
  modal: {
    height: handleSize.h(270),
    paddingHorizontal: handleSize.w(20),
    justifyContent: "center",
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(28),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    textAlign: 'center',
    lineHeight: handleSize.h(30),
    marginTop: handleSize.h(13)
  },
  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
});
