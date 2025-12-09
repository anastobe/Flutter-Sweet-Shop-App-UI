import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { MainContainerProps } from "./mainContainerTypes";
import { THEME } from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../config";
import { handleSize } from "../config/responsiveTheme";

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
      <ImageBackground
        source={Images.universalGradientBackground}
        style={StyleSheet.absoluteFillObject}
        resizeMode="stretch"
      />

      {showBackArrow && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={pressBackArrow} style={styles.arrowCont}>
            <Image
              source={Images.backArrow}
              style={{ width: handleSize.w(30), height: handleSize.h(30) }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {pressRightArrow && (
            <TouchableOpacity onPress={pressRightArrow} style={styles.rightIconCont}>
              <Icon name="add" size={handleSize.f(20)} color={THEME.textPrimary} />
            </TouchableOpacity>
          )}
        </View>
      )}

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
    width: handleSize.w(40),
    height: handleSize.h(40),
    justifyContent: "center",
    alignItems: "center",
    marginTop: handleSize.h(20),
    marginLeft: handleSize.w(10),
  },
  rightIconCont: {
    width: handleSize.w(28),
    height: handleSize.h(28),
    borderRadius: handleSize.f(50),
    justifyContent: "center",
    alignItems: "center",
    marginTop: handleSize.h(20),
    marginRight: handleSize.w(20),
    backgroundColor: THEME.white,
  },
});
