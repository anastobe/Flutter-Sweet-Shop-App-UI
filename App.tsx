import * as React from "react";
import { ActivityIndicator, Alert, AppState, Linking, PermissionsAndroid, Platform, StatusBar, Text, View, useColorScheme } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Persistor, Store } from "./src/Redux/Store/Store";
import { NavigationService } from "./src/config";
import dataHandlerService from "./src/APICall/dataHandler.service";
import { PersistGate } from 'redux-persist/integration/react';
import { DarkTheme, LightTheme, ThemeColors } from './src/styles/index';
import { HOME_ROUTES } from "./src/constants";
import apis from "./src/services";
import { CommonUtils } from "./src/utils";
import { MainStack } from "./src/stacks/MainStack";

const App: React.FC = () => {


  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <NavigationContainer
          fallback={<ActivityIndicator
            color="blue" size="large" />}
          // ref={(ref: any) => NavigationService.setTopLevelNavigator(ref)} 
          >
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
};

export default App;

