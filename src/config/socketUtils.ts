// import io from 'socket.io-client';
// import { BASE_URL } from '../APICall/constants';
// import dataHandlerService from '../APICall/dataHandler.service';
// import { chatsMsg, joinGroupRoomMsg, joinRoomMsg } from '../Redux/Action/Home/HomeActions';

// export const SocketTypes = {
//   CHAT_JOIN: 'join_room',
//   SEND_MESSAGE: 'send_message',
//   CHAT_LISTING: 'chat_listing',
//   CHAT_DELETED: 'chat_deleted',

//   //listining

//   NOTIFY_FRIEND_FOR_NEW_LISTING: 'notify_friend_for_new_listing', 
//   NOTIFY_DELETE_CHAT: 'notify_delete_chat',
//   USER_JOINED: 'userJoined',
//   USER_CONNECTED_STATUS: 'user_connected_status',
//   NEW_MESSAGE: 'new_message', 
//   LEAVE_ROOM: 'leave_room', 

//   // CHAT_STARTED: 'chat_start',
//   // TYPING: 'Typing',
//   // IS_TYPING: 'isTyping',
//   // JOIN_SUPPORT_CHAT: 'join_support_chat',
//   // SUPPORT_MSG: 'support_message',
//   // CHAT_LEAVE: 'leave_room',
//   // NEW_MESSAGE: 'newMessage',
//   // NEW_SUPPORT_MESSAGE: 'new_support_message',
//   // DISCONNECT: 'disconnect',
//   // NEW_COMMENT: 'new_comment',
//   // NEW_REPLY: 'new_reply',
//   // NOTIFY_ME: 'notify_me',
//   // NOTIFY_ON_DONATE: 'notify_on_donate'


// };

// export default class Socket {
//   static socket = null;
//   static getSocket = () => {
//     if (Socket.socket === null) {
//       // let actorId = useSelector((state) => state?.user?.userDetail?.id);
//       // let authToken = useSelector((state) => state?.user?.userDetail?.token);
//       let authToken =
//         dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken;

//       // let authToken = Store?.getState()?.AuthReducer?.userToken //store.getState().auth.user.token;

//       console.log("check User================", authToken);        
//       // console.log(
//       //   'dsadsa======chect socket url',
//       //   dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken,
//       // );

//       Socket.socket = io(`${BASE_URL}?token=${authToken}`, {
//         transports: ['websocket'],
//         upgrade: false,
//         // reconnection: true,
//         // reconnectionAttempts: Infinity,
//         // reconnectionDelay: 1000,
//         // reconnectionDelayMax: 5000,

//         reconnection: true,       // Enable reconnection
//         reconnectionAttempts: 5,   // Maximum attempts to reconnect
//         reconnectionDelay: 1000,   // Time delay between reconnection attempts
//         reconnectionDelayMax: 5000 // Max delay between reconnection attempts

//       });
//       // console.log('--------', this.socket);
//     }
//     return Socket.socket;
//   };

//   static init = () => {
//     // const dispatch = useDispatch();
//     Socket.getSocket().on('connect', () => {
//       console.log('socket connected!', Socket.socket?.connected);
//       // dispatch(changeSocketConnectivityStatus(true));
//     });

//     Socket.getSocket().on('connect-error', err => {
//       // console.log("socket connection error", err);
//     });

//     Socket.getSocket().on('error', error => {
//       // console.log("socket error", error);
//     });

//     Socket.getSocket().on('disconnect', reason => {
//       // console.log("socket disconnected", reason);
//       // dispatch(changeSocketConnectivityStatus(false));
//     });
//   };

//   static onMessageRecieved_NewUser = (cb) => {
//     Socket.getSocket().on(SocketTypes.NOTIFY_FRIEND_FOR_NEW_LISTING, cb);
//   };


//   static onNewMessageRecieved = (cb) => {
//     Socket.getSocket().on(SocketTypes.NEW_MESSAGE, cb);
//   };

//   static onDeleteChat = (cb) => {
//     Socket.getSocket().on(SocketTypes.NOTIFY_DELETE_CHAT, cb);
//   };

//   static userJoinedChat = (cb) => {
//     Socket.getSocket().on(SocketTypes.USER_JOINED, cb);
//   };

//   static checkOnineofile = (cb) => {
//     Socket.getSocket().on(SocketTypes.USER_CONNECTED_STATUS, cb);
//   };

//   // static onMessageRecieved_NewComment = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.NEW_COMMENT, cb);
//   // };

//   // static onMessageRecieved_NestedComment = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.NEW_REPLY, cb);
//   // };

//   // static onMessage_OpenModal = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.NOTIFY_ME, cb);
//   // };

//   // static emitChatStarted = (data, cb) => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.CHAT_STARTED,
//   //     {
//   //       ...data,
//   //     },
//   //     cb,
//   //   );
//   // };

//   // static emitMessage = data => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.MESSAGE,
//   //     {
//   //       ...data,
//   //     },
//   //     acknowledgmentData => {
//   //       console.log('after send message===>', acknowledgmentData);
//   //     },
//   //   );
//   // };

