import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { HOME_ROUTES } from '../../../constants';
import { createCard } from '../../../queries/auth.query';
import { CommonUtils, Toast } from '../../../utils';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={18} color={THEME.primary} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function ConfirmCardRequest(props: any) {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [tick, setTick] = useState(false);
  const [open, setOpen] = useState(false);
  const payload = props?.route?.params?.data;
  const address = props?.route?.params?.address;

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
        {payload?.format?.toLowerCase() == "physical" ? <>
        <InfoRow icon="home-outline" label="Delivery Address" value={address} />
        <InfoRow icon="time-outline" label="Estimated Delivery" value="DUMMY" />
        <InfoRow icon="pricetag-outline" label="Card Issuance Fee" value="DUMMY" />
        <InfoRow icon="flash-outline" label="Delivery Fee" value="DUMMY" />
        </> : null} 
      </View>
    );
  }

  function renderTotalAmount() {
    return (
      <>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>{payload.currency_type} {payload.spending_limits}</Text>
      </>
    );
  }

  function chooseFundingAcc() {
    return (
      <View style={styles.accountBox}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 55, height: 45, justifyContent: "center", alignItems: "center" }} >
          <Icon name="flag" size={28} color={THEME.white} />
          </View>
          <View>
            <Text style={styles.accountText}>Funding Account</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: THEME.secondary_hover,
                  borderRadius: 6,
                  padding: 2,
                  marginTop: 2,
                }}
              >
                <Text style={styles.badgeText}>{payload.currency_type}</Text>
              </View>
              <Text style={styles.accountTextbelow}> {payload.linked_account}</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ marginRight: 15 }}>
          <Icon name="caret-down" size={20} color={THEME.white} />
        </View> */}
      </View>
    );
  }

  function renderConfirmation() {
    if (payload?.format?.toLowerCase() == "physical" ) {
      return (
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setTick(!tick)} style={[styles.checkbox,{ borderColor: tick ? THEME.primary : THEME.white }]}>
            {tick ? <Icon name="checkmark-outline" size={18} color={tick ? THEME.primary : THEME.white} /> : null}
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
          title="Create Card"
          onPress={function () {
            if (payload?.format?.toLowerCase() == "physical" && !tick) {
              Alert.alert("Allow","Please confirm the deduction by checking the box before continuing.")
              // Toast.showToast("Please confirm the deduction by checking the box before continuing.", '', 'error');
            } else {
              createCardFunc(payload);
            }
          }}
        />
      </View>
    );
  }

  function renderPopup() {
    return ( 
      // <View style={styles.modal}>
      //   <TouchableOpacity style={styles.closeBtn} onPress={() =>{
      //     setOpen(false)
      //     setTimeout(() => {
      //       navigation.navigate(HOME_ROUTES.TABSTACK);
      //     }, 500);
      //   }}>
      //     <Text style={styles.closeText}>×</Text>
      //   </TouchableOpacity>

      //   <View style={styles.iconCircle}>
      //     <Icon name="checkmark" size={25} color={THEME.textPrimary} />
      //   </View>

      //   <Text style={styles.titles}>Card Created Successfully.</Text>
      //   {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

      //   <CustomButton
      //     btnContSty={styles.forgetTxtpop}
      //     title="Manage Card"
      //     onPress={function () {
      //       setOpen(false)
      //       setTimeout(() => {
      //         navigation.navigate(HOME_ROUTES.TABSTACK, {
      //             screen: "CardStack",
      //         });
      //       }, 500);
      //     }}
      //   />
      // </View>

      
        <BluryModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          onClose={() =>{
            setOpen(false)
            setTimeout(() => {
              navigation.navigate(HOME_ROUTES.TABSTACK, {
                  screen: "CardStack",
              });
            }, 500);
          }}
          btnLoader={false}
          marginTopTitle={50}
          onConfirm={()=>{
            setOpen(false)
            setTimeout(() => {
              navigation.navigate(HOME_ROUTES.TABSTACK, {
                  screen: "CardStack",
              });
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
        onClose={function () {
          setOpen(false);
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Confirm Card Request</Text>
        <Text style={styles.subtitle}>
          A small fee will be deducted from your account to issue and ship your card.
        </Text>

        {renderCardDetails()}
        {renderTotalAmount()}
        {chooseFundingAcc()}
        {renderConfirmation()}
        {renderButton()}
        {renderModal()}
      </View>
    </MainContainer>
  );
}

export default ConfirmCardRequest;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 10,
    lineHeight: 20
  },
  forgetTxt: { marginTop: 30, marginBottom: 50 }, forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },
  summaryBox: { borderRadius: 1, padding: 10, marginBottom: 10 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
  },
  totalAmount: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threezero,
    color: THEME.primary,
    marginBottom: 30,
  },
  accountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: THEME.white,
    borderRadius: 16,
    height: 60,
    marginBottom: 10,
  },
  flag: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 16,
    marginLeft: 10,
  },
  accountText: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.gray_med,
  },
  accountTextbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    marginLeft: 5,
  },
  badgeText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    paddingHorizontal: 5
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16,    marginBottom: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  confirmText: {
    color: THEME.white,
    fontSize: FONT_SIZES.onefour,
    lineHeight: 16,
    fontFamily: FONTFAMILY.Regular,
    marginRight:20
  },
  boldText: { fontWeight: 'bold' },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.98)',
    borderRadius: 16,
    padding: 24,
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
    fontSize: FONT_SIZES.twotwo,
    color: THEME.white,
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 20
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',
  },
});
