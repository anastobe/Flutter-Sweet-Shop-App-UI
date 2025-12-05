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
import apis from '../services';

type RootStackParamList = HomeStackParamList & AuthStackParamList;

// const Stack = createStackNavigator<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {

  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state?.AuthReducer?.userData);

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

  return (
    <Stack.Navigator
    screenOptions={{
      animation: "slide_from_bottom",
      headerShown: false
    }}>
      {
       userData?.token ? 
       HomeScreens 
       : 
       AuthScreens
      }
    </Stack.Navigator>
  );
};