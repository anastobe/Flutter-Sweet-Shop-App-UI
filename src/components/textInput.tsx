import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../config';
import { handleSize } from '../config/responsiveTheme';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
 
export default function InputField(props: any) {
  const {
    heading,
    imgViewLeft,
    autoFocused,
    removeTitle,
    textInputStyle,
    placeholder,
    margTp = 0,
    margBtm = 0,
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
    isOpen,
    onToggleDropdown,
    multiline
  } = props || {};

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  useEffect(() => {
    if (autoFocused) setIsFocused(autoFocused);
  }, [autoFocused]);

  const adjustHeight =
    dropdownData?.length < 4 ? dropdownData?.length * handleSize.h(45) : handleSize.h(180);

  const animatedHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, adjustHeight],
  });

  const filtered = useMemo(() => {
    if (!query.trim()) return dropdownData;
    return dropdownData.filter((i: any) =>
      (i.label || i.name || i.iso_code || `${i.format} (.... .... .... ${i.pan})`)
        ?.toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [dropdownData, query]);

  const handleSelect = (item: any) => {
    setQuery('');
    onDropdownSelect(item);
    onToggleDropdown(false);
  };

return (
  <View style={{ marginTop: handleSize.h(margTp), marginBottom: handleSize.h(margBtm) }}>
    {heading && <Text style={styles.text}>{heading}</Text>}

    {imageLeft && (
      <Pressable onPress={onPress} style={imgViewLeft}>
        <Icon
          name={imageLeft}
          size={handleSize.f(20)}
          color={imagetintColorLeft || '#000'}
        />
      </Pressable>
    )}

      <View style={[styles.inputContainer,customInpStyle]} >
              {removeTitle ? null : (isFocused || value?.length) ? 
              <Animated.Text
                style={[
                  styles.floatingLabel,
                  { left: imageLeft ? handleSize.w(40) : handleSize.w(20) },
                  {
                    top: labelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [handleSize.h(16.5), (isFocused || value?.length) ? handleSize.h(8) : handleSize.h(4)],
                    }),
                    fontSize: labelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [handleSize.f(16), handleSize.f(12)],
                    }),
                    color: THEME.white,
                  },
                ]}
              >
                {placeholder}
              </Animated.Text>
              : null}

      {/* Input */}
      <TextInput
        placeholderTextColor={THEME.white}
        placeholder={removeTitle ? placeholder : (isFocused ? "" : placeholder)}
        returnKeyType={'next'}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureEntry}
        style={[textInputStyle ? textInputStyle : styles.inputInner, removeTitle ? null : { top: (isFocused || value?.length) ? handleSize.h(8) : 0 } ]}
        ref={inputRef} 
        maxLength={maxlen}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurSubmit}
        editable={disabled}
        autoCapitalize={autoCapital} 
        selection={selection}
        multiline={multiline}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Right Icon */}
      {image && (
        <Pressable onPress={onPress} style={styles.imgView}>
          <Icon name={image} size={handleSize.f(20)} color={imagetintColor} />
        </Pressable>
      )}

      {renderRightInput && renderRightInput()}

      {/* Dropdown icon */}
      {enableDropdown && (
        <Pressable
          style={styles.iconRightDropDown}
          onPress={() => onToggleDropdown()}
        >
          <Image
            source={Images.dropDown}
            style={{ width: handleSize.w(26), height: handleSize.h(26) }}
            tintColor={THEME.white}
          />
        </Pressable>
      )}
    </View>
    {/* Dropdown List */}
    {enableDropdown && (
      <Animated.View
        style={[
          styles.dropdown,
          { height: animatedHeight, maxHeight: handleSize.h(180) },
          isOpen && { borderWidth: 1, borderColor: '#ddd' },
        ]}
      >
        <FlatList
          data={filtered}
          nestedScrollEnabled
          bounces={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
                <Pressable
                  onPress={() =>[ handleSelect(item),setIsFocused(true)]}
                  style={[styles.row,{ borderBottomWidth: filtered?.length - 1 == index  ? 0 : 0.2 }]}
                >
              <Text style={styles.rowText}>
                {item.label || item?.currency?.name || item.name || item.iso_code || `${item.format} (.... .... .... ${item.pan})`}
              </Text>
            </Pressable>
          )}
        />
      </Animated.View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  text: {
    marginLeft: handleSize.w(10),
    marginBottom: handleSize.h(8),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.onesix),
  },

  inputInner: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    width: METRICS.width - handleSize.w(40),
    color: THEME.white,
    height: handleSize.h(56),
    paddingLeft: handleSize.w(20),
  },

  inputContainer: {
    borderColor: THEME.white,
    borderWidth: handleSize.h(1),
    borderRadius: handleSize.h(10),
  },

  floatingLabel: {
    position: 'absolute',
    backgroundColor: 'transparent',
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
  },

  imgView: {
    width: handleSize.w(50),
    height: handleSize.h(56),
    position: 'absolute',
    right: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconRightDropDown: {
    position: 'absolute',
    height: handleSize.h(56),
    paddingRight: handleSize.w(12),
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },

  dropdown: {
    position: 'absolute',
    top: handleSize.h(58),
    left: 0,
    right: 0,
    backgroundColor: THEME.darkSecondary,
    borderRadius: handleSize.h(14),
    overflow: 'hidden',
    zIndex: 999,
  },

  row: {
    height: handleSize.h(45),
    justifyContent: 'center',
    borderBottomColor: THEME.dividerCol,
    marginHorizontal: handleSize.w(10),
  },

  rowText: {
    fontSize: handleSize.f(FONT_SIZES.onefive),
    marginLeft: handleSize.w(10),
    color: THEME.white,
  },
});


