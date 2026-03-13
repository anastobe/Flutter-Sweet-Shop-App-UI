import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';
import CustomButton from '../customButton';
import { CommonUtils } from '../../utils';

const BeneficiaryCopDetail = ({ sheetTitle,enteredaccountName,saveCopDetail,enteredaccountNum,enteredcurrency,btnLoading, onPressSave,onPressEdit  }) => {

  console.log("sab ara ha same==>",saveCopDetail);
  
  return (
    <View>
      <ScrollView
        style={{ marginTop: handleSize.f(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.accountdetail}>{sheetTitle}</Text>
        {saveCopDetail?.Matched && saveCopDetail?.Name == null && saveCopDetail?.ReasonCode == null && saveCopDetail?.ReasonDescription == null ?
        <Text style={styles.accountdetailtxt}>Strong Match</Text>
        :
        <View>
          <Text style={styles.accountdetailtxt2}>Slightly Mismatched</Text>
          <Text style={styles.accountdetailtxtdesc}>{saveCopDetail?.ReasonDescription}</Text>
        </View>
        }

        <View style={styles.botmCont} >
            <View style={styles.midLEFT} >
                <Text style={styles.circleName}>{CommonUtils.getInitials(saveCopDetail?.Name ? saveCopDetail?.Name : enteredaccountName)}</Text>
            </View>
            <View style={styles.midRight} >
                <Text style={styles.namesy}>{saveCopDetail?.Name ? saveCopDetail?.Name : enteredaccountName}</Text>
                <Text style={styles.namesy}>{enteredaccountNum}</Text>
                <Text style={styles.namesy}>{enteredcurrency}</Text>
            </View>
        </View>

        <CustomButton
            btnContSty={styles.forgetTxt}
            title={saveCopDetail?.Matched == false ? "Sure, Save beneficiary" : "Save"}
            loading={btnLoading}
            onPress={onPressSave}
        />

        <CustomButton
            btnContSty={styles.forgetTxt2}
            title={ "Update Beneficiary Detail"}
            loading={false}
            onPress={onPressEdit}
        />


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

  botmCont:{
    flexDirection: 'row', marginHorizontal: handleSize.f(20), alignItems: "center", marginTop: handleSize.f(20)
  },
  midLEFT:
  {width: handleSize.f(75),height: handleSize.f(75), backgroundColor: THEME.primary, borderRadius:100, justifyContent: "center", alignItems: "center" },
  midRight:
  { marginLeft: handleSize.f(10), marginRight: handleSize.f(80) },

  accountdetail: {
    fontSize: handleSize.f(FONT_SIZES.twosix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    textAlign: "center"
  },
  accountdetailtxt:{
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: "center",
    marginTop: handleSize.f(5),
  },
  accountdetailtxt2:{
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.green,
    textAlign: "center",
    marginTop: handleSize.f(5),
  },
  accountdetailtxtdesc: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.green,
    textAlign: "center",
    marginTop: handleSize.f(2),
  },
  circleName: {
    fontSize: handleSize.f(FONT_SIZES.threesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
    textAlign: "center",
  },
  forgetTxt: {
    marginTop: handleSize.f(30),
    marginBottom: handleSize.f(20),
    marginHorizontal: handleSize.w(20),
  },
  forgetTxt2 :{
    marginTop: handleSize.f(0),
    marginBottom: handleSize.f(20),
    marginHorizontal: handleSize.w(20),
  },
  namesy: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
});

export default BeneficiaryCopDetail;
