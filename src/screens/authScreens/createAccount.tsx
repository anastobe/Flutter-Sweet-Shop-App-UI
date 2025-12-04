// import React, { useState } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable } from 'react-native';
// // import CustomButton from '../../components/customButton';
// // import CustomTextField from '../../components/customTextField';
// // import Images from '../../config/images';
// // import { Auth_ROUTES } from '../../constants';
// // import { useNavigation } from '@react-navigation/native';
// import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
// // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { MainContainer } from '../../components';
// import { WebView } from 'react-native-webview';
// import { useNavigation } from '@react-navigation/native';
// // import InputField from '../../components/textInput';
// // import { scale } from 'react-native-size-matters';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import CookieManager from '@react-native-cookies/cookies';

// type CreateAccountProps = {};

// export const CreateAccount: React.FC<CreateAccountProps> = ({ ...props }) => {
  
//   const navigation = useNavigation()


//   const handleNavChange = async (navState: any) => {
//     console.log('➡️ URL changed:', navState);

//   };

//   return (
//     <MainContainer
//       showBackArrow
//       pressBackArrow={()=>navigation.goBack()}
//       isFlatList={false}
//       barStyle="dark-content"
//       mainContainerStyle={styles.container}
//     >
//      {/* <WebView  source={{ uri: 'https://www.fgconboarding.com/Identity/Account/Register' }} /> */}
// <WebView 
//   source={{ uri: 'https://www.fgconboarding.com/Identity/Account/Register' }}
//   javaScriptEnabled
//   onNavigationStateChange={handleNavChange}
//   style={{ flex: 1 }}
//   onMessage={(event) => {
//   try {
//     const apiData = JSON.parse(event.nativeEvent.data);
    
//     if (apiData?.url?.includes('/api/login')) {
//       const responseObj = JSON.parse(apiData?.response);
//       const token = responseObj?.results?.token;

//       if (token) {
//         console.log('✅ Login token:', token);

//         // Store token if needed, e.g., AsyncStorage
//         // await AsyncStorage.setItem('authToken', token);

//         // Go back or navigate to another screen
//         navigation.goBack();
//       }
//     }
//   } catch (err) {
//     console.log('❌ Error parsing WebView message:', err);
//   }
// }}

//   // onMessage={(event) => {
//   //   // console.log(event.nativeEvent.data);
//   //   const apiData = JSON?.parse(event?.nativeEvent?.data);
//   //   const responseObj = JSON?.parse(apiData?.response);
//   //   console.log("apiData==>",responseObj?.results?.token);
    
//   //   if (responseObj?.results?.token) {
//   //     navigation.goBack();
//   //   }
  
//   // }}
//   injectedJavaScript={`
//     (function() {
//       // Intercept fetch requests
//       const originalFetch = window.fetch;
//       window.fetch = async function(...args) {
//         const response = await originalFetch.apply(this, args);
//         try {
//           const clone = response.clone(); // clone so we don't consume original
//           const data = await clone.json();
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             url: args[0],
//             method: args[1]?.method || 'GET',
//             response: data
//           }));
//         } catch (err) {
//           // in case response is not JSON
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             url: args[0],
//             method: args[1]?.method || 'GET',
//             response: 'Non-JSON response'
//           }));
//         }
//         return response;
//       };

//       // Intercept XHR (optional, in case site uses it)
//       const originalXHROpen = XMLHttpRequest.prototype.open;
//       XMLHttpRequest.prototype.open = function(method, url) {
//         this.addEventListener('load', function() {
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             url,
//             method,
//             response: this.responseText
//           }));
//         });
//         return originalXHROpen.apply(this, arguments);
//       };
//     })();
//     true;
//   `}
// />


//     </MainContainer >
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: THEME.white
//   }



// });

// export default CreateAccount;



// import React, { useCallback } from 'react';
// import { Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import CookieManager from '@react-native-cookies/cookies';
// import { useNavigation } from '@react-navigation/native';
// import { MainContainer } from '../../components';
// import { THEME } from '../../styles';

