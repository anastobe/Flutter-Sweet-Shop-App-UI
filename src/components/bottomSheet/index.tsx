import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ViewStyle, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { THEME } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<RBSheet>;
  children?: any;
  height?: number;           // min height
  maxHeightPercent?: number; // default max screen percent
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
  maxHeightPercent = 0.65,
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
    borderTopLeftRadius: handleSize.f(20),
    borderTopRightRadius: handleSize.f(20),
    backgroundColor: THEME.gray,
  },
});
