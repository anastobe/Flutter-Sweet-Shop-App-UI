// FreezeCardModal.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { BlurView } from '@react-native-community/blur';
import { Images } from '../../config';
import { handleSize } from '../../config/responsiveTheme';

type Props = {
  onClose?: () => void;
  btnLoader?: boolean;
  botmBtmLoader?: boolean;
  iconNameBottom?: number;
  showCancelBtn?: boolean;
  onConfirm?: () => void;
  onPressBottomBtn?: () => void;
  title?: string;
  marginTopTitle?: number;
  showSubBody?: boolean;
  showSubBodyIcon?: boolean
  body?: string;
  subBody?: string;
  iconName?: string;
  confirmText?: string;
  backImg?: any;
  style?: any;
  downConfirmText?: string;
};

const BluryModal: React.FC<Props> = ({
  onClose,
  btnLoader,
  botmBtmLoader,
  showCancelBtn,
  onConfirm,
  onPressBottomBtn,
  title,
  marginTopTitle,
  showSubBody,
  showSubBodyIcon,
  body,
  subBody = '',
  iconName = 'snow-outline',
  confirmText = '',
  downConfirmText = '',
  iconNameBottom,
  backImg,
  style,
}) => {
  return (
    <View style={{ width: '100%' }}>
  <View style={[{ 
    borderRadius: handleSize.f(16), 
    overflow: "hidden",
  },styles.modal]}>
        {/* 🔥 Background blur */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurAmount={15}
          blurType="dark"
        />

        {/* CLOSE BUTTON */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Image
            source={Images.modalCross}
            style={{
              width: handleSize.w(32),
              height: handleSize.h(32),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ICON */}
        <View style={{ alignItems: 'center', marginTop: marginTopTitle ? handleSize.h(marginTopTitle) : handleSize.h(20) }}>
          {iconName && (
            <View style={[styles.iconCircle, { marginBottom: iconNameBottom ? handleSize.h(iconNameBottom) : handleSize.h(20) }]}>
              <Icon name={iconName} size={handleSize.f(40)} color={THEME.textPrimary} />
            </View>
          )}
        </View>

        {/* TITLE */}
        {title && <Text style={styles.titles}>{title}</Text>}

        {/* BODY */}
        {body && <Text style={styles.description}>{body}</Text>}

        {/* SUB BODY */}
        {showSubBody && (
          <View style={styles.containerAlert}>
            {showSubBodyIcon ? <View style={styles.ICONcONT}>
              <Icon name="alert-circle-outline" size={handleSize.f(22)} color={THEME.primary} />
            </View> : null}
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
        {showCancelBtn && (
          <CustomButton
            loading={botmBtmLoader}
            btnContSty={{ backgroundColor: THEME.white, width: '100%' }}
            title={downConfirmText}
            onPress={onPressBottomBtn}
          />)}
      </View>
    </View>
  );
};

export default BluryModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: handleSize.f(16),
    padding: handleSize.h(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: handleSize.h(15),
    right: handleSize.w(15),
    width: handleSize.w(35),
    height: handleSize.h(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(50),
    width: handleSize.f(65),
    height: handleSize.f(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    lineHeight: handleSize.h(26),
    color: THEME.white,
    textAlign: 'center',
    marginTop: handleSize.h(15),
  },
  description: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    lineHeight: handleSize.h(20),
    textAlign: 'center',
    marginTop: handleSize.h(10),
  },
  containerAlert: {
    flexDirection: 'row',
    paddingVertical: handleSize.h(5),
    paddingHorizontal: handleSize.w(10),
    marginHorizontal: handleSize.w(10),
    borderRadius: handleSize.f(10),
    marginTop: handleSize.h(10),
  },
  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginLeft: handleSize.w(10),
    lineHeight: handleSize.h(20),
  },
  ICONcONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.f(12),
  },
  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(15),
    width: '100%',
  },
});
