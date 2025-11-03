import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { MainContainer, Modal } from '../../../../components';
import InputField from '../../../../components/textInput';
import CustomButton from '../../../../components/customButton';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useAdminBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/Admin/adminBeneficiaryStatusViewModel';
import Metrics from '../../../../styles/metrics';

const AdminBeneficiaryStatus = () => {
  const vm = useAdminBeneficiariesManagementViewModel();

  const renderTransactionType = () => (
    <View>
      <Text style={styles.checkmarkTitle}>Select Beneficiary Type</Text>
      {vm.BENEFICIARY_TYPES.map((item) => (
        <View key={item.key} style={styles.row}>
          <TouchableOpacity
            style={[styles.boxShape, { borderColor: THEME.white }]}
            onPress={() => vm.handlePressType(item.key)}
          >
            {vm.checked === item.key && (
              <Icon name="checkmark" size={15} color={THEME.white} />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderInputFields = () => (
    <View>
      <InputField
        margBtm={10}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Beneficiary Name"
        value={vm.beneficiaryName}
        onChangeText={vm.setBeneficiaryName}
      />

      <InputField
        placeholder="IBAN / Account No."
        value={vm.accountNo}
                // customInpStyle={styles.forgetTxt}
        onChangeText={vm.setAccountNo}
      />

      <InputField
       margTp={10}
         margBtm={10}
        placeholder="SWIFT/BIC (optional)"
        value={vm.bicNo}
        onChangeText={vm.setBicNo}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          dropdownIconColor={THEME.white}
          selectedValue={vm.country}
          onValueChange={vm.setCountry}
          style={styles.inputInnerPicker}
        >
          {vm.COUNTRIES.map((opt) => (
            <Picker.Item
              key={opt.value}
              label={opt.label}
              value={opt.value}
              color={THEME.textPrimary}
            />
          ))}
        </Picker>
      </View>

    </View>
  );

  const renderPopup = () => (
    <View style={styles.modal}>
      <TouchableOpacity style={styles.closeBtn} onPress={vm.onClosePopup}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Icon name="checkmark" size={36} color={THEME.textPrimary} />
      </View>

      <Text style={styles.titles}>Beneficiary Accepted</Text>

 <CustomButton
        btnContSty={styles.forgetTxtpop}
        title="Done"
        onPress={vm.onClosePopup}
      />

    </View>
  );

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={vm.pressBackArrow}
      isFlatList={false}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Beneficiary</Text>
          <Text style={styles.subtitle}>
Please review and confirm the beneficiary details before proceeding
          </Text>

          {renderInputFields()}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 50 }} >
         <CustomButton
            btnContSty={styles.transferBtnReject}
            loading={false}
            txtColor={styles.btnStyle}
            showmyStyleOnly={true}
            title="Reject"
            onPress={()=>{Alert.alert("reject") }}
          />

          <CustomButton
            btnContSty={styles.transferBtnAccept}
            loading={false}
            txtColor={styles.btnStyle2}
            showmyStyleOnly={true}
            title="Accept"
            onPress={()=>{Alert.alert("accept") }}
          />
            </View>

          <Modal
            isVisible={vm.open}
            isKeyboardAvoidingView
            children={renderPopup()}
            onClose={vm.onClosePopup}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default AdminBeneficiaryStatus;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 20,
  },
  container: { flex: 1, backgroundColor: THEME.white },
  checkmarkTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginVertical: 10,
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
  boxShape: { width: 20, height: 20, borderWidth: 1.5, borderRadius: 50 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  label: {
    marginLeft: 8,
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: 10,
    height: scale(55),
    marginBottom: 10 
  },
  inputInnerPicker: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.gray,
    borderWidth: 1,
    borderRadius: 16,
    color: THEME.white,
    height: scale(55),
    marginLeft: 10,
  },
  forgetTxt: { marginTop: 10, marginBottom: 10 },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.92)',
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
  forgetTxtpop: { width: '100%', marginTop: 30, marginBottom: 20 },
  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twosix,
    color: THEME.white,
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    textAlign: 'center',
  },
});

