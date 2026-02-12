import * as React from "react";
import { ActivityIndicator, Alert, AppState, BackHandler, Linking, PermissionsAndroid, Platform, StatusBar, Text, View, useColorScheme } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from "./src/Redux/Store/Store";
import dataHandlerService from "./src/APICall/dataHandler.service";
// import { PersistGate } from 'redux-persist/integration/react';
import { HOME_ROUTES } from "./src/constants";
import apis from "./src/services";
import { CommonUtils } from "./src/utils";
import { MainStack } from "./src/stacks/MainStack";
import { PushNotificationHandler } from "./src/config/PushNotification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {LoaderFullScreen, } from "./src/components/activityIndicator";
import { isRootDetected, isEmulator, isDebuggable } from 'react-native-root-detection';
import SplashScreen from "react-native-splash-screen";
import { NotificationModalProvider } from "./src/components/notificationModalContext";
import TransactionAlertModal from "./src/components/Modal/transactionAlertModal";
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import OfflineModal from "./src/components/offlineApp";
import { InteractionProvider } from "./src/security/IdleTimer";
// import { LogBox } from "react-native";
// import { initIdleTimer, resetActivity } from "./src/security/IdleTimer";
// import { TouchableWithoutFeedback } from "react-native";

// LogBox.ignoreAllLogs(); 

// if (!__DEV__) {
//   console.log = () => {};
//   console.warn = () => {};
//   console.info = () => {};
// }

const App: React.FC = () => {                           

  const queryClient = new QueryClient();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  

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
        // console.log("⚠ Debug build detected");
      }

      if (isEmulator()) {
        // console.log("⚠ Emulator detected");
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

  // notifee.onForegroundEvent(({ type, detail }) => {
  //   console.log("play");
    
  //   if (type === EventType.PRESS) {
  //     console.log('User pressed notification while app was in foreground/background', detail.notification);
  //     // Navigate to a specific screen here
  //   }

  // });

  // 1. HANDLE QUIT STATE (Already working for you)
  // React.useEffect(() => {
  //   notifee.getInitialNotification().then((initialNotification) => {
              
  //     setTimeout(() => {
        
  //       console.log("play=>getInitialNotification",initialNotification);
  //     }, 5000);

  //     if (initialNotification) {
  //       console.log('App opened from QUIT state:', initialNotification.notification);
  //       // Handle navigation logic here
  //     }
  //   });
  // }, []);

  // 2. HANDLE FOREGROUND & MINIMIZED STATE
  // React.useEffect(() => {
  //   // This listener handles taps when the app is OPEN or MINIMIZED

  //   notifee.onBackgroundEvent(async ({ type, detail }) => {
  //     console.log('Notifee background event=:', type, detail);
  //   });

  // }, []);

  // React.useEffect(() => {
  //   // Check if the app was opened via a notification press
  //   notifee.getInitialNotification().then((initialNotification) => {

  //     if (initialNotification) {
  //       console.log('App opened from quit state via notification:', initialNotification.notification);
  //       // Handle logic, e.g., navigate to a specific post or chat
  //     }
  //   });
  // }, []);


    {/* <PersistGate loading={null} persistor={Persistor}> remove due to security reason */} 
      {/* <TouchableWithoutFeedback onPress={resetActivity}> */}

  return (
    // <InteractionProvider>
    <QueryClientProvider client={queryClient} contextSharing={true} >
      <Provider store={Store}>
        <NotificationModalProvider>
          <NavigationContainer
            fallback={<ActivityIndicator
              color="blue" size="large" />}
            // ref={(ref: any) => NavigationService.setTopLevelNavigator(ref)} 
            >
            <MainStack />
            <LoaderFullScreen />
            <OfflineModal />           
            <PushNotificationHandler />
            <TransactionAlertModal />
          </NavigationContainer>
        </NotificationModalProvider>
            <Toast config={toastConfig} />
      </Provider>
    </QueryClientProvider>
    // </InteractionProvider>
  );
};

export default App;

