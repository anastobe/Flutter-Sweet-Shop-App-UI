// ConfirmCardRequest.js
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import { createCard } from '../../../queries/auth.query';
import { CommonUtils } from '../../../utils';
import { HOME_ROUTES } from '../../../constants';
import { handleSize } from '../../../config/responsiveTheme';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={handleSize.f(18)} color={THEME.primary} style={{ marginRight: handleSize.w(8) }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function ReplaceCardConfirm(props: any) {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [tick, setTick] = useState(false);
  const [open, setOpen] = useState(false);
  const payload = props?.route?.params?.data;
  const address = props?.route?.params?.address;
  const linkedAccount = props?.route?.params?.linkedAccount;
  const currency = props?.route?.params?.currency;

  console.log("payload==>",props?.route?.params);
  
  
  const { mutate: createCardFunc, isPending } = createCard({
    callback: function (response) {
      if (response.success) {
        setOpen(true);
      }
    },
  });

  function pressBackArrow() {
    navigation.goBack();
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <InfoRow icon="card-outline" label="Card Type" value={CommonUtils.capitalizeFirstLetter(payload?.format)} />
        <InfoRow icon="person-outline" label="Cardholder Name" value={payload?.card_name} />
        {payload?.format?.toLowerCase() === "physical" && <>
          <InfoRow icon="home-outline" label="Delivery Address" value={address} />
          <InfoRow icon="time-outline" label="Estimated Delivery" value="DUMMY" />
          <InfoRow icon="pricetag-outline" label="Card Issuance Fee" value="DUMMY" />
          <InfoRow icon="flash-outline" label="Delivery Fee" value="DUMMY" />
        </>}
      </View>
    );
  }

  function renderTotalAmount() {
    return (
      <>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>{CommonUtils.getCurrencySymbol(currency?.iso_code)} {payload.spending_limits}</Text>
      </>
    );
  }

  function chooseFundingAcc() {
    return (
      <View style={styles.accountBox}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: handleSize.w(55), height: handleSize.h(45), justifyContent: "center", alignItems: "center" }} >
            <Icon name="flag" size={handleSize.f(28)} color={THEME.white} />
          </View>
          <View>
            <Text style={styles.accountText}>Funding Account</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{
                backgroundColor: THEME.secondary_hover,
                borderRadius: handleSize.f(6),
                padding: handleSize.h(2),
                marginTop: handleSize.h(2),
              }}>
                <Text style={styles.badgeText}>{linkedAccount.name}</Text>
              </View>
              <Text style={styles.accountTextbelow}> {linkedAccount.iso_code}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderConfirmation() {
    if (payload?.format?.toLowerCase() === "physical") {
      return (
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setTick(!tick)} style={[styles.checkbox,{ borderColor: tick ? THEME.primary : THEME.white }]}>
            {tick && <Icon name="checkmark-outline" size={handleSize.f(18)} color={THEME.primary} />}
          </TouchableOpacity>
          <Text style={styles.confirmText}>
            I confirm that <Text style={styles.boldText}>£4.95 ("DUMMY")</Text> will be deducted from my
            account to issue my physical card.
          </Text>
        </View>
      );
    }
  }

  function renderButton() {
    return (
      <View>
        <CustomButton
          btnContSty={styles.forgetTxt}
          loading={isPending}
          title="Create card"
          onPress={() => {
            if (payload?.format?.toLowerCase() === "physical" && !tick) {
              Alert.alert("Allow","Please confirm the deduction by checking the box before continuing.");
            } else {

              console.log("check==>",payload);
              // return              
              createCardFunc(payload);

            }
          }}
        />
      </View>
    );
  }

  function renderPopup() {
    return (
      <BluryModal
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
        onClose={() =>{
          setOpen(false);
          setTimeout(() => {
            navigation.navigate(HOME_ROUTES.TABSTACK, { screen: "CardStack" });
          }, 500);
        }}
        btnLoader={false}
        marginTopTitle={handleSize.h(50)}
        onConfirm={()=>{
          setOpen(false);
          setTimeout(() => {
            navigation.navigate(HOME_ROUTES.TABSTACK, { screen: "CardStack" });
          }, 500);
        }}
        title={"Card Created Successfully."}
        body={`${payload?.format} card created and ready to use.`}
        iconName={""}
        confirmText={'Yes'}
      />
    );
  }

  function renderModal() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={renderPopup()}
        onClose={() => setOpen(false)}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={isPending ? null : pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Confirm card request</Text>
        <Text style={styles.subtitle}>
          A small fee will be deducted from your account to issue and ship your card.
        </Text>

        {/* {renderCardDetails()}
        {renderTotalAmount()}
        {chooseFundingAcc()}
        {renderConfirmation()} */}
        {renderButton()}
        {/* {renderModal()} */}
      </View>
    </MainContainer>
  );
}

export default ReplaceCardConfirm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    lineHeight: handleSize.h(20),
  },
  forgetTxt: { marginTop: handleSize.h(30), marginBottom: handleSize.h(50) },
  forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: handleSize.h(20), marginBottom: handleSize.h(20) },

  summaryBox: { borderRadius: handleSize.f(8), padding: handleSize.h(10), marginBottom: handleSize.h(10) },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  valueBox: { paddingHorizontal: handleSize.w(10), paddingVertical: handleSize.h(4), borderRadius: handleSize.f(8) },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
  },
  totalAmount: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.primary,
    marginBottom: handleSize.h(30),
  },
  accountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: THEME.white,
    borderRadius: handleSize.f(16),
    height: handleSize.h(60),
    marginBottom: handleSize.h(10),
  },
  accountText: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.gray_med,
  },
  accountTextbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    marginLeft: handleSize.w(5),
  },
  badgeText: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    paddingHorizontal: handleSize.w(5)
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: handleSize.h(16), marginBottom: handleSize.h(20) },
  checkbox: {
    width: handleSize.w(22),
    height: handleSize.w(22),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: handleSize.w(10),
  },
  confirmText: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    lineHeight: handleSize.h(16),
    fontFamily: FONTFAMILY.Regular,
    marginRight: handleSize.w(20)
  },
  boldText: { fontWeight: 'bold' },
});