// const LOGIN_URL = 'http://fp.avengers.pk/sign-in?redirectUrl=/';
// const HOST = 'http://fp.avengers.pk'; // use http or https consistent with site

// const CreateAccount: React.FC = () => {
//   const navigation = useNavigation();

//   /**
//    * Helper: parse token from URL query params
//    */
//   const getQueryParam = (url: string, key: string) => {
//     try {
//       const parts = url.split('?');
//       if (parts.length < 2) return null;
//       const params = new URLSearchParams(parts[1]);
//       return params.get(key);
//     } catch (e) {
//       return null;
//     }
//   };

//   /**
//    * Try to extract token from cookies object returned by CookieManager.
//    * Adjust this depending on what cookie name the backend sets.
//    */
//   const extractTokenFromCookies = (cookies: Record<string, any>) => {
//     // Example: if backend sets 'auth_token' cookie
//     if (!cookies) return null;
//     if (cookies.auth_token && cookies.auth_token.value) {
//       return cookies.auth_token.value;
//     }
//     // Common names: 'sessionid', 'connect.sid', 'token', 'jwt'
//     if (cookies.token && cookies.token.value) return cookies.token.value;
//     if (cookies.jwt && cookies.jwt.value) return cookies.jwt.value;
//     if (cookies.sessionid && cookies.sessionid.value) return cookies.sessionid.value;
//     // fallback: pick first cookie value (not ideal)
//     const keys = Object.keys(cookies);
//     if (keys.length > 0 && cookies[keys[0]].value) return cookies[keys[0]].value;
//     return null;
//   };

//   /**
//    * Called on every navigation change inside the WebView
//    */
//   const handleNavigationStateChange = useCallback(async (navState: any) => {
//     const { url } = navState;
//     console.log('➡️ WebView URL:', url);

//     // 1) If token is present in URL query params (some apps redirect with token)
//     const tokenFromUrl = getQueryParam(url, 'token') || getQueryParam(url, 'access_token');
//     if (tokenFromUrl) {
//       console.log('🔑 Token found in URL:', tokenFromUrl);
//       // Save token / navigate
//       // e.g. AsyncStorage.setItem('userToken', tokenFromUrl);
//       Alert.alert('Login success', `Token: ${tokenFromUrl}`);
//       navigation.replace('HomeScreen' as any); // change to your home screen
//       return;
//     }

//     // 2) If site redirects to a known success page (example '/'), treat as login success
//     //    Adjust the condition to match the site's post-login redirect path
//     if (url === 'http://fp.avengers.pk/' || url.endsWith('/dashboard') || url.endsWith('/profile')) {
//       console.log('🔁 Detected post-login redirect. Attempting to read cookies...');
//       try {
//         // read cookies for the host
//         const cookies = await CookieManager.get(HOST);
//         console.log('🍪 Cookies from host:', cookies);
//         const token = extractTokenFromCookies(cookies);
//         if (token) {
//           console.log('✅ Token extracted from cookie:', token);
//           // Save token, update state, navigate
//           // AsyncStorage.setItem('userToken', token);
//           Alert.alert('Login success', 'Token received via cookie (check console).');
//           navigation.replace('HomeScreen' as any);
//           return;
//         } else {
//           console.log('⚠️ No token cookie found; cookies:', cookies);
//           // If no token, you might call a backend endpoint passing cookies (server-side) to get user info
//           // Or simply mark as logged-in and ask your backend to validate session with the cookie
//           Alert.alert('Login success', 'No token cookie found, but login redirect detected.');
//           navigation.replace('HomeScreen' as any);
//         }
//       } catch (err) {
//         console.warn('Cookie read error:', err);
//       }
//     }
//   }, [navigation]);

