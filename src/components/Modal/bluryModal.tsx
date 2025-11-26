// FreezeCardModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';            // adjust the import to your path
import {
  THEME,
  FONTFAMILY,
  FONT_SIZES,
} from '../../styles';
import { scale } from 'react-native-size-matters';
import { ImageBackground } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { Images } from '../../config';

type Props = {
  onClose?: () => void;
  btnLoader?: boolean;
  iconNameBottom?: any;
  showCancelBtn?: Boolean;
  onConfirm?: () => void;
  title: string;
  marginTopTitle?: number;
  showSubBody?: boolean;
  body?: string;
  subBody?: string;
  iconName?: string;
  confirmText?: string;
  backImg?: any;
  style?: any;
  downConfirmText?: any
};

const BluryModal: React.FC<Props> = ({
  onClose,
  btnLoader,
  showCancelBtn,
  onConfirm,
  title,
  marginTopTitle,
  showSubBody,
  body,
  subBody = '',
  iconName = 'snow-outline',
  confirmText = '',
  downConfirmText = "",
  iconNameBottom,
  backImg,
  style
}) => {
  return (
<View style={{ width: '100%'}}>
  
  <View style={[{ 
    borderRadius: 16, 
    overflow: "hidden",
  },styles.modal]}>
    
    {/* 🔥 Background blur */}
    <BlurView
      style={StyleSheet.absoluteFill}
      blurAmount={15}        // 25–30
      blurType="dark"       // iOS
    //   reducedTransparencyFallbackColor="#000"
    //   blurAmount={10}    // 👈 increase this (20–30)
    //   reducedTransparencyFallbackColor="rgba(255,255,255,0.15)" // 👈 optional
    />
      
      {/* CLOSE BUTTON */}
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        {/* <Text style={styles.closeText}>×</Text> */}
        <Image source={Images.modalCross} style={{ width: 32, height: 32  }} resizeMode="contain" />
        
      </TouchableOpacity>

      {/* ICON */}
      <View style={{ alignItems: 'center', marginTop: marginTopTitle ? marginTopTitle : 20 }}>
       {iconName && <View style={[styles.iconCircle,{ marginBottom: iconNameBottom ? iconNameBottom : 20, }]}>
          <Icon name={iconName} size={40} color={THEME.textPrimary} />
        </View>}
      </View>

      {/* TITLE */}
      <Text style={styles.titles}>{title}</Text>

      {/* BODY */}
      {body && <Text style={styles.description}>{body}</Text>}

      {/* SUB BODY */}
      {showSubBody && (
        <View style={styles.containerAlert}>
          <View style={styles.ICONcONT}>
            <Icon name={'alert-circle-outline'} size={22} color={THEME.primary} />
          </View>
          <Text style={styles.descriptionbelow}>{subBody}</Text>
        </View>
      )}

      {/* CONFIRM BUTTON */}
      <CustomButton
        loading={btnLoader}
        btnContSty={styles.forgetTxt}
        title={confirmText}
        onPress={onConfirm}
      />

      {/* CANCEL BUTTON */}
      {showCancelBtn && <CustomButton
        loading={false}
        btnContSty={{ backgroundColor: THEME.white, width: '100%' }}
        title={downConfirmText}
        onPress={onClose}
      />}

    {/* </View> */}

  </View>

</View>

  );
};

export default BluryModal;

/* ------------------------------------------------------------------ */
/* 🔽  Styles – copied verbatim from the object you provided + backdrop */

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modal: {
    // backgroundColor:  'rgba(0,0,0,0.8)',
    borderRadius: 16,
    // opacity: 0.8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 'auto',
    // marginBottom: 'auto',
    
    // width: '100%'
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 35, height: 35, justifyContent: "center", alignItems: "center"
  },
  closeText: {
    fontSize: 36,
    color: THEME.white,
  },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: 50,
    width: scale(65),
    height: scale(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: FONT_SIZES.twotwo,
    lineHeight: 26,
    color: THEME.white,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  containerAlert: {
    // backgroundColor: THEME.textPrimary,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    marginLeft: 10,
    lineHeight: 20
    // flex: 1,
  },
  okButton: {
    backgroundColor: '#e184ff',
    borderRadius: 25,
    width: '100%',
    paddingVertical: 12,
  },
  ICONcONT: {
    width: scale(36),
    height: scale(36),
    // backgroundColor: THEME.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  forgetTxt: {
    marginTop: 20,
    marginBottom: 15,
    width: '100%',
  },
  cancelTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
  },
});
