import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { MainContainerProps } from "./mainContainerTypes";
import { useTheme } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../config";

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  customeStyle,
  hidden = false,
  onRefresh,
  refreshing,
  mainContainerStyle,
  barStyle = "light-content",
  isFlatList,
  showBackArrow,
  pressBackArrow,
  refreshingeffect,
  pressRightArrow,
}) => {

  return (
    <SafeAreaView style={[{ flex: 1 }, mainContainerStyle]}>
      <StatusBar
        translucent={true}
        hidden={hidden}
        barStyle={"light-content"}
        backgroundColor="transparent"
      />

      {/* 🔥 BACKGROUND IMAGE (REPLACES LINEAR GRADIENT) */}
      <ImageBackground
        source={Images.universalGradientBackground}
        style={StyleSheet.absoluteFillObject}
        resizeMode="stretch" // contain / stretch / cover (you can choose)
      />

      {/* BACK ICONS */}
      {showBackArrow && (
        <View 
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <TouchableOpacity onPress={pressBackArrow} style={styles.arrowCont}>
            <Image source={Images.backArrow} style={{ width: 30, height: 30 }} resizeMode="contain" />
            {/* <Icon name="arrow-back-outline" size={34} color={THEME.white} /> */}
          </TouchableOpacity>

          {pressRightArrow && (
            <TouchableOpacity
              onPress={pressRightArrow}
              style={styles.rightIconCont}
            >
              <Icon name="add" size={20} color={THEME.textPrimary} />
            </TouchableOpacity>
          )}
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
            refreshingeffect ? (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ) : undefined
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
  arrowCont: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  rightIconCont: {
    width: 28,
    height: 28,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 20,
    backgroundColor: THEME.white,
  },
});