//2 time
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   Image,
// } from 'react-native';
// import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
// import { scale } from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Animated } from 'react-native';
// import { Images } from '../config';

// export default function InputField(props: any) {
//   const {
//     heading,
//     removeTitle,
//     placeholder,
//     margTp,
//     margBtm,
//     maxlen,
//     value,
//     secureEntry,
//     keyboardType,
//     inputRef = () => {},
//     onSubmitEditing = () => {},
//     blurSubmit,
//     onChangeText = () => {},
//     image,
//     onPress = () => {},
//     disabled,
//     autoCapital,
//     selection,
//     imagetintColor,
//     imageLeft,
//     customInpStyle,
//     imagetintColorLeft,
//     renderRightInput,
//     dropdownData = [],
//     enableDropdown = false,
//     onDropdownSelect = () => {},
//     isOpen,
//     onToggleDropdown,
//     multiline
//   } = props || {};

//   const [isFocused, setIsFocused] = useState(false);
//   const [query, setQuery] = useState('');

//   const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   const anim = useRef(new Animated.Value(0)).current;

//   /** Floating label animation */
//   useEffect(() => {
//     Animated.timing(labelAnim, {
//       toValue: isFocused || value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isFocused, ]);

//   /** Dropdown opening animation */
//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: isOpen ? 1 : 0,
//       duration: 180,
//       useNativeDriver: false,
//     }).start();
//   }, [isOpen]);

//   let adjustHeight = dropdownData?.length < 4 ? dropdownData?.length * scale(45) : 180 

//   const animatedHeight = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, adjustHeight], 
//   });

//   const filtered = useMemo(() => {
//     if (!query.trim()) return dropdownData;
//     return dropdownData.filter((i: any) =>
//       (i.label || i.name || i.iso_code || `${i.format} (.... .... .... ${i.pan})`)
//         ?.toLowerCase()
//         .includes(query.toLowerCase())
//     );
//   }, [dropdownData, query]);

//   /** SELECT ITEM → Close dropdown */
//   const handleSelect = (item: any) => {
//     setQuery('');
//     onDropdownSelect(item);
//     onToggleDropdown(false); // ✅ close dropdown after selecting item
//   };

//   return (
//     <View style={{ marginTop: margTp, marginBottom: margBtm }}>
//       {heading && <Text style={styles.text}>{heading}</Text>}

//       {imageLeft && (
//         <Pressable onPress={onPress} style={styles.imgViewLeft}>
//           <Icon
//             name={imageLeft}
//             size={20}
//             color={imagetintColorLeft || '#000'}
//           />
//         </Pressable>
//       )}

