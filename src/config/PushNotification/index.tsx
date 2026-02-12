import { useDispatch, useSelector } from 'react-redux';
import {
  // setPendingTransaction,
  // markTransactionHandled,
  enqueueTransaction,
  dequeueTransaction,
} from '../../Redux/Action/Notification/notificationActions';
import { useEffect, useRef } from 'react';
import { useNotificationModal } from '../../components/notificationModalContext';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';
import { CommonUtils } from '../../utils';

// const EXPIRY_MS = 30 * 60 * 1000;s
const EXPIRY_MS = 30 * 60 * 1000;

export const PushNotificationHandler = () => {
  const dispatch = useDispatch();
  const { openModal } = useNotificationModal();

  const userlogdedIn = useSelector(
    (state: any) => state?.AuthReducer?.userlogdedIn,
  );

  const pendingTx = useSelector((state: any) => state?.pendingTransaction);

  const userLoggedInRef = useRef(userlogdedIn);

  // console.log('handler console=>', pendingTx?.queue[0]?.data);

  useEffect(() => {
    userLoggedInRef.current = userlogdedIn;
  }, [userlogdedIn]);

  const handleMessage = async (remoteMessage: any) => {
    const data = remoteMessage?.data;


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
      data: data, // 👈 attach FCM data here
      android: {
        channelId: 'default_high',
        importance: AndroidImportance.HIGH,
        priority: AndroidImportance.HIGH,
        sound: 'default',
        pressAction: { id: 'default' },
      },

      style: {
        type: AndroidStyle.BIGTEXT,
        text: Parsebody, // full description here
      },

    });

    // console.log("handleMessage==>",data);

    if (data?.is_modal === 'yes') {
        dispatch(enqueueTransaction(data));
      // dispatch(setPendingTransaction(data));
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
    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification?.notification?.data?.is_modal === 'yes') {
        dispatch(
  dispatch(enqueueTransaction(initialNotification?.notification?.data))
          // setPendingTransaction(initialNotification?.notification?.data),
        );
      }

      // if (initialNotification) {
      //   handleMessage(initialNotification.notification)
      //   console.log('App opened from QUIT state:', initialNotification.notification);
      // }
    });
  }, []);

  // 2. HANDLE FOREGROUND & MINIMIZED STATE
  useEffect(() => {
    // This listener handles taps when the app is OPEN or MINIMIZED

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      // console.log('Notifee background event=:??',detail.pressAction?.id);

      

      if (type === EventType.PRESS) {
        // console.log(
        //   'User pressed notification while app was in foreground/background',
        //   detail.notification?.data,
        // );
        // handleMessage(detail.notification)

        if (detail.notification?.data?.is_modal === 'yes') {
          dispatch(enqueueTransaction(detail.notification?.data))
          // dispatch(setPendingTransaction(detail.notification?.data));
        }
      }
    });
  }, []);

  //ACTIVE STATE MA UPER SE NOTIFICATION BAR KO SLIDE KR K NOTIFICATION MA CLIKCK KRA THE THIS WILL PLAY
  useEffect(() => {
  const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const data = detail.notification?.data;

      // console.log('🔔 Foreground notification tapped', data);

      if (data?.is_modal === 'yes') {
        dispatch(enqueueTransaction(data));
      }
    }
  });

  return unsubscribe;
}, []);


  useEffect(() => {
    if (pendingTx?.queue?.length){
      let current = pendingTx?.queue[0]
      
      // console.log("pendingTx?.queue??.data==>",current?.data);

      let backendTime = current?.data?.challenge_expiry_datetime
      const isValid = CommonUtils.isTimeRemaining(backendTime);

      // ❌ expiry cross ho chuki
      if (!isValid) {
        dispatch(dequeueTransaction());
        return;
      }

    // ✅ still valid
      if (userLoggedInRef.current) {
        openModal({
        transaction_amount: current?.data?.transaction_amount,
        transaction_currency_code: current?.data?.transaction_currency_code,
        transaction_pan: current?.data?.pan,
        card_acceptor_name: current?.data?.card_acceptor_name,
        sp_transaction_id: current?.data?.sp_transaction_id,
        challenge_expiry_datetime: current?.data?.challenge_expiry_datetime,
        });

        // dispatch(markTransactionHandled());
      }
    }
  }, [pendingTx?.queue, userlogdedIn]);

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
