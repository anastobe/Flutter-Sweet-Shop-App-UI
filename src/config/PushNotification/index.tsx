import { useDispatch, useSelector } from 'react-redux';
import {
  setPendingTransaction,
  markTransactionHandled,
} from '../../Redux/Action/Notification/notificationActions';
import { useEffect, useRef } from 'react';
import { useNotificationModal } from '../../components/notificationModalContext';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance,EventType } from '@notifee/react-native';

// const EXPIRY_MS = 30 * 60 * 1000;s
const EXPIRY_MS = 30 * 60 * 1000;

export const PushNotificationHandler = () => {

  const dispatch = useDispatch();
  const { openModal } = useNotificationModal();

  const userlogdedIn = useSelector(
    (state: any) => state?.AuthReducer?.userlogdedIn
  );

  const pendingTx = useSelector(
    (state: any) => state?.pendingTransaction
  );

  const userLoggedInRef = useRef(userlogdedIn);

  useEffect(() => {
    userLoggedInRef.current = userlogdedIn;
  }, [userlogdedIn]);

  const handleMessage = async (remoteMessage: any) => {
    const data = remoteMessage?.data;

    console.log("handler console=>",remoteMessage);

    const parsed = JSON.parse(data?.notification);
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
      data: data,   // 👈 attach FCM data here
      android: {
        channelId: 'default_high',
        importance: AndroidImportance.HIGH,
        priority: AndroidImportance.HIGH,
        sound: 'default',
        pressAction: { id: 'default' },
      },
    });
    

    if (data?.is_modal === 'yes') {
      dispatch(setPendingTransaction(data));
    }
  };

  // 🔔 receive notification
  useEffect(() => {

    const unsub1 = messaging().onMessage(handleMessage);
    // const unsub2 = messaging().onNotificationOpenedApp(handleMessage);

    // messaging().getInitialNotification().then(msg => {
    //   if (msg) handleMessage(msg);
    // });

    return () => {
      unsub1();
      // unsub2();
    };
  }, []);

    useEffect(() => {
    notifee.getInitialNotification().then((initialNotification) => {
              
      if (initialNotification) {
        handleMessage(initialNotification.notification)
        console.log('App opened from QUIT state:', initialNotification.notification);
      }
    });
  }, []);

  
  // 2. HANDLE FOREGROUND & MINIMIZED STATE
  useEffect(() => {
    // This listener handles taps when the app is OPEN or MINIMIZED

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log('Notifee background event=:??', type, detail);
  
      if (type === EventType.PRESS) {
        console.log('User pressed notification while app was in foreground/background', detail.notification);
            handleMessage(detail.notification)
      }

    });

  }, []);

  // 🎯 decide when to show modal
  useEffect(() => {
    if (!pendingTx?.data || pendingTx.handled) return;

    const now = Date.now();

    if (now - pendingTx.receivedAt > EXPIRY_MS) {
      dispatch(markTransactionHandled());
      return;
    }

    if (userLoggedInRef.current) {
      openModal({
        transaction_amount: pendingTx.data.transaction_amount,
        transaction_currency_code: pendingTx.data.transaction_currency_code,
        transaction_pan: pendingTx.data.pan,
        card_acceptor_name: pendingTx.data.card_acceptor_name,
        sp_transaction_id: pendingTx.data.sp_transaction_id,
      });

      dispatch(markTransactionHandled());
    }
  }, [pendingTx, userlogdedIn]);

  return null;
};


 
//gpt new notifee way
// import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import { useEffect } from 'react';
// import { useNotificationModal } from '../../components/notificationModalContext';

// export const PushNotificationHandler = () => {
//   const { openModal } = useNotificationModal();

//   useEffect(() => {
//     // 🔔 Create channel once
//     notifee.createChannel({
//       id: 'default',
//       name: 'General',
//       description: 'Transaction & Alerts',
//       // importance: AndroidImportance.HIGH,
//       sound: 'default',
//       vibration: true,
//       vibrationPattern: [300, 500],
//       lights: true,
//       lightColor: AndroidColor.NAVY,
//     });

//     // 🔥 FOREGROUND HANDLER
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('FOREGROUND:', remoteMessage);

//       await notifee.displayNotification({
//         title: remoteMessage.data?.title,
//         body: remoteMessage.data?.body,
//         android: {
//           channelId: 'default',
//           importance: AndroidImportance.HIGH,
//           priority: AndroidImportance.HIGH,
//           sound: 'default',
//           pressAction: { id: 'default' },
//         },
//       });

//       // 🟢 Modal ONLY in foreground
//       // if (remoteMessage.data?.is_modal === 'yes') {
//       //   openModal({
//       //     transaction_amount: remoteMessage.data?.transaction_amount,
//       //     transaction_currency_code:
//       //       remoteMessage.data?.transaction_currency_code,
//       //     transaction_channel: remoteMessage.data?.transaction_channel,
//       //   });
//       // }
//     });

//     return unsubscribe;
//   }, []);

//   return null;
// };




//new using push notifiaction library 
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
// import { useEffect } from 'react';
// import { useNotificationModal } from '../../components/notificationModalContext';

// export const PushNotificationHandler = () => {
//   const { openModal } = useNotificationModal();

//   useEffect(() => {
//     // 🔔 Create channel (Android)
//     PushNotification.createChannel(
//       {
//         channelId: 'default',
//         channelName: 'General',
//         channelDescription: 'General notifications',
//         importance: 4, // HIGH
//         vibrate: true,
//         vibration: 500,
//         soundName: 'default',
//       },
//       created => console.log('Channel created:', created),
//     );

//     // 🔥 FOREGROUND Firebase handler
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('FOREGROUND:', remoteMessage);

//       PushNotification.localNotification({
//         channelId: 'default',
//         title: remoteMessage.data?.title || 'Transaction Authentication',
//         message:
//           remoteMessage.data?.body ||
//           'You Have a Pending Transaction Confirmation',

//         playSound: true,
//         soundName: 'default',
//         importance: 'high',
//         priority: 'high',
//         vibrate: true,
//         vibration: 500,
//         visibility: 'public',
//       });

//       // 🟢 optional modal
//       // if (remoteMessage.data?.is_modal === 'yes') {
//       //   openModal({
//       //     transaction_amount: remoteMessage.data?.transaction_amount,
//       //     transaction_currency_code:
//       //       remoteMessage.data?.transaction_currency_code,
//       //     transaction_channel: remoteMessage.data?.transaction_channel,
//       //   });
//       // }
//     });

//     return unsubscribe;
//   }, []);

//   return null;
// };