//   return (
//     <MainContainer
//       showBackArrow
//       pressBackArrow={() => (navigation as any).goBack()}
//       isFlatList={false}
//       barStyle="dark-content"
//       mainContainerStyle={{ flex: 1, backgroundColor: THEME.white }}
//     >
//       <WebView
//         source={{ uri: LOGIN_URL }}
//         style={{ flex: 1 }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         startInLoadingState={true}
//         mixedContentMode="always" // allows http content if needed (Android)
//         onNavigationStateChange={handleNavigationStateChange}
//         // optional: show loading indicator etc.
//       />
//     </MainContainer>
//   );
// };

// export default CreateAccount;



//3
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable } from 'react-native';
import CustomButton from '../../components/customButton';
import CustomTextField from '../../components/customTextField';
import Images from '../../config/images';
import { Auth_ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles'; // Assuming you have this structure
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MainContainer } from '../../components';
import InputField from '../../components/textInput';
import { scale } from 'react-native-size-matters';
import StatusBarManager from '../../components/statusBarManager';

type CreateAccountProps = {};

export const CreateAccount: React.FC<CreateAccountProps> = ({ ...props }) => {

  const navigation = useNavigation();

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [businessEmail, setbusinessEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    
  return (
    <MainContainer isFlatList={true} barStyle="dark-content" customeStyle={{ paddingHorizontal: 20 }} mainContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
      <StatusBarManager 
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <Text style={styles.title}>Create Account</Text>
      
        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
          <InputField
            customInpStyle={{ width: METRICS.width /2 - 25 }}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="First Name"
            value={firstName}
            onChangeText={setfirstName}
          />
          <InputField
            customInpStyle={{ width: METRICS.width /2 - 25 }}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setlastName}
          />
        </View>

        <InputField
            margTp={20}
            marginTp={20}
            autoCapital={'none'}
            blurOnSubmit={false}
            placeholder="Business / Personal Email Address"
            value={firstName}
            onChangeText={setfirstName}
        />


          <InputField
            margTp={20}
            image={secure ? "eye-off-outline" : "eye-outline" }
            autoCapital={'none'}
            blurOnSubmit={false}
            secureEntry={secure}
            placeholder="Password"
            value={password}
            onPress={()=>{ setSecure(!secure) }}
            onChangeText={setpassword}
            imagetintColor={THEME.gray}
            maxlen={30}
          />

        <InputField
            margTp={20}
            image={secure ? "eye-outline" : "eye-outline" }
            // imagetintColor={THEME.primary}
            autoCapital={'none'}
            secureEntry={secure2}
            blurOnSubmit={false}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onPress={()=>{ setSecure2(!secure2) }}
            onChangeText={setconfirmPassword}
            imagetintColor={THEME.gray}
            maxlen={30}
        />

      <CustomButton
        btnContSty={styles.forgetTxt}
        title="Create Account"
        onPress={() => {
          console.log("Login pressed");
        }}
      />


      <View style={styles.contText} >
          <Text style={styles.dontAcc}>Already have an account?</Text>
          <Pressable onPress={()=>{ navigation.goBack() }} >
            <Text style={styles.creatAC}> Sign in</Text>
          </Pressable>
      </View>

    </MainContainer >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white
  },
  logo: {
   width: METRICS.width,
    height: 56,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 45
  },
  forgetTxt:
  { marginTop: 20, marginBottom: 20 },
  title: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threesix,
    marginBottom: scale(30),
    marginTop: METRICS.height / 5 - 20,
    textAlign: "center"
  },
  errorCont:
  {backgroundColor: THEME.lightPink, flexDirection: "row", height: scale(83), alignItems: "center", borderRadius: 10, marginBottom: 20 },
  iconCont:
  { backgroundColor: THEME.medRed, width: scale(48), height: scale(48), borderRadius: 100, justifyContent: "center", alignItems: "center", marginHorizontal: 10 },
  credTxt:{
    color: THEME.medRed,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  credTxtsub:{
    color: THEME.primary,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    marginRight: 80,
  },
  forgotText: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 40
  },
  contText:
  { flexDirection: "row", justifyContent: "center", paddingBottom: 50 },
  dontAcc: {
    color: THEME.primary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  },
  creatAC:{
    color: THEME.prinkishBlue,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
  }
});

export default CreateAccount;
