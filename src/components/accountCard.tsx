import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';
import { CommonUtils } from '../utils';

const AccountCard = ({
  item,
  index,
  onPressCard,
  containerStyle,
}: {
  item?: any;
  index?: any;
  onPressCard?: any;
  containerStyle?: any;
}) => {

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPressCard(item);
      }}
      style={[
        {
          width: METRICS.width,
          height: handleSize.h(164),
          borderRadius: handleSize.f(15),
        },
        containerStyle,
      ]}
    >
      <ImageBackground
        resizeMode="stretch"
        source={item.card_status == "freeze" ? Images.freezeView : Images.cardBack}
        imageStyle={{ borderRadius: handleSize.f(15) }}
        style={{ flex: 1, marginHorizontal: handleSize.w(25) }}
      >
        <View style={{ flexDirection: 'row', paddingHorizontal: handleSize.w(10), marginTop: handleSize.h(10) }}>
          <View>
            <View style={{ width: handleSize.w(40) }} />
            {/* Optional Logo */}
            {/* <Image source={Images.frontPayLogo} style={{ width: handleSize.w(34), height: handleSize.h(37) }} resizeMode='contain' /> */}
          </View>
          <View>
            <Text style={styles.cardTitle}>
              {CommonUtils.capitalizeFirstLetter(item.format)} (*** **** **** {item?.pan})
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            position: 'absolute',
            bottom: handleSize.h(18),
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingHorizontal: handleSize.w(12),
          }}
        >
          <View>
            <Text style={styles.limitTxtUp}>({CommonUtils.capitalizeFirstLetter(item.card_status)})</Text>
            <Text style={styles.limitTxt}>{item?.spending_type} available limit:</Text>
            <Text style={styles.balanceTxt}>£{item?.available_limit}</Text>
          </View>
          {/* Optional Show Details */}
          {/* <View>
            <Text style={styles.detailTxt}>Show Details</Text>
          </View> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  cardTitle: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Medium,
    marginLeft: handleSize.w(10),
    marginTop: handleSize.h(5),
  },
  limitTxtUp: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.oneZero),
    fontFamily: FONTFAMILY.SemiBold,
  },
  limitTxt: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.nine),
    fontFamily: FONTFAMILY.SemiBold,
  },
  balanceTxt: {
    color: THEME.textPrimary,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    fontFamily: FONTFAMILY.SemiBold,
  },
  detailTxt: {
    color: THEME.prinkishBlue,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    fontFamily: FONTFAMILY.Bold,
    marginBottom: handleSize.h(10),
  },
});
