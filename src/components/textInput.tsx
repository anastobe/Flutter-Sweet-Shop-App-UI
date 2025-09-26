import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

export default function InputField({...props}) {
  const {
    heading,
    placeholder,
    margTp,
    margBtm,
    maxlen,
    value,
    secureEntry,
    keyboardType,
    inputRef = () => {},
    onSubmitEditing = () => {},
    blurSubmit,
    onChangeText = () => {},
    image,
    onPress = () => {},
    disabled,
    autoCapital,
    selection,
    imagetintColor,
    imageLeft,
    customInpStyle,
    imagetintColorLeft,
    renderRightInput
  } = props || {};

  return (
    <View style={{marginTop: margTp, marginBottom: margBtm}}>
     {heading && <Text style={styles.text}>{heading}</Text>}
        {imageLeft && (
          <Pressable onPress={onPress} style={styles.imgViewLeft}>
              <Icon name={imageLeft} size={23} color={"#000"} />
          </Pressable>
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={THEME.white}
          returnKeyType={'next'}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureEntry}
          style={[styles.inputInner, customInpStyle]}
          ref={inputRef}
          maxLength={maxlen}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurSubmit}
          editable={disabled}
          autoCapitalize={autoCapital}
          selection={selection}
          
        />
        {image && (
          <Pressable onPress={onPress} style={styles.imgView}>
              <Icon name={image} size={23} color={imagetintColor} />
          </Pressable>
        )}
        {renderRightInput && (
          renderRightInput()
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginBottom: 8,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
    fontSize: FONT_SIZES.onesix
  },
  inputFieldView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
  },
  inputInner: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: 10,
    // width: METRICS.width - 45,
    color: THEME.primary,
    height: scale(55),
    paddingLeft: 20
  },
  imgView: {
    width: 50,
    height: scale(55),
    position: 'absolute',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgViewLeft: {
    width: 50,
    height: 45,
    position: 'absolute',
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },


   title:
  {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 10,
    marginTop:10
  },
});