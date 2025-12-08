import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { THEME } from '../../styles';
import { ScrollView } from 'react-native';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<RBSheet>;
  children?: any;
  height?: number;           // min height
  maxHeightPercent?: number; // new prop
  openTime?: number;
  customContainerStyle?: ViewStyle;
  draggable?: any;
  closeDuration?: any;
  onClose?: any;
}

const screenHeight = Dimensions.get('window').height;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  onClose,
  bottomSheetRef,
  closeDuration,
  draggable,
  children,
  height = 300,
  maxHeightPercent = 0.65,   // default: 65% of screen
  openTime,
  customContainerStyle,
  ...rest
}) => {

  const dynamicHeight = Math.min(height, screenHeight * maxHeightPercent);
  
  return (
    <RBSheet
      ref={bottomSheetRef}
      animationType="slide"
      height={dynamicHeight}
      closeDuration={closeDuration}
      openDuration={openTime ?? 300}
      closeOnPressMask={true}
      closeOnPressBack={true}
      onClose={onClose}
      draggable={draggable === false ? false : true}
      customStyles={{
        container: [
         styles.container,
          customContainerStyle,
        ],
      }}
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