import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';
import CustomButton from '../customButton';
import { CommonUtils } from '../../utils';



const BeneficiaryCopDetail = ({ sheetTitle,enteredaccountName,saveCopDetail,enteredaccountNum,enteredcurrency,btnLoading, onPressSave,onPressEdit  }) => {

const copStatus =
  saveCopDetail?.Matched === true
    ? "STRONG_MATCH" // allow to save 
    : saveCopDetail?.ReasonCode === "AC01"
    ? "UNMATCH" //not allow
    : saveCopDetail?.ReasonCode === "MBAM"
    ? "SLIGHT_MATCH"  //User decide to save or edit
    : "UNKNOWN";

    console.log("UNMATCH==>",saveCopDetail);
    

    function RenderReason(Iconname: any, iconColor: string, color: string, txt1: string, txt1Color: string, txt1sub: any, txt1subColor: any, txt2: string) {
      return(
        <View style={styles.descCont} >
          <View style={[styles.descContSub,{backgroundColor: color}]} >
            <Icon name={Iconname} size={handleSize.f(18)} color={iconColor} />
          </View>
            <Text style={[styles.matchtxt,{  color: txt1Color }]}>{txt1}</Text>
            {txt1sub &&
              <Text style={[styles.matchtxt,{  color: txt1subColor }]}>{txt1sub}</Text>}
            <Text style={styles.matchtxt2}>{txt2}</Text>
        </View>
      )
    }
  

  function changeTXt(key: string) {
    if (key == "STRONG_MATCH") {
      return "Strong match"
    }
    else if (key == "UNMATCH") {
      return "Unmatch"
    }
    else if (key == "SLIGHT_MATCH") {
      return "Slightly mismatch"
    }
    else if (key == "UNKNOWN") {
      return "Failted to fetch detail"
    }
  }


  return (
    <View>
      <ScrollView
        style={{ marginTop: handleSize.f(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.accountdetail}>{sheetTitle}</Text>
        {/* <Text style={[styles.accountdetailtxt,{ color: copStatus == "STRONG_MATCH" ? THEME.white : THEME.green }]}>{changeTXt(copStatus)}</Text> */}

        <View style={styles.botmCont}>
          <View style={styles.midLEFT}>
            <Text style={styles.circleName}>
              {CommonUtils.getInitials(enteredaccountName)}
            </Text>
          </View>
          <View style={styles.midRight}>
            <Text
              style={[
                styles.namesy1,
                {
                  color:
                    copStatus == 'UNMATCH'
                      ? THEME.greencolorCode
                      : THEME.white,
                },
              ]}
            >
              {enteredaccountName}
            </Text>
            <Text style={styles.namesy}>{enteredaccountNum}</Text>
            <Text style={styles.namesy}>{enteredcurrency}</Text>
          </View>
        </View>

        {copStatus == 'STRONG_MATCH' ? ( //allow to save without showing reason
          <View>
            {RenderReason(
              'checkmark-outline',
              THEME.white,
              THEME.greencolorCode,
              'Match',
              THEME.white,
              null,
              null,
              'The name and number match the payee record',
            )}
            <CustomButton
              btnContSty={styles.forgetTxt}
              title={'Save'}
              loading={btnLoading}
              onPress={onPressSave}
            />
          </View>
        ) : copStatus == 'SLIGHT_MATCH' ? ( //user decide to save or edit
          <View>
            {RenderReason(
              'warning-outline',
              THEME.greencolorCode,
              'yellow',
              'Slight Match',
              THEME.greencolorCode,
              `Did you mean "${saveCopDetail?.Name}" ?`,
              THEME.white,
              'Before Continuing? \n●  Check the name and account number with the person or business you are paying \n●  Make sure they have been entered correctly money may not be recoverable if you pay the wrong account',
            )}
            <CustomButton
              btnContSty={styles.forgetTxt}
              title={'Sure, Save beneficiary'}
              loading={btnLoading}
              onPress={onPressSave}
            />
          </View>
        ) : ( //not allow to save, 
          <View>
            {RenderReason(
              'alert-outline',
              THEME.white,
              THEME.medRed,
              'Not a match',
              THEME.white,
              null,
              null,
              'The name and number entered do not match the payee’s bank records. Before continuing: \n•  Check the name and account number with the person or business you are paying \n•  Make sure they have been entered correctly Money may not be recoverable if you pay the wrong account.',
            )}
          </View>
        )}

        {copStatus != 'STRONG_MATCH' && (
          <CustomButton
            btnContSty={styles.forgetTxt2}
            title={'Update Beneficiary Detail'}
            loading={false}
            onPress={onPressEdit}
          />
        )}
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
    flexDirection: 'row', marginHorizontal: handleSize.f(20), alignItems: "center", marginTop: handleSize.f(20), marginBottom: handleSize.f(10)
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
    textAlign: "center",
    marginTop: handleSize.f(5),
  },
  accountdetailtxt2:{
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.greencolorCode,
    textAlign: "center",
    marginTop: handleSize.f(5),
  },
  accountdetailtxtdesc: {
    fontSize: handleSize.f(FONT_SIZES.oneone),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.greencolorCode,
    textAlign: "center",
    marginTop: handleSize.f(2),
  },
  circleName: {
    fontSize: handleSize.f(FONT_SIZES.threesix),
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center",
    color: THEME.textPrimary
  },
  forgetTxt: {
    marginTop: handleSize.f(20),
    marginBottom: handleSize.f(0),
    marginHorizontal: handleSize.w(20),
  },
  forgetTxt2 :{
    marginTop: handleSize.f(20),
    marginBottom: handleSize.f(20),
    marginHorizontal: handleSize.w(20),
  },
  namesy1: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    fontFamily: FONTFAMILY.Bold
  },
  matchtxt:{
    fontSize: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginVertical: handleSize.f(5)
  },
  matchtxt2:{
    marginBottom: handleSize.f(8),
    fontSize: handleSize.f(FONT_SIZES.onefour),
    lineHeight: handleSize.f(FONT_SIZES.oneeight),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary
  },
  namesy: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  descCont:
  { marginHorizontal: handleSize.f(20) },
  descContSub:
  { width: handleSize.f(30), height: handleSize.f(30), borderRadius: 100, alignItems: "center", justifyContent: "center", marginTop: handleSize.f(10) },

});

export default BeneficiaryCopDetail;
