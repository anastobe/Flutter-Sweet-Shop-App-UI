// FreezeCardModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';            // adjust the import to your path
import {
  THEME,
  FONTFAMILY,
  FONT_SIZES,
} from '../../styles';
import { scale } from 'react-native-size-matters';

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
}) => {
  return (
       <View style={styles.modal}>
       <TouchableOpacity style={styles.closeBtn} onPress={onClose} >
         <Text style={styles.closeText}>×</Text>
       </TouchableOpacity>

      
         <View style={styles.iconCircle}>
            <Icon name={'snow-outline'} size={40} color={THEME.white} />
         </View>
        

       <Text style={styles.titles}>{title}</Text>
         <Text style={styles.description}>
         {body}
         </Text>

       {showSubBody && <View style={styles.containerAlert} >
         <View style={styles.ICONcONT} >
          <Icon name={'alert-circle-outline'} size={30} color={THEME.prinkishBlue} />
         </View>
         <Text style={styles.descriptionbelow}>
            {subBody}
         </Text>
       </View>}

      <CustomButton
        loading={btnLoader}
         btnContSty={styles.forgetTxt}
         title={confirmText}
         onPress={onConfirm}
       />
          
       <TouchableOpacity onPress={onClose} >
       <Text style={styles.cancelTxt}>
         Cancel
       </Text>
       </TouchableOpacity>

     </View>
  );
};

export default FreezeCardModal;

/* ------------------------------------------------------------------ */
/* 🔽  Styles – copied verbatim from the object you provided + backdrop */

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%'
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  iconCircle: {
    backgroundColor: THEME.lightred,
    borderRadius: 50,
    width: scale(65),
    height: scale(65),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  titles: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  containerAlert: {
    backgroundColor: THEME.textPrimary,
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
    color: THEME.primary,
    marginLeft: 10,
    flex: 1,
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
    backgroundColor: THEME.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  forgetTxt: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  cancelTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
  },
});
