// components/inputDropDownStyle.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Images } from "../config";
import { FONTFAMILY, FONT_SIZES, THEME } from "../styles";
import { handleSize } from "../config/responsiveTheme";

export const InputDropDownStyle = ({
  title = "",
  value = null,   // {label, currency, flag} 
  data = [],
  onSelect = () => {},
  isOpen = false,
  onToggle = () => {},
}) => {

  // console.log("data==>",data);
  
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const dropdownHeight =
    data.length < 4 ? data.length * handleSize.h(45) : handleSize.h(180);

  const animatedHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, dropdownHeight],
  });


  return (
    <View style={{ marginBottom: handleSize.h(18) }}>
      {/* ⭐ IF VALUE SELECTED => Show PREVIEW STYLE */}
      {value?.name ? (
        <TouchableOpacity style={styles.selectedBox} onPress={onToggle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="flag" size={handleSize.f(26)} color={THEME.white} />
            <View style={{ marginLeft: handleSize.w(10) }}>
              <Text style={styles.title}>{title}</Text>

              <View style={{ flexDirection: "row", marginTop: handleSize.h(4) }}>
                <Text style={styles.accName}>{value?.name}</Text>

                {value?.iso_code && (
                  <View style={styles.currencyTag}>
                    <Text style={styles.currencyText}>{value?.iso_code}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <Image
            source={Images.dropDown}
            style={{ width: handleSize.w(26), height: handleSize.h(26) }}
            tintColor={THEME.white}
          />
        </TouchableOpacity>
      ) : (
        /* ⭐ IF NO VALUE SELECTED => SIMPLE INPUT BOX (top image style) */
        <Pressable style={styles.inputBox} onPress={onToggle}>
          <Text style={styles.placeholder}>{title}</Text>

          <Image
            source={Images.dropDown}
            style={{ width: handleSize.w(26), height: handleSize.h(26) }}
            tintColor={THEME.white}
          />
        </Pressable>
      )}

      {/* ⭐ DROPDOWN LIST */}
      <Animated.View
        style={[
          styles.dropdown,
          {
            height: animatedHeight,
            maxHeight: handleSize.h(180),
          },
          isOpen && { borderWidth: 1, borderColor: THEME.white },
        ]}
      >
        <FlatList
          data={data}
          nestedScrollEnabled
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                onSelect(item);
                onToggle(false);
              }}
              style={[
                styles.row,
                { borderBottomWidth: data?.length - 1 === index ? 0 : 0.2 },
              ]}
            >
              <Text style={styles.rowText}>
                {item?.account.name} ({item?.currency.iso_code})
              </Text>
            </Pressable>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: handleSize.f(1),
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    height: handleSize.h(56),
    paddingHorizontal: handleSize.w(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  placeholder: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
  },

  selectedBox: {
    borderWidth: 1,
    borderColor: THEME.white,
    borderRadius: handleSize.f(10),
    paddingHorizontal: handleSize.w(12),
    height: handleSize.h(56),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  accName: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },

  currencyTag: {
    backgroundColor: THEME.primary,
    paddingHorizontal: handleSize.w(8),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(8),
    marginLeft: handleSize.w(8),
  },

  currencyText: {
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
  },

  dropdown: {
    position: "absolute",
    top: handleSize.h(58),
    left: 0,
    right: 0,
    backgroundColor: THEME.darkSecondary,
    borderRadius: handleSize.f(14),
    overflow: "hidden",
    zIndex: 999,
  },

  row: {
    height: handleSize.h(45),
    borderBottomColor: THEME.white,
    justifyContent: "center",
    paddingHorizontal: handleSize.w(16),
  },

  rowText: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    color: THEME.white,
  },
});
