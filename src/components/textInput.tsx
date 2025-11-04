// // Integrated InputField with optional dropdown
// // Toggle dropdown with renderRightInput or internal state

// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { FONTFAMILY, FONT_SIZES, THEME, METRICS } from '../styles';
// import { scale } from 'react-native-size-matters';

// export default function InputField({
//   heading,
//   removeTitle,
//   placeholder,
//   margTp,
//   margBtm,
//   maxlen,
//   value,
//   secureEntry,
//   keyboardType,
//   inputRef = () => {},
//   onSubmitEditing = () => {},
//   blurSubmit,
//   onChangeText = () => {},
//   dropdownData = [],
//   enableDropdown = false,
//   onDropdownSelect = () => {},
// }) {
//   const [isFocused, setIsFocused] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState('');

//   const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   const anim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(labelAnim, {
//       toValue: isFocused || value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isFocused, value]);

//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: open ? 1 : 0,
//       duration: 180,
//       useNativeDriver: false,
//     }).start();
//   }, [open]);

//   const animatedHeight = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 180],
//   });

//   const filtered = useMemo(() => {
//     if (query.trim() === '') return dropdownData;
//     return dropdownData.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));
//   }, [dropdownData, query]);

//   const handleSelect = item => {
//     setOpen(false);
//     setQuery('');
//     onDropdownSelect(item);
//   };

//   return (
//     <View style={{ marginTop: margTp, marginBottom: margBtm }}>
//       {heading && <Text style={styles.text}>{heading}</Text>}

//       <View style={{ position: 'relative' }}>
//         <Animated.Text
//            style={[
//              styles.floatingLabel,
//              {
//                top: labelAnim.interpolate({
//                  inputRange: [0, 1],
//                  outputRange: [18, 4],
//                }),
//                fontSize: labelAnim.interpolate({
//                  inputRange: [0, 1],
//                  outputRange: [16, 12],
//                }),
//                color: isFocused ? THEME.primary : THEME.white,
//              },
//            ]}  
//          >
//           {removeTitle && value?.length ? '' : placeholder}
//         </Animated.Text>

//         <Pressable onPress={() => enableDropdown && setOpen(!open)}>
//           <TextInput
//             value={value}
//             onChangeText={onChangeText}
//             secureTextEntry={secureEntry}
//             style={styles.inputInner}
//             ref={inputRef}
//             maxLength={maxlen}
//             onSubmitEditing={onSubmitEditing}
//             blurOnSubmit={blurSubmit}
//             keyboardType={keyboardType}
//             placeholderTextColor={THEME.white}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             editable={!enableDropdown}
//           />
//         </Pressable>

//         {enableDropdown && (
//           <Pressable style={styles.iconRight} onPress={() => setOpen(!open)}>
//             <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color={THEME.white} />
//           </Pressable>
//         )}

//         {enableDropdown && (
//           <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>            
//             <FlatList
//               data={filtered}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <Pressable onPress={() => handleSelect(item)} style={styles.row}>
//                   <Text style={styles.rowText}>{item.label}</Text>
//                 </Pressable>
//               )}
//             />
//           </Animated.View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     marginLeft: 10,
//     marginBottom: 8,
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.primary,
//     fontSize: FONT_SIZES.onesix,
//   },
//   inputInner: {
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onefour,
//     borderColor: THEME.white,
//     borderWidth: 1,
//     borderRadius: 14,
//     width: METRICS.width - 40,
//     color: THEME.primary,
//     height: scale(55),
//     paddingLeft: 20,
//     paddingTop: 15,
//     backgroundColor: 'transparent',
//   },
//   floatingLabel: {
//     position: 'absolute',
//     left: 20,
//     backgroundColor: 'transparent',
//     fontFamily: FONTFAMILY.Medium,
//   },
//   iconRight: {
//     position: 'absolute',
//     right: 10,
//     height: scale(55),
//     justifyContent: 'center',
//   },
//   dropdown: {
//     position: 'absolute',
//     top: scale(58),
//     left: 0,
//     right: 0,
//     backgroundColor: THEME.white,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     overflow: 'hidden',
//     zIndex: 999,
//   },
//   row: {
//     padding: 14,
//   },
//   rowText: {
//     fontSize: 15,
//     color: '#000',
//   },
// });



















