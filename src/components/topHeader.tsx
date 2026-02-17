import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from "../styles";
import { Images } from "../config";
import { handleSize } from "../config/responsiveTheme";
import Metrics from "../styles/metrics";

const OptionsHeader = ({userData, isFetching,allAccounts,loginUserData,currentAccount, onPressSelectAccounts, onPressThreeDots, leftTxt, onPressNotification, onPressAdd,show, rightIconName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Left Back Arrow */}
     
     {show == "accountname" ?
      <View style={{ flexDirection: "row", alignItems: "center"  }}>
     
   
        {(loginUserData?.customer_type == 'personal' || isFetching) ? 
          <View>
        <Text style={styles.title}>Great to see you,</Text>
        <Text 
          numberOfLines={1} ellipsizeMode="tail"
          style={styles.titlesub}>{`${userData?.first_name + " " + userData?.last_name }`}</Text>
          </View>         
        :
        <View>
        <TouchableOpacity
          onPress={onPressSelectAccounts}
          style={styles.leftCont}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.leftSubCont} >{currentAccount?.name}</Text>
          {allAccounts?.length > 0 &&
          <View style={{ marginLeft: handleSize.w(3), marginTop: handleSize.h(2) }} >
           <Icon
            name="chevron-down-outline"
            size={handleSize.f(17)}
            color={THEME.textPrimary}
            />
          </View>}
        </TouchableOpacity>
          {currentAccount?.status && <Text style={styles.accStatus} >({currentAccount?.status})</Text>}
        </View>
        }

      </View> 
      :
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => navigation.goBack()}
          style={styles.arrowCont}
        >
          <Text numberOfLines={1} style={styles.titleTop}>{leftTxt}</Text>
        </TouchableOpacity>
      </View>
      }
      
      {/* Right Icons */}
      <View style={{ flexDirection: "row", }}>
        <TouchableOpacity
          onPress={onPressNotification}
          style={[styles.rightIconCont, { marginRight: handleSize.w(10) }]}
        >
          <Icon
            name="notifications-outline"
            size={handleSize.f(17)}
            color={THEME.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressThreeDots} style={styles.rightIconCont}>
          <Icon
            name={rightIconName}
            size={handleSize.f(17)}
            color={THEME.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: handleSize.h(5),
    marginHorizontal: handleSize.w(24),
    marginTop: handleSize.f(20),
    // backgroundColor:"red"
  },
  titleTop: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    color: THEME.white,
    marginLeft: handleSize.w(5),
    width: Metrics.width - handleSize.f(150),
  },
  accStatus: {
    marginTop: handleSize.f(4),
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    lineHeight: handleSize.f(20),
    color: THEME.white,
    marginLeft: handleSize.w(5),
    textTransform: 'capitalize',
  },
  leftIconCont: {
    width: handleSize.f(28),
    height: handleSize.f(28),
    borderRadius: handleSize.f(100),
    justifyContent: "center",
    alignItems: "center",
    // marginTop: handleSize.h(20),
    backgroundColor: THEME.white,
  },
  rightIconCont: {
    width: handleSize.f(28),
    height: handleSize.f(28),
    borderRadius: handleSize.f(100),
    justifyContent: "center",
    alignItems: "center",
    // marginTop: handleSize.h(20),
    backgroundColor: THEME.white,
  },
  arrowCont: {
    // marginTop: handleSize.h(25),
  },
    title: {
      color: THEME.white,
      fontFamily: FONTFAMILY.Medium,
      fontSize: handleSize.f(FONT_SIZES.onefour),
    },
  
    titlesub: {
      fontFamily: FONTFAMILY.Light,
      fontSize: handleSize.f(FONT_SIZES.twosix),
      color: THEME.white,
      width: METRICS.width - handleSize.f(140),
      marginTop: handleSize.f(6),
    },
  leftCont:
  { flexDirection: "row", marginRight: handleSize.w(5), backgroundColor: THEME.white, justifyContent: "center", alignItems: "center", borderRadius: handleSize.w(8), height: handleSize.h(30), paddingHorizontal: handleSize.w(10), width: handleSize.w(150)},
  leftSubCont:
  {width: handleSize.w(110), textAlign: "center", color: THEME.textPrimary, fontFamily: FONTFAMILY.SemiBold, fontSize: handleSize.f(FONT_SIZES.onetwo) }
});

export default OptionsHeader;