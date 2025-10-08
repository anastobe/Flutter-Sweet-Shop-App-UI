// src/screens/Auth/useSetPasswordViewModel.ts

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth_ROUTES } from "../../constants";
import { THEME } from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

export const useSetPasswordViewModel = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const toggleSecure = () => setSecure(!secure);
  const toggleSecure2 = () => setSecure2(!secure2);

  const rules = {
    minLength: (text: string) => text.length >= 8,
    lowerCase: (text: string) => /[a-z]/.test(text),
    upperCase: (text: string) => /[A-Z]/.test(text),
    number: (text: string) => /\d/.test(text),
    specialChar: (text: string) => /[!@#$%^&*]/.test(text),
  };


  const onSubmit = () => {
    navigation.navigate(Auth_ROUTES.LOGIN as never);
  };

  return {
    password,
    newPassword,
    secure,
    secure2,
    rules,
    toggleSecure,
    toggleSecure2,
    setPassword,
    setNewPassword,
    onSubmit,
  };
};