//   // static emitNestedComnt = data => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.NESTED_COMNT,
//   //     {
//   //       ...data,
//   //     },
//   //     acknowledgmentData => {
//   //       console.log('after send message===>', acknowledgmentData);
//   //     },
//   //   );
//   // };

//   // static sendMessage = (data) => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.SEND_MESSAGE,
//   //     { 
//   //       ...data,
//   //     },
//   //     (acknowledgmentData: any) => {
//   //       // Handle the acknowledgment response from the server
//   //       console.log("SEND_MESSAGE===>",acknowledgmentData);
        

//   //     },
//   //   );
//   // };

//   static sendMessage = (data) => {
//     Socket.getSocket().emit(
//       SocketTypes.SEND_MESSAGE,
//       { 
//         ...data,
//       },
//       (acknowledgmentData) => {
//         console.log("SEND_MESSAGE===>", acknowledgmentData);
//       }
//     );
//   };

//   static emitChatJoin = (data, dispatch) => {
//     Socket.getSocket().emit(
//       SocketTypes.CHAT_JOIN,
//       { 
//         ...data,
//       },
//       (acknowledgmentData: any) => {
//         // Handle the acknowledgment response from the server
//         // console.log("emitChatJoin===>",acknowledgmentData);

//         if (acknowledgmentData?.data == null) {
//           dispatch(joinRoomMsg([]));
//         }
//         else{
//           dispatch(joinRoomMsg(acknowledgmentData?.data));
//         }
        

//       },
//     );
//   };

//   static RemoveChatJoin = (data, dispatch) => {
//     Socket.getSocket().emit(
//       SocketTypes.LEAVE_ROOM,
//       { 
//         ...data,
//       },
//       (acknowledgmentData: any) => {
//         // Handle the acknowledgment response from the server
//         console.log("leave room===>",acknowledgmentData);        

//       },
//     );
//   };

//   static emitGroup_ChatJoin = (data, dispatch) => {
//     Socket.getSocket().emit(
//       SocketTypes.CHAT_JOIN,
//       { 
//         ...data,
//       },
//       (acknowledgmentData: any) => {
//         // Handle the acknowledgment response from the server
//         console.log("emitChatJoin===>",acknowledgmentData);

//         if (acknowledgmentData?.data == null) {
//           dispatch(joinGroupRoomMsg([]));
//         }
//         else{
//           dispatch(joinGroupRoomMsg(acknowledgmentData?.data));
//         }
        

//       },
//     );
//   };

//   static UserListing = (data, dispatch) => {
//     Socket.getSocket().emit(
//       SocketTypes.CHAT_LISTING,
//       {
//         ...data,
//       },
//       (acknowledgmentData: any) => {
//         // Handle the acknowledgment response from the server

//         // console.log("CHAT_LISTING===>",acknowledgmentData);
        

//         dispatch(chatsMsg(acknowledgmentData?.data));
//       },
//     );
//   };


//   // for deleete all the message from that usefr
//   static DeleteMessges = (data, dispatch) => {
//     Socket.getSocket().emit(
//       SocketTypes.CHAT_DELETED,
//       {
//         ...data,
//       },
//       (acknowledgmentData: any) => {
//         // Handle the acknowledgment response from the server

//         console.log("CHAT_DELETE===>",acknowledgmentData);
      
//       },
//     );
//   };

  

//   // static emitdDonateToUser = (data) => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.NOTIFY_ON_DONATE,
//   //     {
//   //       ...data,
//   //     }
//   //   );
//   // };

//   // static emitChatLeave = data => {
//   //   Socket.getSocket().emit(SocketTypes.CHAT_LEAVE, {
//   //     ...data,
//   //   });
//   // };

//   // static onChatStarted = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.CHAT_STARTED, cb);
//   // };

//   // static onMessageTyping = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.TYPING, cb);
//   // };

//   // static onMessageRecieved = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.NEW_MESSAGE, cb);
//   // };

//   // Suppoet Agent Socket
//   // static emitJoinSupportChat = (data, dispatch) => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.JOIN_SUPPORT_CHAT,
//   //     {
//   //       ...data,
//   //     },
//   //     (acknowledgmentData) => {

//   //       console.log("======>",acknowledgmentData);
        

//   //       // Handle the acknowledgment response from the server
//   //       // dispatch(joinSupportChat(acknowledgmentData));
//   //     },
//   //   );
//   // };

//   // static onMessageRecieved_NewSupportAgent = (cb) => {
//   //   Socket.getSocket().on(SocketTypes.NEW_SUPPORT_MESSAGE, cb);
//   // };

//   // static emitSendSupportMessage = data => {
//   //   Socket.getSocket().emit(
//   //     SocketTypes.SUPPORT_MSG,
//   //     {
//   //       ...data,
//   //     },
//   //     acknowledgmentData => {
//   //       console.log('when user send message===>', acknowledgmentData);
//   //     },
//   //   );
//   // };

//   static disconnect = () => {
//     Socket.getSocket().disconnect();
//     Socket.socket = null;
//   };

//   static remove = (name, listener = null) => {
//     if (Socket.socket) {
//       if (listener) {
//         Socket.getSocket().removeListener(name, listener);
//       } else {
//         Socket.getSocket().removeAllListeners(name);
//       }
//     }
//   };
// }
// // export default Socket;