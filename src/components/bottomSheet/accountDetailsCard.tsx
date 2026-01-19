import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';

const AccountDetailsCard = ({ details, onPressShare, onPressCopy, onPressEdit }) => {

  function renderOptons(icon, tintColor, background, press) {
    return (
      <TouchableOpacity
        onPress={press}
        style={[
          styles.boxContainer,
          { backgroundColor: background }
        ]}
      >
        <Icon name={icon} size={handleSize.f(16)} color={tintColor} style={{ marginLeft: handleSize.w(6) }} />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <ScrollView
        style={{ marginTop: handleSize.h(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.accountdetail}>Account details</Text>

        <View style={styles.container}>
          {details.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.valueWrapper}>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomOptions}>
          {renderOptons("arrow-redo-outline", THEME.textPrimary, THEME.primary, onPressShare)}
          {renderOptons("copy-outline", THEME.textPrimary, THEME.primary, onPressCopy)}
          {/* {renderOptons("create-outline", THEME.textPrimary, THEME.primary, onPressEdit)} */}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: handleSize.h(20),
    padding: handleSize.h(12),
    marginHorizontal: handleSize.w(12),
    marginTop: handleSize.h(10),
  },

  accountdetail: {
    fontSize: handleSize.f(FONT_SIZES.twosix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    textAlign: "center",
    marginTop: handleSize.h(20),
  },

  row: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: handleSize.h(10),
  },

  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
  },

  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.white,
  },

  boxContainer: {
    width: handleSize.w(65),
    height: handleSize.h(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: handleSize.h(65),
    marginLeft: handleSize.w(10),
  },

  bottomOptions: {
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  }
});

export default AccountDetailsCard;