//       <View>
//         {/* Floating Label */}
//         <Animated.Text
//           style={[
//             styles.floatingLabel,{ left: imageLeft ? 40 : 20 }, //40 calculated value due to left icon
//             {
//               top: labelAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [17,  (isFocused || value?.length) ? 8 : 4],
//               }),
//               fontSize: labelAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [16, 12],
//               }),
//               color: THEME.white,
//               // backgroundColor: "red"
//             },
//           ]}
//         >
//           {removeTitle && value?.length ? '' : placeholder}
//         </Animated.Text>

//         {/* Input */}
//         <TextInput
//           placeholderTextColor={THEME.white}
//           // placeholder={placeholder}
//           returnKeyType={'next'}
//           value={value}
//           keyboardType={keyboardType}
//           onChangeText={onChangeText}
//           secureTextEntry={secureEntry}
//           style={[styles.inputInner, { paddingTop: (isFocused || value?.length) ? 22 : 0 } , customInpStyle]}
//           ref={inputRef} 
//           maxLength={maxlen}
//           onSubmitEditing={onSubmitEditing}
//           blurOnSubmit={blurSubmit}
//           editable={disabled}
//           autoCapitalize={autoCapital} 
//           selection={selection}
//           multiline={multiline}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />

//         {/* Right Icon */}
//         {image && (
//           <Pressable onPress={onPress} style={styles.imgView}>
//             <Icon name={image} size={20} color={imagetintColor} />
//           </Pressable>
//         )}

//         {renderRightInput && renderRightInput()}

//         {/* Dropdown icon */}
//         {enableDropdown && (
//           <Pressable
//             style={styles.iconRightDropDown}
//             onPress={() => onToggleDropdown()}
//           >
//             <Image
//               source={Images.dropDown}
//               style={{ width: 26, height: 26 }}
//               tintColor={THEME.white}
//             />
//           </Pressable>
//         )}

//         {/* Dropdown List */}
//         {enableDropdown && (
//           <Animated.View
//             style={[
//               styles.dropdown,
//               { height: animatedHeight, maxHeight: 180 },
//               isOpen && { borderWidth: 1, borderColor: '#ddd' },
//             ]}
//           >
//             <FlatList
//               data={filtered}
//               nestedScrollEnabled
//               bounces={false}
//               keyExtractor={(_, index) => index.toString()}
//               renderItem={({ item, index }) => (
//                 <Pressable
//                   onPress={() =>[ handleSelect(item),setIsFocused(true)]}
//                   style={[styles.row,{ borderBottomWidth: filtered?.length - 1 == index  ? 0 : 0.2 }]}
//                 >
//                   <Text style={styles.rowText}>
//                     {item.label || item?.currency?.name || item.name || item.iso_code || `${item.format} (.... .... .... ${item.pan})`}
//                   </Text>
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
//     color: THEME.white,
//     fontSize: FONT_SIZES.onesix,
//   },

//   inputInner: {
//     fontFamily: FONTFAMILY.Regular,
//     fontSize: FONT_SIZES.onefour,
//     // lineHeight: 16,
//     borderColor: THEME.white,
//     borderWidth: 1,
//     borderRadius: 10,
//     width: METRICS.width - 40,
//     color: THEME.white,
//     height: 56,
//     paddingLeft: 20,
//     // backgroundColor: "red"
//     // paddingTop: 15,
//   },

//   floatingLabel: {
//     position: 'absolute',
//     backgroundColor: 'transparent',
//     fontFamily: FONTFAMILY.Regular,
//     fontSize: FONT_SIZES.onefour,

//   },

//   imgView: {
//     width: 50,
//     height: 56,
//     position: 'absolute',
//     right: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   imgViewLeft: {
//     width: 35,
//     height: 56,
//     position: 'absolute',
//     left: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//     zIndex: 9999,
//   },

//   iconRightDropDown: {
//     position: 'absolute',
//     height: 56,
//     paddingRight: 12,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     width: '100%',
//   },

//   dropdown: {
//     position: 'absolute',
//     top: scale(58),
//     left: 0,
//     right: 0,
//     backgroundColor: THEME.darkSecondary,
//     borderRadius: 14,
//     overflow: 'hidden',
//     zIndex: 999,
//   },

//   row: {
//     height: scale(45),
//     justifyContent: 'center',
//     // paddingLeft: 10,
//     // backgroundColor: "red",
//     borderBottomColor: THEME.dividerCol,
//     marginHorizontal: 10
//   },

//   rowText: {
//     fontSize: 15,
//     marginLeft: 10,
//     color: THEME.white,
//   },
// });





// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   FlatList,
//   Image,
// } from 'react-native';
// import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
// import { scale } from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Animated } from 'react-native';
// import { Images } from '../config';

// export default function InputField(props: any) {
//   const {
//     heading,
//     removeTitle,
//     placeholder,
//     margTp,
//     margBtm,
//     maxlen,
//     value,
//     secureEntry,
//     keyboardType,
//     inputRef = () => {},
//     onSubmitEditing = () => {},
//     blurSubmit,
//     onChangeText = () => {},
//     image,
//     onPress = () => {},
//     disabled,
//     autoCapital,
//     selection,
//     imagetintColor,
//     imageLeft,
//     customInpStyle,
//     imagetintColorLeft,
//     renderRightInput,
//     dropdownData = [],
//     enableDropdown = false,
//     onDropdownSelect = () => {},
//     isOpen,
//     onToggleDropdown,
//     multiline
//   } = props || {};

//   const [isFocused, setIsFocused] = useState(false);
//   const [query, setQuery] = useState('');

//   const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   const anim = useRef(new Animated.Value(0)).current;

//   /** Floating label animation */
//   useEffect(() => {
//     Animated.timing(labelAnim, {
//       toValue: isFocused || value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isFocused, ]);

//   /** Dropdown opening animation */
//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: isOpen ? 1 : 0,
//       duration: 180,
//       useNativeDriver: false,
//     }).start();
//   }, [isOpen]);

//   let adjustHeight = dropdownData?.length < 4 ? dropdownData?.length * scale(45) : 180 

//   const animatedHeight = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, adjustHeight], 
//   });

//   const filtered = useMemo(() => {
//     if (!query.trim()) return dropdownData;
//     return dropdownData.filter((i: any) =>
//       (i.label || i.name || i.iso_code || `${i.format} (.... .... .... ${i.pan})`)
//         ?.toLowerCase()
//         .includes(query.toLowerCase())
//     );
//   }, [dropdownData, query]);

//   /** SELECT ITEM → Close dropdown */
//   const handleSelect = (item: any) => {
//     setQuery('');
//     onDropdownSelect(item);
//     onToggleDropdown(false); // ✅ close dropdown after selecting item
//   };

//   return (
//     <View style={{ marginTop: margTp, marginBottom: margBtm }}>
//       {heading && <Text style={styles.text}>{heading}</Text>}

//       {imageLeft && (
//         <Pressable onPress={onPress} style={styles.imgViewLeft}>
//           <Icon
//             name={imageLeft}
//             size={20}
//             color={imagetintColorLeft || '#000'}
//           />
//         </Pressable>
//       )}

//       <View>
//         {/* Floating Label */}
//         <Animated.Text
//           style={[
//             styles.floatingLabel,{ left: imageLeft ? 40 : 20 }, //40 calculated value due to left icon
//             {
//               top: labelAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [17,  (isFocused || value?.length) ? 8 : 4],
//               }),
//               fontSize: labelAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [16, 12],
//               }),
//               color: THEME.white,
//               // backgroundColor: "red"
//             },
//           ]}
//         >
//           {removeTitle && value?.length ? '' : placeholder}
//         </Animated.Text>

//         {/* Input */}
//         <TextInput
//           placeholderTextColor={THEME.white}
//           // placeholder={placeholder}
//           returnKeyType={'next'}
//           value={value}
//           keyboardType={keyboardType}
//           onChangeText={onChangeText}
//           secureTextEntry={secureEntry}
//           style={[styles.inputInner, { paddingTop: (isFocused || value?.length) ? 22 : 0 } , customInpStyle]}
//           ref={inputRef} 
//           maxLength={maxlen}
//           onSubmitEditing={onSubmitEditing}
//           blurOnSubmit={blurSubmit}
//           editable={disabled}
//           autoCapitalize={autoCapital} 
//           selection={selection}
//           multiline={multiline}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />

//         {/* Right Icon */}
//         {image && (
//           <Pressable onPress={onPress} style={styles.imgView}>
//             <Icon name={image} size={20} color={imagetintColor} />
//           </Pressable>
//         )}

//         {renderRightInput && renderRightInput()}

