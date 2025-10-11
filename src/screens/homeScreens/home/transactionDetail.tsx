import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        {icon && <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function TransactionDetail(props) {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [tick, setTick] = useState(false);
  const [open, setOpen] = useState(false);
  const payload = props?.route?.params?.data;

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
        <InfoRow icon="card-outline" label="Card" value="•••• 7208" />
        <InfoRow icon="person-outline" label="Merchant" value="Transport for London" />
        <InfoRow icon="home-outline" label="Currency" value="£14.90 (No FX conversion)" />
      </View>
    );
  }

  function renderTotalAmount() {
    return (
      <>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>£4.95 GBP</Text>
      </>
    );
  }

  function rendermoredetail() {
    return (
      <View style={styles.summaryBox}>
        <InfoRow label="Transaction Date" value="24 July 2025" />
        <InfoRow label="Time" value="13:42 BST" />
        <InfoRow label="Location" value="London, UK" />
        <InfoRow label="Reference Number" value="TFL-205-LDN-00976" />
        <InfoRow label="Transaction ID" value="TXN-94830-TPFL" />
      </View>
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
        <Text style={styles.title}>Transaction Details</Text>
        <Text style={styles.subtitle}>
          Transport for london.
        </Text>

        {renderCardDetails()}
        {renderTotalAmount()}
        {rendermoredetail()}
      </View>
    </MainContainer>
  );
}

export default TransactionDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 10,
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
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',
  },
});