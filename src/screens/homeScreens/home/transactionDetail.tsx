import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, Linking } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { HOME_ROUTES } from '../../../constants';
import { createCard, resetPassword, uploadFile } from '../../../queries/auth.query';
import { launchImageLibrary } from 'react-native-image-picker';
import { StatusBar } from 'react-native';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import { CommonUtils, Toast } from '../../../utils';
import { useSelector } from 'react-redux';
import { getCardsUsageRules } from '../../../queries/card.Queries/card.query';
import { getTransactionAttachement } from '../../../queries/accountQueries/accountQuery';
import QueryKey from '../../../queries/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { ImageBackground } from 'react-native';
import commonUtils from '../../../utils/common.utils';
import { Alert } from 'react-native';
import {
  pick,
  types,
  DocumentPickerResponse,
} from '@react-native-documents/picker';
import { LoaderCompleteScreenOnly, LoaderFullScreen } from '../../../components/activityIndicator';
import Metrics from '../../../styles/metrics';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB


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
  const [downloading, setDownloading] = useState(false);
  const [Profile, setProfile] = useState({
    uri: '',
    type: '',
    name: '',
    size: ''
  });
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const DETAIL = props?.route?.params?.DETAIL;

  // console.log("DETAIL==>",DETAIL);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData)

  const user = useMemo(() => {
    return loginUserData?.members?.[0] ?? null;
  }, [loginUserData]);
    
  const { mutate: uploadFileFunc, isPending: isPending_uploadFile } = uploadFile({
    callback: (response: any) => {
        if (response?.success) {
          navigation?.goBack()
        }
    },
  });

  const {
    data: getTransactionAttachementData,
    refetch: refetchgetTransactionAttachement,
    isFetching: isPendinggetTransactionAttachement,
  } = getTransactionAttachement({
    enabled: true,
    id: DETAIL?.reference
  });

  useEffect(()=>{
    if (DETAIL?.reference) {
      refetchgetTransactionAttachement(DETAIL?.reference)
    }
    
    return () => {
      queryClient.removeQueries({
        queryKey: [QueryKey.GET_TRANSACTIONS,  DETAIL?.reference],
      });
    };

  },[DETAIL?.reference])

  console.log("==>",getTransactionAttachementData,"---",DETAIL?.reference,"-",isPendinggetTransactionAttachement);
  

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

  // console.log("user==>",user);
  

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
        <InfoRow label="Location" value={""} />
        <Text style={styles.value}>{[user?.address_line1, user?.address_line2, user?.address_line3]
          .filter(Boolean)
          .join(' ') || '-'}
          </Text>
        <InfoRow label="Reference Number" value={""} />
        <Text style={styles.value}>{DETAIL?.reference}</Text>
        <InfoRow label="Transaction ID" value={""} />
        <Text style={styles.value}>{DETAIL?.id}</Text>

      </View>
    );
  }

  function pressCancel() {
    setProfile({
    uri: '',
    type: '',
    name: '',
    size: ''
  })
  }
   

  function renderNotUpload() {
    if (Profile?.uri) {
      return(
        <View style={{ flexDirection: "row", }} >
          <TouchableOpacity style={styles.fileCont}  activeOpacity={0.8} >
            <Text  numberOfLines={2} ellipsizeMode="tail" style={styles.txtUpload2} >
              {Profile?.name}
            </Text>
            <TouchableOpacity style={styles.crossCont} onPress={()=>{ if (!isPending_uploadFile) {pressCancel()} }} >
              <Icon
                name={'close'}
                size={handleSize.f(16)}
                color={THEME.textPrimary}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )
    }
    else
    return(
      <TouchableOpacity onPress={openFilePicker} style={styles.downloadCont} >
        <Image source={Images.uploadPhoto} style={{ width: handleSize.w(20), height: handleSize.h(20) }} resizeMode="contain" />
        <Text style={styles.txtUpload}>Upload Photo or Receipt</Text>
      </TouchableOpacity>
    )
  }

  function renderUpload() {
    return(
        <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
        {getTransactionAttachementData?.results?.splice(0,1)?.map((v: any,i:any)=>{
          return(
            <TouchableOpacity key={i} style={[styles.fileCont,{ marginLeft: i > 0 ? handleSize.f(5) : 0 }]}  activeOpacity={0.8} onPress={()=>prevewDoc(v?.url)} >
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txtUpload2} >
                {v?.type}
              </Text>
              <Icon
                name={'document-outline'}
                size={handleSize.f(14)}
                color={THEME.white}
              />
            </TouchableOpacity>
            )
        })}
      </View>
    )
  }

  function pressDownload() {
    console.log("pending");
    return

    if (!getTransactionAttachementData?.results?.length) return null; 
    if (getTransactionAttachementData?.results?.length) {
      downloadPdf(getTransactionAttachementData?.results?.[0]?.url)
    }
  }
  
  function renderUploadedStuffs() {
    return(
      <View>
        {/* <TextInput
          multiline
          placeholderTextColor={THEME.white}
          style={styles.inputBackground}
          placeholder="Comment"
          value={comments}
          onChangeText={setcomments}
          keyboardType={"default"}
        /> */}
        
        <CustomButton
          btnContSty={styles.forgetTxt}
          loading={false}
          title="Download Attachement"
          onPress={pressDownload}
        />
      </View>
    )
  }

  function renderNot_UploadedStuffs() {
    return(
      <View>
          <CustomButton
          btnContSty={styles.forgetTxt1}
          loading={isPending_uploadFile }
          title="Save"
          onPress={saveTransaction}
        />
      </View>
    )
  }

  function prevewDoc(url: string) {
    Linking.openURL(url)
  }

