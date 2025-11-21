import * as React from "react";
import { ActivityIndicator, Alert, AppState, BackHandler, Linking, PermissionsAndroid, Platform, StatusBar, Text, View, useColorScheme } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Persistor, Store } from "./src/Redux/Store/Store";
import dataHandlerService from "./src/APICall/dataHandler.service";
import { PersistGate } from 'redux-persist/integration/react';
import { HOME_ROUTES } from "./src/constants";
import apis from "./src/services";
import { CommonUtils } from "./src/utils";
import { MainStack } from "./src/stacks/MainStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {LoaderFullScreen, } from "./src/components/activityIndicator";
import { isRootDetected, isEmulator, isDebuggable } from 'react-native-root-detection';
import SplashScreen from "react-native-splash-screen";
// import { initIdleTimer, resetActivity } from "./src/security/IdleTimer";
// import { TouchableWithoutFeedback } from "react-native";

const App: React.FC = () => {

    const queryClient = new QueryClient();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);


  //     const handleLogout = () => {
  //   Alert.alert(
  //     "Session Expired",
  //     "You have been logged out due to 2 minutes of inactivity.",
  //     [{ text: "OK", onPress: () => {
  //       // TODO: logout logic
  //       // clear tokens
  //       // navigate to Login
  //     }}]
  //   );
  // };

  // React.useEffect(() => {
  //   initIdleTimer(handleLogout);
  // }, []);

 React.useEffect(() => {
    const check = () => {

      if (isRootDetected()) {
        Alert.alert(
          "Security Warning",
          "This device is rooted. App cannot run on rooted devices.",
          [
            { text: "Exit", onPress: () => BackHandler.exitApp() }
          ]
        );
      }

      if (isDebuggable()) {
        console.log("⚠ Debug build detected");
      }

      if (isEmulator()) {
        console.log("⚠ Emulator detected");
      }
    };

    check();
  }, []);

  const toastConfig = {
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#000",
          width: '80%',
          marginTop: Platform.OS === 'ios' ? 0 : 30,
        }}
        text1Style={{
          fontSize: 14,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "green",
          // borderLeftColor: 'lightgreen',
          width: '80%',
          borderLeftWidth: 6,
          marginTop: Platform.OS === 'ios' ? 0 : 30,
          // ...Metrix.createShadow,
        }}
        text1Style={{
          fontSize: 14,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#FF0000',
          // borderLeftColor: Utills.selectedThemeColors().ErrorTextColor,
          width: '80%',
          marginTop: Platform.OS === 'ios' ? 0 : 30,
        }}
        text1Style={{
          fontSize: 13,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  }; 
    dataHandlerService.setStore(Store);


  return (
    <QueryClientProvider client={queryClient} contextSharing={true} >
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        {/* <TouchableWithoutFeedback onPress={resetActivity}> */}
        <NavigationContainer
          fallback={<ActivityIndicator
            color="blue" size="large" />}
          // ref={(ref: any) => NavigationService.setTopLevelNavigator(ref)} 
          >
          <MainStack />
          <LoaderFullScreen />
          <Toast config={toastConfig} />
        </NavigationContainer>
        {/* </TouchableWithoutFeedback> */}
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  );
};

export default App;

