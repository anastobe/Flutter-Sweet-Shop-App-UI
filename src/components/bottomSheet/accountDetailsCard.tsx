import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTFAMILY, FONT_SIZES, THEME } from '../../styles';

const AccountDetailsCard = ({ details, onPressShare, onPressCopy  }) => {

    function renderOptons(icon: any, tintColor: any, background: any, press: any) {
        return(
            <TouchableOpacity onPress={press} style={[styles.boxContainer,{  backgroundColor: background }]} >
                <Icon name={icon} size={16} color={tintColor} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
        )
    }

  return (
    <View>
        {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 20 }} /> */}
        <Text style={styles.accountdetail} >Account Details</Text>
            <View style={styles.container}>
                {details.map((item: any, index: any) => (
                    <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <View style={styles.valueWrapper}>
                        <Text style={[styles.value]}>
                        {item.value}
                        </Text>
                        {/* {item.copy && (
                        <TouchableOpacity onPress={item.onCopy}>
                            <Icon name="copy-outline" size={16} color={THEME.prinkishBlue} style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                        )} */}
                    </View>
                    </View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 20 }} >
              {renderOptons("arrow-redo-outline",THEME.textPrimary,THEME.primary,onPressShare)}
              {renderOptons("copy-outline",THEME.textPrimary,THEME.primary,onPressCopy)}
            </View>
        <View>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: THEME.textPrimary,
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 12,
    marginTop: 10
  },
  accountdetail:
  { fontSize: FONT_SIZES.twosix, fontFamily: FONTFAMILY.SemiBold, color: THEME.white, textAlign: "center", marginTop: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.primary
  },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.primary,
  },
  boxContainer:
  { width: 65, height: 45,justifyContent: "center", alignItems: "center", borderRadius: 65, marginLeft: 10 }

});

export default AccountDetailsCard;
