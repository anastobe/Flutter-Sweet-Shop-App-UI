import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
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
import { launchImageLibrary } from 'react-native-image-picker';

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
  const [comments, setcomments] = useState("");
  const [Profile, setProfile] = useState("");
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

  function renderUpload() {
    return(
        <TouchableOpacity onPress={openImagePicker} style={styles.downloadCont} >
          <Image source={Images.uploadPhoto} style={{ width: 20, height: 20 }} resizeMode="contain" />
         {/* <Icon name={"download-outline"} size={25} color={THEME.primary} /> */}
         <Text style={styles.txtUpload}>Upload Photo or Receipt</Text>
        </TouchableOpacity>
    )
  }
  
  function renderInputandBtn() {
    return(
      <View>
        <TextInput
          multiline
          placeholderTextColor={THEME.white}
          style={styles.inputBackground}
          placeholder="Comment"
          value={comments}
          onChangeText={setcomments}
          keyboardType={"default"}
        />
        
        <CustomButton
          btnContSty={styles.forgetTxt}
          loading={false}
          title="Download PDF"
          onPress={downloadPdf}
        />
      </View>
    )
  }

    // ✅ Image Picker
    function openImagePicker() {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
        selectionLimit: 1,
      };
  
      launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          const uri = response?.assets?.[0]?.uri;
          if (uri) setProfile(uri);
        }
      });
    }

  function downloadPdf() {
    console.log("downloadPdf");
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
        {renderUpload()}
        {renderInputandBtn()}


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
    color: THEME.white,
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 10,
  },
  txtUpload: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    marginTop: 12
  },
  forgetTxt: { marginTop: 15, marginBottom: 50 }, forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },
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
  valueBox: {  paddingVertical: 1, borderRadius: 8 },
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
  downloadCont:
  { height: 100, borderRadius: 10, borderColor: THEME.white, borderWidth: 1, borderStyle: "dashed", justifyContent: "center", alignItems: "center" },
  inputBackground:
  { height: 120,textAlignVertical: 'top',paddingHorizontal: 20, marginTop: 13,    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: 10,
    color: THEME.white,
   }

});