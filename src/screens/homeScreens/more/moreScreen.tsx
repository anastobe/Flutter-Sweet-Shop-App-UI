import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheet, CardBox, MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import HelpSheet from '../../../components/bottomSheet/helpSheet';
import useMoreViewModel from '../../../viewModels/homeViewModel/more/useMoreViewModel';

const MoreScreen = () => {
  const vm = useMoreViewModel();

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
          titleLeft="Add New Beneficiary"
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
        <Text style={styles.boxTitleText}>Legal & Policies</Text>
        <TouchableOpacity onPress={vm.onPressPrivacyPolicy} style={styles.policyRow}>
          <Icon name="arrow-forward-outline" size={24} color={THEME.primary} style={styles.rotateIcon} />
          <Text style={styles.boxTitleText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={vm.onPressTermsofUse} style={styles.policyRow}>
          <Icon name="arrow-forward-outline" size={24} color={THEME.primary} style={styles.rotateIcon} />
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

  return (
    <MainContainer
      isFlatList
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      mainContainerStyle={styles.container}
    >
      <Text style={styles.title}>More</Text>

      {renderExchangeCurrency('Currency Exchange')}
      {renderBeneficiaries('Beneficiaries')}
      {renderSettings('Settings')}

      <Text style={styles.headingTxtDiff}>FAQs</Text>

      <TouchableOpacity onPress={vm.onPressSupport}>
        <Text style={styles.headingTxtDiff}>Support</Text>
      </TouchableOpacity>

      {faqSupport()}
      {LogOutBtn()}

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
          subtitle="You can reach us at anytime at:"
        />
      </BottomSheet>
    </MainContainer>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginTop: 10,
  },
  boxTitleText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
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
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    paddingBottom: 5,
    marginTop: 15,
  },
  headingTxtDiff: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
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
});
