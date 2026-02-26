import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../styles';
import { handleSize } from '../../config/responsiveTheme';
import CustomButton from '../customButton';
import { CommonUtils } from '../../utils';

const BeneficiaryCopDetail = ({ sheetTitle,sheetStaus,accountNum,currency,circleNamext,btnLoading, onPressSave  }) => {

  return (
    <View>
      <ScrollView
        style={{ marginTop: handleSize.f(10) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.accountdetail}>{sheetTitle}</Text>
        <Text style={styles.accountdetailtxt}>{sheetStaus}</Text>

        <View style={styles.botmCont} >
            <View style={styles.midLEFT} >
                <Text style={styles.circleName}>{CommonUtils.getInitials(circleNamext)}</Text>
            </View>
            <View style={styles.midRight} >
                <Text style={styles.namesy}>{circleNamext}</Text>
                <Text style={styles.namesy}>{accountNum}</Text>
                <Text style={styles.namesy}>{currency}</Text>
            </View>
        </View>

        <CustomButton
            btnContSty={styles.forgetTxt}
            title="Save"
            loading={btnLoading}
            onPress={onPressSave}
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
  circleName: {
    fontSize: handleSize.f(FONT_SIZES.threesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.textPrimary,
    textAlign: "center",
  },
  forgetTxt: {
    marginTop: handleSize.f(30),
    marginBottom: handleSize.h(20),
    marginHorizontal: handleSize.w(20),
  },
  namesy: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
});

export default BeneficiaryCopDetail;