async function openFilePicker() {
  try {
    const res = await pick({
      type: [
        types.images,
        types.pdf,
        types.plainText,
        types.doc,
        types.docx,
        types.xls,
        types.xlsx,
      ],
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    });

    let response = res?.[0]

    if (response?.size > MAX_SIZE) {
      Alert.alert('File size must be less than 5MB');
      return;
    }

    setProfile({
      uri: response?.uri,
      type: response?.type,
      name: response?.name,
      size: response?.size
    })

    console.log("====>",{
      uri: response?.uri,
      type: response?.type,
      name: response?.name,
      size: response?.size
    });
    

  } catch (err: any) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      console.log('User cancelled picker');
    } else {
      console.error('Picker error:', err);
    }
  }
}


  // function downloadPdf(url: any) {
  //   CommonUtils.downloadFile(url)
  // }

  function downloadPdf(url: string) {
    setDownloading(true);

    CommonUtils.downloadFile(
      url,
      () => setDownloading(false),     // onSuccess
      () => setDownloading(false),     // onError
    );
  }

function saveTransaction() {

  if (DETAIL?.reference == "") {
    Toast.showToast("Refrence id is missing", '', 'error');
  }
  else if (Profile?.uri == "" || Profile?.type == "" || Profile?.name == "") {
    Toast.showToast("Select document", '', 'error');
  }
  else{
    const formData = new FormData();

    const fileUri =
      Platform.OS === 'android'
        ? Profile?.uri
        : Profile?.uri.replace('file://', '');

    formData.append('payment_request_id', DETAIL?.reference);
    formData.append('file', {
      uri: fileUri,
      type: Profile?.type || 'image/jpeg',
      name: Profile?.name || 'document.jpg',
    } as any);

    console.log("uploadFileFunc==>",formData);

    uploadFileFunc(formData);
  
  }
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

      <View style={{ marginHorizontal: handleSize.w(20), paddingBottom: handleSize.h(50) }}>
        <Text style={styles.title}>Transaction details</Text>
        {/* <Text style={styles.subtitle}>
          Transport for london.
        </Text> */}

        {DETAIL?.product_type == "Bank" ? null : renderCardDetails()} 
        {renderTotalAmount()}
        {rendermoredetail()}

        {isPendinggetTransactionAttachement ? (
          <View style={{ marginTop: handleSize.h(20) }}>
            <ActivityIndicator size="small" color={THEME.primary} />
          </View>
        )
        :
        getTransactionAttachementData?.results?.length ?
        <View>
          <Text style={[styles.title2,{ marginTop: handleSize.f(20) }]}>Uploaded file</Text>
          {renderUpload()}
          {renderUploadedStuffs()}
        </View>
        :
        <View>
          {renderNotUpload()}
          {renderNot_UploadedStuffs()}
        </View>
        
        }


      </View>
      {downloading && (
        <LoaderCompleteScreenOnly />
      )}
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
  title2:{
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    lineHeight: handleSize.h(20),
  },
  txtUpload2: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    paddingRight: handleSize.f(10),
    lineHeight: handleSize.f(14),
    maxWidth: Metrics.width - handleSize.w(90)
  },
  txtUpload: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    marginTop: handleSize.h(12),
  },
  forgetTxt1: {
    marginTop: handleSize.h(15),
    marginBottom: handleSize.h(0),
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
    marginBottom: handleSize.h(0),
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
    marginBottom: handleSize.f(25),
  },
  crosPosition:
  { position: "absolute", right: 5, top: 5, backgroundColor: THEME.white, borderRadius: handleSize.f(100), borderColor: THEME.textPrimary, borderWidth: 1 },

  downloadCont: {
    height: handleSize.h(100),
    borderRadius: handleSize.h(10),
    borderColor: THEME.white,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: handleSize.f(10),
  },
  crossCont:
  { width: handleSize.f(20), height: handleSize.f(20), justifyContent: "center",alignItems: "center", backgroundColor: THEME.white, borderRadius: 100 },
  fileCont:
  { height: handleSize.f(40), paddingHorizontal: handleSize.f(10), marginTop: handleSize.f(8), backgroundColor: THEME.darkSecondary, alignItems: "center", justifyContent: "space-around", flexDirection: "row", borderRadius: 8, borderColor: THEME.white, borderWidth: 1, borderStyle: "dotted", },
  IMG:{
  width: handleSize.f(80),
  height: handleSize.f(80), 
  marginLeft: handleSize.w(10), 
  borderRadius: handleSize.f(10),
  marginTop: handleSize.h(8)
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