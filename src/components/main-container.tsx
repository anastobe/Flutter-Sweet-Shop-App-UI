import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { MainContainerProps } from "./mainContainerTypes";
import { useTheme } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  customeStyle,
  hidden = false,
  onRefresh,
  refreshing,
  mainContainerStyle,
  barStyle = 'light-content',
  barBg,
  isFlatList,
  showBackArrow,
  pressBackArrow,
  refreshingeffect,
  pressRightArrow
}) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        mainContainerStyle,
      ]}
    >
      <StatusBar
        translucent={true}
        hidden={hidden}
        barStyle={barStyle}
        backgroundColor="transparent" // 👈 transparent kar do
      />

      {/* BACKGROUND GRADIENT */}
      <LinearGradient
        colors={['#713d9f', '#2A1E60', '#0C1445']}
        locations={[0.1, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject} // 👈 poori screen cover karega
      />

      {/* BACK ARROW */}
      {showBackArrow && (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
        <TouchableOpacity onPress={pressBackArrow} style={styles.arrowCont}>
          <Icon name="arrow-back-outline" size={34} color={THEME.white} />
        </TouchableOpacity>

        {pressRightArrow && <TouchableOpacity onPress={pressRightArrow} style={styles.rightIconCont}>
            <Icon name="add" size={20} color={THEME.textPrimary}  />
        </TouchableOpacity>}
        </View>
      )}

      {/* CONTENT */}
      {!isFlatList ? (
        <TouchableWithoutFeedback>
          <View style={[styles.container, customeStyle]}>{children}</View>
        </TouchableWithoutFeedback>
      ) : (
        <ScrollView
          refreshControl={
            refreshingeffect
              ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              : undefined
          }
        >
          <View style={[styles.container, customeStyle]}>{children}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowCont:
    { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginTop: 20, marginLeft: 20 },
    rightIconCont: 
    { width: 28, height: 28, borderRadius: 50, justifyContent: "center", alignItems: "center", marginTop: 20, marginRight: 20, backgroundColor: THEME.white },
    titleRight:{
      fontSize: FONT_SIZES.twozero,
      fontFamily: FONTFAMILY.SemiBold,
      color: THEME.textPrimary,
      top: -2
    }
});