//         {/* Dropdown icon */}
//         {enableDropdown && (
//           <Pressable
//             style={styles.iconRightDropDown}
//             onPress={() => onToggleDropdown()}
//           >
//             <Image
//               source={Images.dropDown}
//               style={{ width: 26, height: 26 }}
//               tintColor={THEME.white}
//             />
//           </Pressable>
//         )}

//         {/* Dropdown List */}
//         {enableDropdown && (
//           <Animated.View
//             style={[
//               styles.dropdown,
//               { height: animatedHeight, maxHeight: 180 },
//               isOpen && { borderWidth: 1, borderColor: '#ddd' },
//             ]}
//           >
//             <FlatList
//               data={filtered}
//               nestedScrollEnabled
//               bounces={false}
//               keyExtractor={(_, index) => index.toString()}
//               renderItem={({ item, index }) => (
//                 <Pressable
//                   onPress={() =>[ handleSelect(item),setIsFocused(true)]}
//                   style={[styles.row,{ borderBottomWidth: filtered?.length - 1 == index  ? 0 : 0.2 }]}
//                 >
//                   <Text style={styles.rowText}>
//                     {item.label || item?.currency?.name || item.name || item.iso_code || `${item.format} (.... .... .... ${item.pan})`}
//                   </Text>
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
//     color: THEME.white,
//     fontSize: FONT_SIZES.onesix,
//   },

//   inputInner: {
//     fontFamily: FONTFAMILY.Regular,
//     fontSize: FONT_SIZES.onefour,
//     // lineHeight: 16,
//     borderColor: THEME.white,
//     borderWidth: 1,
//     borderRadius: 10,
//     width: METRICS.width - 40,
//     color: THEME.white,
//     height: 56,
//     paddingLeft: 20,
//     // backgroundColor: "red"
//     // paddingTop: 15,
//   },

//   floatingLabel: {
//     position: 'absolute',
//     backgroundColor: 'transparent',
//     fontFamily: FONTFAMILY.Regular,
//     fontSize: FONT_SIZES.onefour,

//   },

//   imgView: {
//     width: 50,
//     height: 56,
//     position: 'absolute',
//     right: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   imgViewLeft: {
//     width: 35,
//     height: 56,
//     position: 'absolute',
//     left: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//     zIndex: 9999,
//   },

//   iconRightDropDown: {
//     position: 'absolute',
//     height: 56,
//     paddingRight: 12,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     width: '100%',
//   },

//   dropdown: {
//     position: 'absolute',
//     top: scale(58),
//     left: 0,
//     right: 0,
//     backgroundColor: THEME.darkSecondary,
//     borderRadius: 14,
//     overflow: 'hidden',
//     zIndex: 999,
//   },

//   row: {
//     height: scale(45),
//     justifyContent: 'center',
//     // paddingLeft: 10,
//     // backgroundColor: "red",
//     borderBottomColor: THEME.dividerCol,
//     marginHorizontal: 10
//   },

//   rowText: {
//     fontSize: 15,
//     marginLeft: 10,
//     color: THEME.white,
//   },
// });




// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   Pressable,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
// import { scale } from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Animated } from 'react-native';

// export default function InputField({...props}) {
//   const {
//     heading,
//     removeTitle,
//     placeholder,
//     margTp,
//     margBtm,
//     maxlen,
//     value,
//     secureEntry,
//     keyboardType,
//     inputRef = () => {},
//     onSubmitEditing = () => {},
//     blurSubmit,
//     onChangeText = () => {},
//     image,
//     onPress = () => {},
//     disabled,
//     autoCapital,
//     selection,
//     imagetintColor,
//     imageLeft,
//     customInpStyle,
//     imagetintColorLeft,
//     renderRightInput,
//     dropdownData = [],
//     enableDropdown = false,
//     onDropdownSelect = () => {},
//   } = props || {};

  
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
//     return dropdownData.filter((i: any) => i.label.toLowerCase().includes(query.toLowerCase()));
//   }, [dropdownData, query]);

//   const handleSelect =( item: any )=> {
//     setOpen(false);
//     setQuery('');
//     onDropdownSelect(item);
//   };

