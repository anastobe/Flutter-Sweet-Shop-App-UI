import React from "react";
import {
  View,
  StyleSheet,
  Modal as RNModal,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlexStyle,
  GestureResponderEvent,
} from "react-native";
import { THEME } from "../../styles";
import { handleSize } from "../../config/responsiveTheme";

type ModalProps = {
  isVisible: boolean;
  backOpacityColor?: any;
  isKeyboardAvoidingView?: boolean;
  children: React.ReactChild[] | React.ReactChild;
  onClose?: (event: GestureResponderEvent) => void;
  contentStyles?: FlexStyle | Array<FlexStyle>;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    isVisible = false,
    isKeyboardAvoidingView = false,
    children,
    onClose = () => {},
    contentStyles = {},
    backOpacityColor,
  } = props;

  const renderContent = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={contentStyles}>{children}</View>
    </TouchableWithoutFeedback>
  );

  return (
    <RNModal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={[
          styles.centeredView,
          { backgroundColor: backOpacityColor ? backOpacityColor : "rgba(0,0,0,0.5)" },
        ]}
      >
        <View style={[styles.modalView(THEME.white)]}>
          {isKeyboardAvoidingView ? (
            <KeyboardAvoidingView behavior="padding">{renderContent()}</KeyboardAvoidingView>
          ) : (
            renderContent()
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create<any>({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: (color: string) => ({
    width: "90%",
    zIndex: 2,
    borderRadius: handleSize.f(12),
  }),
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
