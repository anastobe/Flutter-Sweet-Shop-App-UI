import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FONT_SIZES, THEME } from "../styles";
import { handleSize } from "../config/responsiveTheme";
import Metrics from "../styles/metrics";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^[0-9]*$/.test(text)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    onChange && onChange(newOtp.join(""));
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.row}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.box}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: handleSize.h(0),
  },
  box: {
    width: Metrics.width /6 -  handleSize.f(17), // adjusted width for better scaling
    height: handleSize.f(50),
    borderRadius: handleSize.f(8),
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 0.8,
    borderColor: THEME.white,
    textAlign: "center",
    color: "#fff",
    fontSize: handleSize.f(FONT_SIZES.twozero),
  },
});
