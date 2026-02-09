import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import CustomButton from '../../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import BluryModal from '../../../../components/Modal/bluryModal';
import { Images } from '../../../../config';
import StatusBarManager from '../../../../components/statusBarManager';
import { SHOW_CLIENT } from '../../../../APICall/constants';
import { handleSize } from '../../../../config/responsiveTheme';
import Metrics from '../../../../styles/metrics';
import { changeCardStatus, changeFxPaymentStatus } from '../../../../queries/card.Queries/card.query';
import { LoaderCompleteScreenOnly } from '../../../../components/activityIndicator';
import { CommonUtils } from '../../../../utils';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={handleSize.f(18)} color={THEME.white} style={{ marginRight: handleSize.w(8) }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const AdminBankPaymentStatus = ({...props}) => {
  
  const { Detail } = props.route.params; 
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { mutate: changeFxPaymentStatusFunc, isPending: isPendingchangeFxPaymentStatus } = changeFxPaymentStatus({
      callback: (response: any) => {        
        
        setOpen(false);
        setOpen2(false);

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      
      },
    });


  const pressBackArrow = () => navigation.goBack();

  console.log("Details==>",Detail);
  
  const name = Detail?.requestedByUser

  const renderCardDetails = () => (
    <View style={styles.summaryBox}>
      <InfoRow icon="card-outline" label="Amount" value={Detail?.amount} />
      <InfoRow icon="person-outline" label="From Currency" value={Detail?.card_name} />
      <InfoRow icon="person-outline" label="Status" value={Detail?.Status || '' + " " + name?.last_name || '' } />
      <InfoRow icon="person-outline" label="From Currency" value={CommonUtils.formatDate(Detail?.created_at)} />
      {/* <InfoRow icon="home-outline" label="Delivery Address" value="DUMMY" />
      <InfoRow icon="time-outline" label="Estimated Delivery" value="DUMMY 3–5  Days" />
      <InfoRow icon="time-outline" label="Card Issuance Fee" value="DUMMY £4.95 GBP" />
      <InfoRow icon="flash-outline" label="Delivery Fee" value="DUMMY Free" /> */}
    </View>
  );

  function changeCaredStatus(status: string) {

    let payloadwithID = {
        ID: Detail?.id,
        payload: {
          status: status   //Approved or Rejected
        }
      }
    changeFxPaymentStatusFunc(payloadwithID)
  }

  const renderAccept = () => (
    <Modal
      isVisible={open}
      isKeyboardAvoidingView
      children={
        <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          backImg={Images.addCardGradient}
          visible={open}
          onClose={() => setOpen(false)}
          btnLoader={isPendingchangeFxPaymentStatus}
          marginTopTitle={handleSize.h(40)}
          onConfirm={()=>changeCaredStatus('Rejected')}
          showSubBody={false}
          showCancelBtn={false}
          downConfirmText="Cancel"
          title="Are you sure you want to reject"
          body=""
          subBody="The card can be unfrozen at any time. Existing subscriptions may still attempt charges."
          iconName="alert-outline"
          confirmText="Yes"
        />
      }
      onClose={setOpen}
    />
  );

  const renderReject = () => (
    <Modal
      isVisible={open2}
      isKeyboardAvoidingView
      children={
        <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          backImg={Images.addCardGradient}
          visible={open2}
          onClose={() => setOpen2(false)}
          btnLoader={isPendingchangeFxPaymentStatus}
          marginTopTitle={handleSize.h(40)}
          onConfirm={()=>changeCaredStatus('Approved')}
          showSubBody={false}
          showCancelBtn={false}
          downConfirmText="Cancel"
          title="Are you sure you want to accept"
          body=""
          subBody="The card can be unfrozen at any time. Existing subscriptions may still attempt charges."
          iconName="checkmark-outline"
          confirmText="Yes"
        />
      }
      onClose={setOpen2}
    />
  );

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager backgroundColor={THEME.darkSecondary} barStyle="light-content" />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Confirm bank payment request</Text>
        <Text style={styles.subtitle}>
          A small fee will be deducted from your account to issue and ship your card.
        </Text>

        {renderCardDetails()}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: handleSize.f(30) }}>
          <CustomButton
            btnContSty={styles.transferBtnReject}
            loading={false}
            txtColor={styles.btnStyle}
            showmyStyleOnly
            title="Reject"
            onPress={() => setOpen(true)}
          />
          <CustomButton
            btnContSty={styles.transferBtnAccept}
            loading={false}
            txtColor={styles.btnStyle2}
            showmyStyleOnly
            title="Accept"
            onPress={() => setOpen2(true)}
          />
        </View>

        {renderAccept()}
        {renderReject()}
      </View>
        
        {/* {isPendingchangeCardStatus && <LoaderCompleteScreenOnly />} */}

    </MainContainer>
  );
}

export default AdminBankPaymentStatus;

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
    marginBottom: handleSize.h(30),
    lineHeight: handleSize.h(20),
  },
  button: {
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: handleSize.h(56),
    width: '100%',
    marginTop: handleSize.h(20),
  },
  buttonText: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.oneeight),
  },
  btnStyle: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
  },
  btnStyle2: {
    fontSize: handleSize.f(FONT_SIZES.twozero),
    lineHeight: handleSize.h(20),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
  },
  transferBtnReject: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: handleSize.h(50),
    width: Metrics.width / 2 - handleSize.w(30),
    borderColor: THEME.white,
    borderWidth: handleSize.f(1.5),
  },
  transferBtnAccept: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: handleSize.h(50),
    width: Metrics.width / 2 - handleSize.w(30),
  },
  summaryBox: { borderRadius: handleSize.f(1), padding: 0, marginBottom: 0 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(7),
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
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    color: THEME.primary,
    textAlign: 'center',
    marginTop: handleSize.h(50),
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
});