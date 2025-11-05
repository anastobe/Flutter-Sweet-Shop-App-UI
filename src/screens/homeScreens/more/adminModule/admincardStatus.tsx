import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import CustomButton from '../../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import Metrics from '../../../../styles/metrics';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function AdminConfirmCardRequest(props: any) {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [tick, setTick] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const payload = props?.route?.params?.data;


  function pressBackArrow() {
    navigation.goBack();
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <InfoRow icon="card-outline" label="Card Type" value="Visa" />
        <InfoRow icon="person-outline" label="Cardholder Name" value="John Doe" />
        <InfoRow icon="home-outline" label="Delivery Address" value="221B Baker Street" />
        <InfoRow icon="time-outline" label="Estimated Delivery" value="3–5 Business Days" />
        <InfoRow icon="pricetag-outline" label="Card Issuance Fee" value="£4.95 GBP" />
        <InfoRow icon="flash-outline" label="Delivery Fee" value="Free" />
      </View>
    );
  }


      function renderPopup(icon: any,title: any,btnTxt: any, whichModal: Boolean) {
    return (
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={()=>{
          if (!whichModal) {
            setOpen(!open)
          }else{
            setOpen2(!open2)
          }
        }}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* <View style={styles.iconCircle}>
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View> */}

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={[styles.button,{ backgroundColor: !whichModal ? THEME.medRed : THEME.primary }]}
          title={btnTxt}
          showmyStyleOnly={true}
          txtColor={[styles.buttonText,{ color: !whichModal ?  THEME.white : THEME.textPrimary }]}
           onPress={()=>{
          if (!whichModal) {
            setOpen(!open)
          }else{
            setOpen2(!open2)
          }
        }}
        />
      </View>
    );
  }

  function renderAccept() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={renderPopup("alert-outline","Are you sure you want to reject","Yes",false)} 
        onClose={setOpen}
      />
    );
  }
  
  function renderReject() {
  return (
    <Modal
      isVisible={open2}
      isKeyboardAvoidingView={true}
      children={renderPopup("checkmark-outline","Are you sure you want to accept","Yes",true)} 
      onClose={setOpen2}
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
        <Text style={styles.title}>Confirm Card Request</Text>
        <Text style={styles.subtitle}>
          A small fee will be deducted from your account to issue and ship your card.
        </Text>

        {renderCardDetails()}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 50 }} >
          <CustomButton
            btnContSty={styles.transferBtnReject}
            loading={false}
            txtColor={styles.btnStyle}
            showmyStyleOnly={true}
            title="Reject"
            onPress={()=>{ setOpen(!open) }}
          />

          <CustomButton
            btnContSty={styles.transferBtnAccept}
            loading={false}
            txtColor={styles.btnStyle2}
            showmyStyleOnly={true}
            title="Accept"
            onPress={()=>{ setOpen2(!open2) }}
          />
            </View>
            {renderAccept()}
            {renderReject()}
      </View>
    </MainContainer>
  );
}

export default AdminConfirmCardRequest;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 20,
    marginTop: 10,
  },
    button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    height: scale(55),
    width: '100%',
    marginTop: 20

  },
  buttonText: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.oneeight
  },
  btnStyle:{
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  btnStyle2:{
    fontSize: FONT_SIZES.twozero,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.textPrimary,
  },
  transferBtnReject: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
  height: scale(50),
    width: Metrics.width/2-30,
    borderColor: THEME.white,
    borderWidth: 1.5
   },
      transferBtnAccept: {
       backgroundColor: THEME.primary,
       borderRadius: 10,
       justifyContent: "center",
       alignItems: 'center',
     height: scale(50),
       width: Metrics.width/2-30
      },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 10,
  },
  forgetTxt: { marginTop: 30, marginBottom: 50 }, forgetTxtpop:{  width: '100%', marginTop: 20, marginBottom: 20 },
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
    fontSize: FONT_SIZES.threetwo,
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
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
  },
  accountTextbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
    marginLeft: 5,
  },
  badgeText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16,    marginBottom: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  confirmText: {
    flex: 1,
    color: THEME.primary,
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
 
  },
  boldText: { fontWeight: 'bold' },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.95)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 10, right: 15 },
  closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: 100,
    width: scale(55),
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twosix,
    color: THEME.primary,
    textAlign: 'center',
        marginTop: 50,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',
  },
});
