import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { HOME_ROUTES } from '../../../constants';
import { createCard } from '../../../queries/auth.query';
import { launchImageLibrary } from 'react-native-image-picker';
import { StatusBar } from 'react-native';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import { CommonUtils } from '../../../utils';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        {icon && <Icon name={icon} size={handleSize.f(18)} color={THEME.white} style={{ marginRight: handleSize.w(8) }} />}
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
  const DETAIL = props?.route?.params?.DETAIL;

  console.log("DETAIL==>",DETAIL);
  
    
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
        <InfoRow icon="card-outline" label="Card" value={DETAIL?.amount} />
        <InfoRow icon="person-outline" label="Merchant" value="Transport for London" />
        <InfoRow icon="home-outline" label="Currency" value={DETAIL?.currency} />
      </View>
    );
  }

  function renderTotalAmount() {
    return (
      <>
        <Text style={styles.totalLabel}>Amount</Text>
        <Text style={styles.totalAmount}>{DETAIL?.direction == "debit" ? "-" : "+"} {DETAIL?.amount} {DETAIL?.currency}</Text>
      </>
    );
  }

  function rendermoredetail() {
    return (
      <View style={styles.summaryBox}>
        {/* <InfoRow label="Transaction Date" value="24 July 2025" />
        <InfoRow label="Time" value="13:42 BST" />
        <InfoRow label="Location" value="London, UK" />
        <InfoRow label="Reference Number" value="TFL-205-LDN-00976" />
        <InfoRow label="Transaction ID" value="TXN-94830-TPFL" /> */}

        <InfoRow label="Transaction Date" value={CommonUtils.formatDate(DETAIL?.created_at)} />
        <InfoRow label="Time" value={CommonUtils.formatTime(DETAIL?.created_at)} />
        <InfoRow label="Location" value={"PROVIDE BY CORE"} />
        <InfoRow label="Reference Number" value={""} />
        <Text style={styles.value}>{DETAIL?.reference}</Text>
        <InfoRow label="Transaction ID" value={""} />
        <Text style={styles.value}>{DETAIL?.id}</Text>

      </View>
    );
  }

  function renderUpload() {
    return(
        <TouchableOpacity onPress={openImagePicker} style={styles.downloadCont} >
          <Image source={Images.uploadPhoto} style={{ width: handleSize.w(20), height: handleSize.h(20) }} resizeMode="contain" />
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
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Transaction details</Text>
        {/* <Text style={styles.subtitle}>
          Transport for london.
        </Text> */}

        {DETAIL?.product_type == "Bank" ? null : renderCardDetails()} 
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

  txtUpload: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    marginTop: handleSize.h(12),
  },

  forgetTxt: {
    marginTop: handleSize.h(15),
    marginBottom: handleSize.h(50),
  },

  forgetTxtpop: {
    backgroundColor: THEME.primary,
    width: '100%',
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },

  summaryBox: {
    borderRadius: handleSize.h(8),
    padding: handleSize.h(10),
    marginBottom: handleSize.h(10),
    backgroundColor: THEME.darkSecondary,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: handleSize.h(5),
  },

  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onethree),
    color: THEME.white,
  },

  valueBox: {
    paddingVertical: handleSize.h(2),
    borderRadius: handleSize.h(8),
  },

  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onethree),
    color: THEME.white,
  },

  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    marginBottom: handleSize.h(8),
    marginTop: handleSize.h(15)
  },

  totalAmount: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    color: THEME.primary,
    marginBottom: handleSize.h(30),
  },

  downloadCont: {
    height: handleSize.h(100),
    borderRadius: handleSize.h(10),
    borderColor: THEME.white,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: handleSize.h(15),
  },

  inputBackground: {
    height: handleSize.h(120),
    textAlignVertical: 'top',
    paddingHorizontal: handleSize.h(20),
    marginTop: handleSize.h(13),
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: handleSize.h(10),
    color: THEME.white,
  },
});