//   return (
//     <View style={{marginTop: margTp, marginBottom: margBtm}}>
//      {heading && <Text style={styles.text}>{heading}</Text>}
//         {imageLeft && (
//           <Pressable onPress={onPress} style={styles.imgViewLeft}>
//               <Icon name={imageLeft} size={23} color={imagetintColorLeft ? imagetintColorLeft : "#000"} />
//           </Pressable>
//         )}

        
//        <View style={{ position: 'relative' }}>
//          <Animated.Text
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
//                color: isFocused ? THEME.white : THEME.white,
//              },
//            ]}  
//          >
//            {removeTitle && value?.length ? "" : placeholder}
//          </Animated.Text>

//         <TextInput
//           // placeholder={placeholder}
//           placeholderTextColor={THEME.white}
//           returnKeyType={'next'}
//           value={value}
//           keyboardType={keyboardType}
//           onChangeText={onChangeText}
//           secureTextEntry={secureEntry}
//           style={[styles.inputInner, customInpStyle]}
//           ref={inputRef}
//           maxLength={maxlen}
//           onSubmitEditing={onSubmitEditing}
//           blurOnSubmit={blurSubmit}
//           editable={disabled}
//           autoCapitalize={autoCapital}
//           selection={selection}
          
//         />
//         {image && (
//           <Pressable onPress={onPress} style={styles.imgView}>
//               <Icon name={image} size={23} color={imagetintColor} />
//           </Pressable>
//         )}
//         {renderRightInput && (
//           renderRightInput()
//         )}

// {/* //drop down   */}
//         {enableDropdown && (
//           <Pressable style={styles.iconRightDropDown} onPress={() => setOpen(!open)}>
//             <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color={THEME.white} />
//           </Pressable>
//         )}

// {/* //drop down   */}
//          {enableDropdown && (
//            <Animated.View style={[styles.dropdown, { height: animatedHeight }, open && {borderWidth: 1, borderColor: '#ddd'} ]}>            
//              <FlatList
//                data={filtered}
//                keyExtractor={(item, index) => index.toString()}
//                renderItem={({ item }) => (
//                  <Pressable onPress={() => handleSelect(item)} style={styles.row}>
//                    <Text style={styles.rowText}>{item.label}</Text>
//                  </Pressable>
//                )}
//              />
//            </Animated.View>
//          )} 

//     </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     marginLeft: 10,
//     marginBottom: 8,
//     fontFamily: FONTFAMILY.Medium,
//     color: THEME.white,
//     fontSize: FONT_SIZES.onesix
//   },
//   inputFieldView: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderRadius: 14,
//     height: 56,
//     alignItems: 'center',
//   },
//   inputInner: {
//     fontFamily: FONTFAMILY.Medium,
//     fontSize: FONT_SIZES.onefour,
//     borderColor: THEME.white,
//     borderWidth: 1,
//     borderRadius: 10,
//     width: METRICS.width - 40,
//     color: THEME.white,
//     height: 56,
//     paddingLeft: 20,
//     paddingTop: 15
//   },
//   imgView: {
//     width: 50,
//     height: 56,
//     position: 'absolute',
//     right: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imgViewLeft: {
//     width: 50,
//     height: 45,
//     position: 'absolute',
//     left: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: "red",
//     zIndex: 9999
//   },


//    title:
//   {
//     fontSize: FONT_SIZES.onefour,
//     fontFamily: FONTFAMILY.SemiBold,
//     color: THEME.white,
//     marginBottom: 10,
//     marginTop:10
//   },

//   floatingLabel: {
//   position: 'absolute',
//   left: 20,
//   backgroundColor: 'transparent',
//   fontFamily: FONTFAMILY.Medium,
// },


// //new

//    iconRightDropDown: {
//      position: 'absolute',
//     //  right: 10,
//      height: 56,
//      paddingRight: 20,
//      justifyContent: 'center',
//      alignItems: "flex-end",
//     //  backgroundColor: "red",
//      width: '100%'
     
//    },

//   dropdown: {
//     position: 'absolute',
//     top: scale(58),
//     left: 0,
//     right: 0,
//     backgroundColor: THEME.darkSecondary,
//     borderRadius: 14,

//     overflow: 'hidden',
//     zIndex: 999,
//   },
//   row: {
//     height: scale(45),
//     justifyContent: "center"
//   },
//   rowText: {
//     fontSize: 15,
//     color: THEME.white,
//     // borderBottomColor: THEME.white,
//     // borderBottomWidth: 1,
//     paddingLeft: 10

//   },

// });



