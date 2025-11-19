import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../config';

interface Props {
  rotate: any;
  titleLeft: string;
  iconRight: string;
  iconLeft: string;
  TL_radius?: number;
  TR_radius?: number;
  BL_radius?: number;
  BR_radius?: number;
  onPress?: () => void;
}


export const CardBox: React.FC<Props> = ({
  rotate,
  titleLeft,
  iconRight,
  iconLeft,
  TL_radius = 10,
  TR_radius = 10,
  BL_radius = 10,
  BR_radius = 10,
  onPress,
}) => {
  return (  
      <TouchableOpacity onPress={onPress}   >    
    <LinearGradient
        // colors={["#433c71ff", "#2c2d5e", "#272d5a"]}
        colors={[THEME.whitergba,THEME.whitergba,THEME.whitergba]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
        styles.boxContainer,
        {
          // backgroundColor: THEME.secondary,
          borderTopRightRadius: TR_radius,
          borderTopLeftRadius: TL_radius,
          borderBottomRightRadius: BR_radius,
          borderBottomLeftRadius: BL_radius,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: "center" }} >
      {iconLeft && 
      <View style={{ width: 36, height: 36,backgroundColor: THEME.primary, justifyContent: 'center', alignItems: "center", borderRadius: 8, marginRight: 10 }}>
        <Icon name={iconLeft} size={20} color={THEME.textPrimary} />
      </View>
      }

      <View>
        <View>
          <Text style={styles.boxTitleText}>{titleLeft}</Text>
        </View>
      </View>
      </View>

        <View>
          <Image style={{ width: 24, height: 24 }} source={Images.arrow} />
          {/* <Icon name={iconRight} size={24} color={THEME.primary} /> */}
        </View>

    </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8
  },
  boxTitleText: {
   fontFamily: FONTFAMILY.Medium,
   fontSize: FONT_SIZES.onefour,
   color: THEME.white,
  },
});

export default CardBox;
