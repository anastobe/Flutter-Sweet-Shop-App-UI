import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Metrics from '../styles/metrics';
import { ActivityIndicator } from 'react-native';
import { THEME } from '../styles';
import { handleSize } from '../config/responsiveTheme';

const LoaderFullScreen = () => {
    const loader = useSelector((state: any) => state?.AuthReducer?.loader);

    useEffect(() => {
      if (loader) {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => true // block back press
        );

        return () => backHandler.remove();
      }
    }, [loader]);

    if (loader) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={THEME.white} />
            </View>
        );
    }

    return null;
};

const LoaderOnly = () => {
        return(
        <View>
            <ActivityIndicator size="large" color={THEME.white}  />
        </View>
      )
};

const LoaderCompleteScreenOnly = () => {
        return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color={THEME.white} />
        </View>
      )
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99999,
    width: Metrics.width,
    height: Metrics.height+ handleSize.h(100),
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
});

export {LoaderFullScreen,LoaderOnly,LoaderCompleteScreenOnly };