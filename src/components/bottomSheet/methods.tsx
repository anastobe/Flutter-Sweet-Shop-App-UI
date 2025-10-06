import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters'; // if you're using scale
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles'; // adjust path as needed
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../../config';
import CustomButton from '../customButton';
import SwitchToggle from "react-native-switch-toggle";
import { ImageBackground } from 'react-native';
import Metrics from '../../styles/metrics';

const Methods = ({ style, onPress1,onPress2 ,onPress3 ,onPress4,backImg }: { style: any, onPress1: any, onPress2: any, onPress3: any, onPress4: any,backImg: any }) => {

  const [atmSwitch, setAtmSwitch] = useState(true);
  const [onlineSwitch, setOnlineSwitch] = useState(false);
  const [chipSwitch, setChipSwitch] = useState(true);
  const [walletSwitch, setWalletSwitch] = useState(false);
    
  function Listitem(icon:any, title:any, subtitle:any, value:boolean, toggle:()=>void) {
    return (
      <View style={styles.containerAlert}>
        <View style={styles.ICONcONT}>
          <Icon name={icon} size={20} color={THEME.textPrimary} />
        </View>
        <View style={{ width: Metrics.width - 110 }}>
          <Text style={styles.titleAbove}>{title}</Text>
          <Text style={styles.descriptionbelow}>{subtitle}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <SwitchToggle
            switchOn={value}
            onPress={toggle}
            circleColorOff={THEME.white}
            circleColorOn={THEME.white}
            backgroundColorOn={THEME.primary}
            backgroundColorOff={THEME.textPrimary}
            containerStyle={styles.toggleContainer}
            circleStyle={styles.toggleCircle}
          />
        </View>
      </View>
    )
  }

return (
 <ImageBackground resizeMode="cover" source={backImg} style={style}>


        {/* <View style={{ width: 70, height: 8, backgroundColor: THEME.lightGrey, alignSelf: "center", borderRadius: 20, marginTop: 8 }} /> */}

        <Text style={styles.title}>Payment Methods</Text>

      {Listitem('flash-outline', "ATM Withdrawals", "Control and monitor your cash withdrawals from ATMs", atmSwitch, () => setAtmSwitch(!atmSwitch))}
      {Listitem('cash-outline', "Online Payments", "Enable or disable card usage for online purchases", onlineSwitch, () => setOnlineSwitch(!onlineSwitch))}
      {Listitem('pin-outline', "Chip & PIN Transactions", "Manage in-person card usage with secure PIN entry", chipSwitch, () => setChipSwitch(!chipSwitch))}
      {Listitem('card-outline', "Wallets", "Control usage of your card via Apple Pay, Google Pay, and others", walletSwitch, () => setWalletSwitch(!walletSwitch))}
    </ImageBackground>
);
};

export default Methods;

const styles = StyleSheet.create({
    title: {
        color: THEME.primary,
        fontFamily: FONTFAMILY.SemiBold,
        fontSize: FONT_SIZES.twosix,
        textAlign: "center",
        marginTop: 25,
        paddingBottom: 15,
        // borderBottomWidth: 0.5,
        // borderColor: THEME.lightGrey,

    },
    containerAlert: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 10,
        paddingBottom: 15,
        // borderBottomWidth: 0.5,
        // borderColor: THEME.lightGrey,
    },
    titleAbove: {
        fontFamily: FONTFAMILY.Medium,
        fontSize: FONT_SIZES.onefour,
        color: THEME.primary,
        marginLeft: 8
    },
    descriptionbelow: {
        fontFamily: FONTFAMILY.Light,
        fontSize: FONT_SIZES.onetwo,
        color: THEME.white,
        marginLeft: 8
    },
    ICONcONT: {
        width: scale(36),
        height: scale(36),
        backgroundColor: THEME.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2F48", // dark background like your design
  },
  toggleContainer: {
    width: 40,      // switch width
    height: 25,     // switch height
    borderRadius: 30,
    padding: 3,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
});
