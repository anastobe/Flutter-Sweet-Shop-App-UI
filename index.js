/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);


// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';

// notifee.onBackgroundEvent(async ({ type, detail }) => {
// //   console.log('Notifee background event:', type, detail);
// });

// // 🔥 BACKGROUND & QUIT STATE HANDLER
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('BACKGROUND / QUIT:', remoteMessage);

//   await notifee.createChannel({
//     id: 'default',
//     name: 'General',
//     importance: AndroidImportance.HIGH,
//   });
// await notifee.displayNotification({
//   title: remoteMessage.data?.title,
//   body: remoteMessage.data?.body,
//   android: {
//     channelId: 'default',
//     importance: AndroidImportance.HIGH,
//     priority: AndroidImportance.HIGH,
//     sound: 'default',
//     pressAction: { id: 'default' },
//   },
// });

// });

// AppRegistry.registerComponent(appName, () => App);
