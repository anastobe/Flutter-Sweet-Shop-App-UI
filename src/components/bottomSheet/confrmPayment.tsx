// ConfrmPayment.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../styles';
import { Images } from '../../config';
import CustomButton from '../customButton';
import { handleSize } from '../../config/responsiveTheme';
import { Image } from 'react-native';

type Props = {
  fromAccount:Object,
  toAccount:Object,
  Amount:string,
  refrence: any;
  title: string;
  subtitle?: string;
  style?: any;
  onPress: () => void;
  img?: any;
  convertrate: any;
  loading?: Boolean;
  loadingBtn?: Boolean;
};

// ---------- Reusable ----------
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLeft}>
      <Image tintColor={THEME.primary} source={icon} style={styles.infoIcon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);


const ConfrmPayment: React.FC<Props> = ({ 
    fromAccount,
    toAccount,
    Amount,
    refrence, 
    title, 
    subtitle, 
    style, 
    onPress, 
    img, 
    convertrate,
    loading,
    loadingBtn 
}) => {
  return (
    <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={style}>
      <ScrollView style={{ marginTop: handleSize.h(10) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>


        <View style={styles.summaryBox}>
            <InfoRow icon={Images.cardTab} label="From Account" value={fromAccount?.iso_code} />
            <InfoRow icon={Images.cardTab} label="To Account" value={toAccount?.iso_code} />
            <InfoRow icon={Images.sendMoney} label="Amount" value={Amount} />
            <InfoRow icon={Images.add} label="Conversion Fee" value={loading? "...loading" :convertrate.conversion_Fee} />
            <InfoRow icon={Images.add} label="Total After Fee" value={loading? "...loading" :convertrate.total_After_Fee} />
            <InfoRow icon={Images.exchangeRate} label="Exchange Rate (Live)" value={loading? "...loading" :convertrate.Exchange_Rate_Live} />
        </View>

        {loading ? null : <CustomButton
          btnContSty={styles.forgetTxt}
          loading={loadingBtn}
          title={subtitle}
          onPress={onPress}
        />}
      </ScrollView>
    </ImageBackground>
  );
};

export default ConfrmPayment; 

const styles = StyleSheet.create({
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.threezero),
    textAlign: "center",
    lineHeight: handleSize.h(35),
    marginTop: handleSize.h(30),
  },
  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textAlign: "center",
    marginTop: handleSize.h(5),
  },
  titlesubbelow: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textAlign: "center",
    marginTop: handleSize.h(20),
  },
  forgetTxt: {
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
    width: '100%',
  },


  
  
//   // INFO ROW
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: handleSize.h(9),
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    marginRight: handleSize.w(8),
    width: handleSize.w(15),
    height: handleSize.h(15),
  },

  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },

  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  summaryBox: {
    borderRadius: handleSize.f(10),
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(20),
  },


});
