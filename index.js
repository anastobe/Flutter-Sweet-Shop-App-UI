// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   console.log('Notifee background event:', type, detail);
// });

// 🔥 BACKGROUND & QUIT STATE HANDLER
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('BACKGROUND / QUIT:', remoteMessage);

  const parsed = JSON.parse(remoteMessage?.data?.notification);
  let Parsetitle = parsed.title;
  let Parsebody = parsed.body;

await notifee.createChannel({
  id: 'default_high',
  name: 'General High',
  importance: AndroidImportance.HIGH,
  sound: 'default',
  vibration: true,
});

await notifee.displayNotification({
  title: Parsetitle,
  body: Parsebody,
  data: remoteMessage?.data,   // 👈 attach FCM data here
  android: {
    channelId: 'default_high',
    importance: AndroidImportance.HIGH,
    priority: AndroidImportance.HIGH,
    sound: 'default',
    pressAction: { id: 'default' },
  },
});

});

AppRegistry.registerComponent(appName, () => App);
