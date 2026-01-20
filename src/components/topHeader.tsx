import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FONT_SIZES, FONTFAMILY, THEME } from "../styles";
import { Images } from "../config";
import { handleSize } from "../config/responsiveTheme";

const OptionsHeader = ({isFetching,loginUserData,currentAccount, onPressSelectAccounts, onPressThreeDots, leftTxt, onPressNotification, onPressAdd,show }) => {
  const navigation = useNavigation();

  // console.log("currentAccount==>",currentAccount); 
  

  return (
    <View style={styles.headerContainer}>
      {/* Left Back Arrow */}
     
     {show == "accountname" ?
      <View style={{ flexDirection: "row", alignItems: "center"  }}>
      {onPressThreeDots && <TouchableOpacity
        onPress={onPressThreeDots}
        style={[styles.leftIconCont, { marginRight: handleSize.w(8) }]}
      >
        <Icon
          name="ellipsis-vertical-outline"
          size={handleSize.f(17)}
          color={THEME.textPrimary}
        />
      </TouchableOpacity>}
   
        {(loginUserData?.customer_type == 'personal' || isFetching) ? 
        null 
        :
        <TouchableOpacity
          onPress={onPressSelectAccounts}
          style={styles.leftCont}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.leftSubCont} >{currentAccount?.name}</Text>
          <View style={{ marginLeft: handleSize.w(3), marginTop: handleSize.h(2) }} >
           <Icon
            name="chevron-down-outline"
            size={handleSize.f(17)}
            color={THEME.textPrimary}
            />
          </View>
        </TouchableOpacity>}

      </View> 
      :
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => navigation.goBack()}
          style={styles.arrowCont}
        >
          <Text style={styles.titleTop}>{leftTxt}</Text>
        </TouchableOpacity>
      </View>
      }
      
      {/* Right Icons */}
      <View style={{ flexDirection: "row" }}>
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

        <TouchableOpacity onPress={onPressAdd} style={styles.rightIconCont}>
          <Image
            source={Images.add}
            style={{ width: handleSize.w(11), height: handleSize.h(11) }}
            tintColor={THEME.textPrimary}
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
    fontSize: handleSize.f(FONT_SIZES.oneeight),
    color: THEME.white,
    marginLeft: handleSize.w(5),
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
  leftCont:
  { flexDirection: "row", marginRight: handleSize.w(5), backgroundColor: THEME.white, justifyContent: "center", alignItems: "center", borderRadius: handleSize.w(8), height: handleSize.h(30), paddingHorizontal: handleSize.w(10), width: handleSize.w(150)},
  leftSubCont:
  {width: handleSize.w(110), textAlign: "center", color: THEME.textPrimary, fontFamily: FONTFAMILY.SemiBold, fontSize: handleSize.f(FONT_SIZES.onetwo) }
});

export default OptionsHeader;