import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated } from 'react-native';

export default function InputField({...props}) {
  const {
    heading,
    removeTitle,
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
    renderRightInput,
    dropdownData = [],
    enableDropdown = false,
    onDropdownSelect = () => {},
  } = props || {};

  
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [open]);

  const animatedHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  const filtered = useMemo(() => {
    if (query.trim() === '') return dropdownData;
    return dropdownData.filter((i: any) => i.label.toLowerCase().includes(query.toLowerCase()));
  }, [dropdownData, query]);

  const handleSelect =( item: any )=> {
    setOpen(false);
    setQuery('');
    onDropdownSelect(item);
  };

  return (
    <View style={{marginTop: margTp, marginBottom: margBtm}}>
     {heading && <Text style={styles.text}>{heading}</Text>}
        {imageLeft && (
          <Pressable onPress={onPress} style={styles.imgViewLeft}>
              <Icon name={imageLeft} size={23} color={imagetintColorLeft ? imagetintColorLeft : "#000"} />
          </Pressable>
        )}

        
       <View style={{ position: 'relative' }}>
         <Animated.Text
           style={[
             styles.floatingLabel,
             {
               top: labelAnim.interpolate({
                 inputRange: [0, 1],
                 outputRange: [18, 4],
               }),
               fontSize: labelAnim.interpolate({
                 inputRange: [0, 1],
                 outputRange: [16, 12],
               }),
               color: isFocused ? THEME.primary : THEME.white,
             },
           ]}  
         >
           {removeTitle && value?.length ? "" : placeholder}
         </Animated.Text>

        <TextInput
          // placeholder={placeholder}
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

{/* //drop down   */}
        {enableDropdown && (
          <Pressable style={styles.iconRightDropDown} onPress={() => setOpen(!open)}>
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color={THEME.white} />
          </Pressable>
        )}

{/* //drop down   */}
         {enableDropdown && (
           <Animated.View style={[styles.dropdown, { height: animatedHeight }, open && {borderWidth: 1, borderColor: '#ddd'} ]}>            
             <FlatList
               data={filtered}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                 <Pressable onPress={() => handleSelect(item)} style={styles.row}>
                   <Text style={styles.rowText}>{item.label}</Text>
                 </Pressable>
               )}
             />
           </Animated.View>
         )} 

    </View>
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
    height: scale(55),
    alignItems: 'center',
  },
  inputInner: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    borderColor: THEME.white,
    borderWidth: 1,
    borderRadius: 10,
    width: METRICS.width - 40,
    color: THEME.primary,
    height: scale(55),
    paddingLeft: 20,
    paddingTop: 15
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
    backgroundColor: "red",
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

  floatingLabel: {
  position: 'absolute',
  left: 20,
  backgroundColor: 'transparent',
  fontFamily: FONTFAMILY.Medium,
},


//new

   iconRightDropDown: {
     position: 'absolute',
    //  right: 10,
     height: scale(55),
     paddingRight: 20,
     justifyContent: 'center',
     alignItems: "flex-end",
    //  backgroundColor: "red",
     width: '100%'
     
   },

  dropdown: {
    position: 'absolute',
    top: scale(58),
    left: 0,
    right: 0,
    backgroundColor: THEME.darkSecondary,
    borderRadius: 14,

    overflow: 'hidden',
    zIndex: 999,
  },
  row: {
    height: scale(45),
    justifyContent: "center"
  },
  rowText: {
    fontSize: 15,
    color: THEME.white,
    // borderBottomColor: THEME.white,
    // borderBottomWidth: 1,
    paddingLeft: 10

  },

});

