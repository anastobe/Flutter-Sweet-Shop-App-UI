import React, { useEffect, useRef, useState } from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStack, HomeStackParamList } from './HomeStack';
import { AuthStack, AuthStackParamList } from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AppState, Easing, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Auth_ROUTES, HOME_ROUTES } from '../constants';
import { CommonUtils, Toast } from '../utils';
import { Images } from '../config';
import { CoperateStack } from './CoperateStack';
import { LOGIN_USER_TYPES } from '../utils/data';

type RootStackParamList = HomeStackParamList & AuthStackParamList;

// const Stack = createStackNavigator<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {

  const dispatch = useDispatch()
  const save_user_type = useSelector((state: any) => state?.AuthReducer?.save_user_type);
  // const userlogdedIn = useSelector((state: any) => state?.AuthReducer?.userlogdedIn);
  // console.log("REDUX=>",userData);
  

  const AuthScreens = AuthStack?.map(stack => (
    <Stack.Screen
      key={stack?.name}
      name={stack?.name}
      component={stack?.component}
      options={{
        gestureEnabled:
          stack.name == Auth_ROUTES.LOGIN ?
            false :
            true
      }}
    />
  ));
  
  const HomeScreens = HomeStack?.map((stack: any) => (
    <Stack.Screen
      key={stack?.name}
      name={stack?.name}
      component={stack?.component}
      options={{
        gestureEnabled: true
      }}
      />
  ));

    const CoperateScreens = CoperateStack?.map((stack: any) => (
    <Stack.Screen
      key={stack?.name}
      name={stack?.name}
      component={stack?.component}
      options={{
        gestureEnabled: true
      }}
      />
  ));

  console.log("save_user_type==",save_user_type?.length ,LOGIN_USER_TYPES.corporate_maker || LOGIN_USER_TYPES.individual ? "true" : "false");
  

  return (
    <Stack.Navigator
    screenOptions={{
      animation: "slide_from_bottom",
      headerShown: false
    }}>
      {
      save_user_type === LOGIN_USER_TYPES.corporate_maker ||
      save_user_type === LOGIN_USER_TYPES.individual
      ?
        HomeScreens   //this route is for user/individual and coorporate - maker
      :
        save_user_type == LOGIN_USER_TYPES.corporate_checker
      ? 
       CoperateScreens  //this route is for coorporate - checker
      : 
       AuthScreens
      }
    </Stack.Navigator>
  );
};