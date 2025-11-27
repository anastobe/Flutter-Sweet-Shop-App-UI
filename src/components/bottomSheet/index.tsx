import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, StyleSheet, Text, ViewStyle, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { THEME } from '../../styles';
// import { useTheme } from '../../hooks';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<RBSheet>;
  children?: any;
  height?: number;
  openTime?: number;
  customContainerStyle?: ViewStyle;
  draggable?: any;
  closeDuration?: any;
  onClose?: any
}



export const BottomSheet: React.FC<BottomSheetProps> = ({onClose, bottomSheetRef,closeDuration,draggable, children, height, openTime, customContainerStyle, ...rest }) => {

  const { colors } = useTheme()

  return (
    <RBSheet
      ref={bottomSheetRef}    
      animationType="slide"
      height={height}
      closeDuration={closeDuration}
      openDuration={openTime ? openTime : 300}
      closeOnPressMask={true} 
      closeOnPressBack={true}
      onClose={onClose}
      draggable={draggable == false ? false : true}
      customStyles={
        customContainerStyle ? 
        customContainerStyle
        :
        { container: [styles.container ] } 
      }
      {...rest}
    >
      {children}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: THEME.gray
  },
 


});