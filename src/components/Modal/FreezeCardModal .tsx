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
import CustomButton from '../customButton';            
import {
  THEME,
  FONTFAMILY,
  FONT_SIZES,
} from '../../styles';
import { ImageBackground } from 'react-native';
import { Images } from '../../config';
import { handleSize } from '../../config/responsiveTheme';

type Props = {
  visible: boolean;
  onClose: () => void;
  btnLoader: boolean;
  onConfirm: () => void;
  title: string;
  showSubBody?: boolean;
  body: string;
  subBody?: string;
  iconName?: string;
  confirmText?: string;
  backImg?: any;
  style?: any;
  downConfirmText?: any;
};

const FreezeCardModal: React.FC<Props> = ({
  visible,
  onClose,
  btnLoader,
  onConfirm,
  title,
  showSubBody,
  body,
  subBody = '',
  iconName = 'snow-outline',
  confirmText = '',
  downConfirmText = "",
}) => {
  return (
    <ImageBackground
      imageStyle={{ borderRadius: handleSize.w(16) }}
      source={Images.bottogSheetGradient}
      style={styles.modal}
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Icon name={iconName} size={handleSize.f(40)} color={THEME.textPrimary} />
      </View>

      <Text style={styles.titles}>{title}</Text>

      {!!body && <Text style={styles.description}>{body}</Text>}

      {showSubBody && (
        <View style={styles.containerAlert}>
          <View style={styles.ICONcONT}>
            <Icon name={'alert-circle-outline'} size={handleSize.f(22)} color={THEME.white} />
          </View>
          <Text style={styles.descriptionbelow}>{subBody}</Text>
        </View>
      )}

      <CustomButton
        loading={btnLoader}
        btnContSty={styles.forgetTxt}
        title={confirmText}
        onPress={onConfirm}
      />

      <CustomButton
        loading={false}
        btnContSty={{ backgroundColor: THEME.white, width: '100%' }}
        title={downConfirmText}
        onPress={onClose}
      />
    </ImageBackground>
  );
};

export default FreezeCardModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: handleSize.w(16),
    padding: handleSize.h(24),
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  closeBtn: {
    position: 'absolute',
    top: handleSize.h(10),
    right: handleSize.w(15),
    width: handleSize.w(35),
    height: handleSize.h(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    fontSize: handleSize.f(FONT_SIZES.threesix),
    color: THEME.white,
  },

  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.w(50),
    width: handleSize.w(65),
    height: handleSize.h(65),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },

  titles: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.twosix),
    color: THEME.white,
    textAlign: 'center',
  },

  description: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    lineHeight: handleSize.h(18),
    textAlign: 'center',
    marginTop: handleSize.h(10),
  },

  containerAlert: {
    flexDirection: 'row',
    paddingVertical: handleSize.h(15),
    paddingHorizontal: handleSize.w(10),
    marginHorizontal: handleSize.w(10),
    borderRadius: handleSize.w(10),
    marginTop: handleSize.h(10),
  },

  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginLeft: handleSize.w(10),
  },

  ICONcONT: {
    width: handleSize.w(36),
    height: handleSize.h(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.w(12),
  },

  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(15),
    width: '100%',
  },
});
