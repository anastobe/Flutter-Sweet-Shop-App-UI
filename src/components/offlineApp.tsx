import React, { useEffect, useState } from 'react';
import { AppState, BackHandler, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import BluryModal from '../components/Modal/bluryModal';
import { handleSize } from '../config/responsiveTheme';
import Metrics from '../styles/metrics';
import { StyleSheet } from 'react-native';

const OfflineModal = () => {

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (!isOnline) {
      // Disable hardware back button
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => backHandler.remove();
    }
  }, [isOnline]);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = !!state.isConnected && !!state.isInternetReachable;
      setIsOnline(online);
    });

    return () => unsubscribe();
  }, [isOnline]);

  if(!isOnline){
    return (
        <View style={styles.container} >
        <BluryModal
        style={{ paddingHorizontal: handleSize.w(20) }}
        onClose={() => BackHandler.exitApp() }
        btnLoader={false}
        marginTopTitle={handleSize.h(25)}
        title={"No Internet Connection"}
        body={'Internet is required to perform this action. Please check your connection.'}
        iconName={""}
        confirmText={''}
        //   onConfirm={() => setOpen(false)}
        visible={true} // assuming your BluryModal supports visible/open prop
        />
        </View>
    );
  }
};

export default OfflineModal

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99999,
    width: Metrics.width,
    height: Metrics.height+ handleSize.h(100),
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: handleSize.f(19)
  },
});
