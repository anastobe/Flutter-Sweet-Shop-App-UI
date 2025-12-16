import notifee, {
  AndroidColor,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import React, {useDebugValue, useEffect,  } from 'react';
import {AppState, Platform} from 'react-native';
// import {Images, NavigationService} from '../../config';
import {HOME_ROUTES} from '../../constants';
import { useDispatch } from 'react-redux';
// import { HandleLoader } from '../../Redux/Action/Auth/AuthActions';
import apis from '../../services';
import { useNotificationModal } from '../../components/notificationModalContext';
// import navigationService from '../navigationService';

type PushNotificationProps = {};

export const PushNotificationHandler: React.FC<PushNotificationProps> = () => {
  
  const dispatch = useDispatch()
 const { openModal } = useNotificationModal();

  useEffect(() => {
    // Handle foreground notifications
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Foreground message:', remoteMessage.data);
        showNotification(remoteMessage.notification,remoteMessage);
      },
    );

    // Handle background/quit state notifications
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('App opened from background/quit state:', JSON.stringify(remoteMessage));
        handleNotificationInteraction(remoteMessage);
      },
    );

    // Check if the app was opened by a notification from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', JSON.stringify(remoteMessage));
          handleNotificationInteraction(remoteMessage);
        }
      });

    // Handle background event clicks
    const unsubscribeOnBackground = notifee.onBackgroundEvent(
      async ({type, detail}) => {
        if (type === EventType.ACTION_PRESS) {
          console.log('Background notification click:', JSON.stringify(detail));
          handleNotificationInteraction(detail.notification);
        }
      },
    );

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      // unsubscribeOnBackground();
    };
  }, []);

  //Function to display notification
  const showNotification = async (notification: any, all: any) => {
    const channelId = await notifee.createChannel({
      id: 'frontier-pay',
      name: 'FrontierPay',
      description: 'A channel to categorize your notifications',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.NAVY,
    });


    const {data} = all;

    const myNotification = {
      title: notification?.title || 'Alert',
      body: notification?.body || 'Notification',
      data: data,
      sound: 'default',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        sound: 'default',
        pressAction: {
          id: 'default',
        }
        // color: '#000',
      },
      ios: {
        sound: 'default',
        badge: true,
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    };

    console.log("Check==>",all);
    

    if (data?.is_modal === 'yes') {
      openModal({
        transaction_amount: data?.transaction_amount,
        transaction_currency_code:
          data?.transaction_currency_code,
        transaction_channel: data?.transaction_channel,
      });
    }

    await notifee.displayNotification(myNotification);
  };

  // Function to handle notification interaction
  const handleNotificationInteraction = (notification: any) => {

    console.log("after touch notification",notification);
    

    // onNotificationPress(notification)
  };

//   async function onNotificationPress(data: any) {

//   try {
//     dispatch(HandleLoader(true))  
//     let formatedData = data?.data
  
//     if (formatedData?.reason === "like_post") {
//       let res = await apis.getPostDetail(formatedData?.postId)
//       if (res?.status) {
//         NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: false, postObjectData: res?.data, objectId: formatedData?.postId  })
//         dispatch(HandleLoader(false))
//       }      
//     } 
//     else if (formatedData?.reason === "comment_post") {
//       let res = await apis.getPostDetail(formatedData?.postId)  
//       if (res?.status) {    
//         NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: true, postObjectData: res?.data, objectId: formatedData?.postId  })
//         dispatch(HandleLoader(false))
//       }
//     }
//     else if (formatedData?.reason === "shared_post") {
//       let res = await apis.getPostDetail(formatedData?.postId)
//       if (res?.status) {    
//         NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: false, postObjectData: res?.data, objectId: formatedData?.postId  })
//         dispatch(HandleLoader(false))
//       }
//     }
//     else if (formatedData?.reason === "post_create") {
//       let res = await apis.getPostDetail(formatedData?.postId)
//       if (res?.status) { 
//         NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: false, postObjectData: res?.data, objectId: formatedData?.postId  })
//         dispatch(HandleLoader(false))
//       }
//     } 
//     else if (formatedData?.reason === "event_invite") {
//       navigationService.navigate(HOME_ROUTES.EventsDetail,{ eventId: formatedData?.eventId, categoryName: 'no'})
//       dispatch(HandleLoader(false))
//     } 
//     else if (formatedData?.reason === "event_create") { //check
//       navigationService.navigate(HOME_ROUTES.EventsDetail,{ eventId: formatedData?.eventId, categoryName: 'no'})
//       dispatch(HandleLoader(false))
//     } 
//     else if (formatedData?.reason === "event_reminder") { //check
//       navigationService.navigate(HOME_ROUTES.EventsDetail,{ eventId: formatedData?.eventId, categoryName: 'no'})
//       dispatch(HandleLoader(false))
//     } 
//     else if (formatedData?.reason === "event_edit") { //check
//       navigationService.navigate(HOME_ROUTES.EventsDetail,{ eventId: formatedData?.eventId, categoryName: 'no'})
//       dispatch(HandleLoader(false))
//     } 
//     else if (formatedData?.reason === "friend_request" || formatedData?.reason == "accept_friend_request") {
//       NavigationService.navigate(HOME_ROUTES.OtherProfile, {
//         userDetail: {
//           image: Images.UserImg,
//           name: "",
//           id: formatedData?.recieverId,
//         },
//       }); 
//       setTimeout(() => {
//         dispatch(HandleLoader(false))
//       }, 500);
//     }
//     else if (formatedData?.reason === "new_individual_chat_message") { //check
//       navigationService.navigate(HOME_ROUTES.Message)
//       dispatch(HandleLoader(false))
//     } 
//     else if (formatedData?.reason === "new_group_chat_message") { //check
//       navigationService.navigate(HOME_ROUTES.Message)
//       dispatch(HandleLoader(false))
//     } 
//     else{
//       dispatch(HandleLoader(false))
//     } 
//   } catch (error) {
//     dispatch(HandleLoader(false))
//   } finally {
//     dispatch(HandleLoader(false))
//   }

//   }

}



 
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
