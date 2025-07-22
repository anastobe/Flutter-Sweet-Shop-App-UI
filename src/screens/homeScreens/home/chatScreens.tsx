import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
  AppState,
  Alert,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Linking
} from "react-native";
// import { Text } from "../../../components";
import Linkify from 'react-native-linkify'
import { Images, NavigationService } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { CommonUtils, SD } from "../../../utils";
// import { useTheme } from "../../../hooks";
import globalStyles from "../../../utils/globalStyles";
import navigationService from "../../../config/navigationService";
import { GradientHeader } from "../../../components/gradient-header"; 
import { CustomInputChat, PrimaryButton, Text } from "../../../components";
import { Avatar, Bubble, GiftedChat, MessageText, Send, Time } from 'react-native-gifted-chat'
import { Chatarray } from "../../../utils/data";
import { useCallback, useEffect, useRef, useState } from "react";
import { screenWidth } from "../../../utils/style.utils";
import { useIsFocused, useTheme } from "@react-navigation/native";
import Socket, { SocketTypes } from "../../../config/socketUtils";
import { RootState } from ".";
import apis from "../../../services";
import { joinRoomMsg } from "../../../Redux/Action/Home/HomeActions";
import Modal from "../../../components/modal";
import { HOME_ROUTES } from "../../../constants";
import KeyboardManager from "react-native-keyboard-manager";
import Clipboard from "@react-native-clipboard/clipboard";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { HandleLoader } from "../../../Redux/Action/Auth/AuthActions";
import LinkPreview from "../../../components/LinkPrevew";
import 'url-search-params-polyfill';
import InputAboveSide from "../../../components/inputAboveSide";
import { array } from "prop-types";

export const ChatScreens = ({...props}) => {
  
  const { colors, dark } = useTheme();
  const{ userDetail } = props?.route?.params
 
  const themeType = useSelector((state: RootState) => state?.AuthReducer?.themeType);
  const userData = useSelector((state: RootState) => state?.AuthReducer?.userData);
  // const join_roomMesgData = useSelector(state => state?.HomeReducer?.join_roomMesg);

  // console.log("userDetail======>",userDetail);

  const FOCUS = useIsFocused()
  const scrollRef = useRef()
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const [thumbUrl, setthumbUrl] = useState('')  
  const [loadthumbUrl, setloadthumbUrl] = useState(false)  
  const [validUrl, setvalidUrl] = useState(false)
  const [linkData, setlinkData] = useState({
    title: null,
    description: null,
    image: null,
    content: null,
    data: false 
  });

  const[Open, setOpen] = useState(Boolean)
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [DetailAnd_checkRoomId, setDetailAnd_checkRoomId] = useState({
    id_forApiHit: '',
    status: '',
    type: '',
    participants: [{
      chatId: '',
      user: {
        online: false,
        id: '',
        firstName: '',
        lastName: '',
        profilePictures: [{
          path: ''
        }]
      }
    }],
    });
    


    useEffect(()=>{
      if (FOCUS && Platform.OS == 'ios') {
        KeyboardManager.setEnable(false);
      }
      if (FOCUS && Platform.OS == 'android') {
        setTimeout(() => {
          Keyboard.dismiss()
        }, 100);
      }
      return()=>{
        if (Platform.OS == 'ios'){
          KeyboardManager.setEnable(true);
        }

        setlinkData({
          title: null,
          description: null,
          image: null,
          content: null,
          data: false 
        })

      }
    },[FOCUS])

    useEffect(() => {
      const appStateListener = AppState.addEventListener(
        'change',
        nextAppState => {
          console.log('Next AppState is: ', nextAppState);
    
          if (nextAppState=='active') {
            joinChat(userDetail?.participants[0]?.chatId?.toString())
          }
  
        },
      );
      return () => {
        appStateListener?.remove();
      };
    }, []);
      


  useEffect(()=>{

    let updatedArray = markAsRead(messages)
    setMessages(updatedArray)

  },[isUserJoined]) //when your friennd joined room

  const markAsRead = (messages: any) => {
    return messages.map((message: any) => {
      return { ...message, received: "Read" };
    });
  };

  setTimeout(() => {
    console.log("====>",messages);
  }, 1000);
      
  
  useEffect(()=>{
    if (FOCUS) {

      if (userDetail?.shareUrlBottomSheet?.AppUrl) {
        setTimeout(() => {
          setMessage(userDetail?.shareUrlBottomSheet?.url)
          const url = detectURL(userDetail?.shareUrlBottomSheet?.url); 
          if (url) {
            fetchMetaData(url);
            setvalidUrl(true)
          } else {
            // fetchMetaData(url);
            setvalidUrl(false)
          } 
        }, 1000);
      }
    

      const onReciveNewMessage = (msg:any) => {

        console.log("run==onReciveNewMessage",userData?.id,"-----",msg?.data);
       
        if (userData?.id == msg?.data?.senderId) {

          // let  array = messages

          // Update the last object completely
          messages[messages?.length - 1] = {
            _id: msg?.data?.id,
            text: msg?.data?.content,
            createdAt: msg?.data?.createdAt,
            user: { _id: userData?.id == msg?.data?.senderId ? 1 : 2, avatar: msg?.data?.sender?.id == userData?.id ? userData?.profilePictures[0]?.path : msg?.data?.sender?.profilePictures[0]?.path },
            received: msg?.data?.messageStatus,
            linkData: {
              title: msg?.data?.linkData?.title,
              description: msg?.data?.linkData?.description,
              image: msg?.data?.linkData?.image,
              content: msg?.data?.linkData?.content,
              data:  msg?.data?.linkData?.data, 
            }
          }

        //   setMessages(array)
        // return

        } else {

          let newMessage = {
            _id: msg?.data?.id,
            text: msg?.data?.content,
            createdAt: msg?.data?.createdAt,
            user: { _id: userData?.id == msg?.data?.senderId ? 1 : 2, avatar: msg?.data?.sender?.id == userData?.id ? userData?.profilePictures[0]?.path : msg?.data?.sender?.profilePictures[0]?.path },
            received: msg?.data?.messageStatus,
            linkData: {
              title: msg?.data?.linkData?.title,
              description: msg?.data?.linkData?.description,
              image: msg?.data?.linkData?.image,
              content: msg?.data?.linkData?.content,
              data:  msg?.data?.linkData?.data, 
            }
          };

             // console.log("new----mesages recive", newMessage);
        
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      )

      setTimeout(() => {
        scrollRef?.current?.scrollToOffset({
          offset: 0,
          animated: true
        });
      }, 200);

          
        }


     
        
      };

      const onDeleteChat = (msg: any) => {        
        if (msg?.data?.messagesDeleted) {
          setMessages([])
          // joinChat(userDetail?.participants[0]?.chatId?.toString())
        }
      };



      const checkOnlineOffline = (msg: any) =>{
        
        setDetailAnd_checkRoomId(prevState => ({
          ...prevState,
          participants: prevState.participants?.map(participant => ({
            ...participant,
            user: {
              ...participant.user,
              online: msg?.data?.connected // true or false
            }
          }))
        }));

        
      }
      


      //1
      setDetailAnd_checkRoomId(prevState => ({
        ...prevState,
        id_forApiHit: userDetail?.id_forApiHit,
        status: 'ACTIVE',
        type: userDetail?.type,
        participants: [{
          chatId: userDetail?.participants[0]?.chatId?.toString(),
          user: {
            online: userDetail?.participants[0]?.user?.online,
            id: userDetail?.participants[0]?.user?.id,
            firstName: userDetail?.participants[0]?.user?.firstName,
            lastName: userDetail?.participants[0]?.user?.lastName,
            profilePictures: [{
              path: userDetail?.participants[0]?.user?.profilePictures[0]?.path
            }]
          }
        }]
      }))

      //2
      Socket.onNewMessageRecieved(onReciveNewMessage);
      //3
      Socket.onDeleteChat(onDeleteChat);
      //4
      Socket.userJoinedChat(onUserJoinedChat); //for blue and grey tick
      //5
      Socket.checkOnineofile(checkOnlineOffline);
      //6
      if (userDetail?.participants[0]?.chatId?.toString() == null) {
        console.log("dont join chat user not exist in chat");
      }
      else{
        joinChat(userDetail?.participants[0]?.chatId?.toString())
      }

      return () => {
        
        // setMessages([])

        Socket.remove(SocketTypes.NEW_MESSAGE, onReciveNewMessage);
        
        // Socket.remove(SocketTypes.LEAVE_ROOM, DetailAnd_checkRoomId?.participants[0]?.chatId);
        // dispatch(joinRoomMsg([]));
        Socket.RemoveChatJoin(
          {
            roomId: DetailAnd_checkRoomId?.participants[0]?.chatId?.toString() || userDetail?.participants[0]?.chatId?.toString()
          }, // no message need to pass user listing on the basic of token
          dispatch,
        );

      };

    }
  },[FOCUS])

  const onUserJoinedChat = (msg: any) =>{
    if (msg?.readByAll) {  //whe every one read your message
      setIsUserJoined(Math.random())
    }
  }

  // join_room
  // useEffect(()=>{
  //   if (FOCUS) {
  //     joinChat(userData?.participants[0]?.chatId)

      
  //         Socket.onNewMessageRecieved(onReciveNewMessage);
      
  //         // return () => {
  //         //   Socket.remove(SocketTypes.NEW_MESSAGE, onReciveNewMessage);
  //         // };
      
  //   }
  // },[FOCUS]) 


  // useEffect(()=>{
  //   if (join_roomMesgData) {

  //     // Transforming the data
  //     const transformedData = join_roomMesgData.map((item) => ({   
  //       _id: item?.id,       
  //       text: item?.content, 
  //       createdAt: item?.createdAt,
  //       user:  { _id: userData?.id == item?.senderId ? 1 : 2, avatar: item?.sender?.profilePictures?.length ? item?.sender?.profilePictures[0]?.path  : Images.UserImg   },
        
  //       // sent: item?.read_Unread,
  //       // Mark the message as received, using two tick
  //       received: item?.messageStatus,
  //       // Mark the message as pending with a clock loader
  //       // pending: true,
  //       // Any additional custom parameters are passed through
    

  //     }));

  //     setMessages(transformedData)

  //   }
  // },[join_roomMesgData]) 
  


  function joinChat(JoimRoomId: any) {

    Socket.getSocket().emit(
      SocketTypes.CHAT_JOIN,
      {
        roomId: JoimRoomId?.toString(),
      },
      (acknowledgmentData: any) => {
        // Handle the acknowledgment response from the server
        // console.log("inscreen===>",acknowledgmentData?.data);
        
        // Transforming the data
        const transformedData = acknowledgmentData?.data?.map(item => ({
          _id: item?.id,
          text: item?.content,
          createdAt: item?.createdAt,
          user: {
            _id: userData?.id == item?.senderId ? 1 : 2,
            avatar: item?.sender?.profilePictures?.length
              ? item?.sender?.profilePictures[0]?.path
              : Images.UserImg,
          },

          // sent: item?.read_Unread,
          // Mark the message as received, using two tick
          received: item?.messageStatus,
          // Mark the message as pending with a clock loader
          // pending: true,
          // Any additional custom parameters are passed through
          linkData: {
            title: item?.linkData?.title,
            description: item?.linkData?.description,
            image: item?.linkData?.image,
            content: item?.linkData?.content,
            data: true 
          }
        }));

        if (acknowledgmentData?.data == null) {
          setMessages([])
        } else {
          setMessages(transformedData);
        }
      }
    )

    setTimeout(() => {
      scrollRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      });
    }, 700);

  }


  function ShowOtherPersonProfile(data: any) {

    if (data?.userId == userData?.id) {
      NavigationService.navigate(HOME_ROUTES.Account)
      return
    } else {
      NavigationService.navigate(HOME_ROUTES.OtherProfile, {
        userDetail: {
          image: data?.profilePictures?.length
            ? {uri: data?.profilePictures[0]?.path}
            : Images.UserImg,
          name: `${data?.firstName} ${data?.lastName}`,
          id: data?.id,
        },
      }); 
    }
  }

  function renderHeader() {

  function MiddleComponentRender() {
    return(
      <View>
    <TouchableOpacity onPress={()=>{ ShowOtherPersonProfile(DetailAnd_checkRoomId?.participants[0]?.user) }} style={{flexDirection: "row" }} >
      <View>
        <Image borderRadius={SD.wp(12)} source={DetailAnd_checkRoomId.participants[0]?.user?.profilePictures?.length ? { uri: DetailAnd_checkRoomId.participants[0]?.user?.profilePictures[0]?.path } : Images.UserImg} defaultSource={Images.UserImg} style={styles.headerimgSize} />
      </View>

    <View style={styles.marleft10} >
      <View style={[styles.noTxtTopContainer,{ }]} >
        <Text size={16} semiBold color={colors.White}  style={{ width: screenWidth - SD.wp(200) }} ellipsizeMode="tail" numberOfLines={2}  >{DetailAnd_checkRoomId.participants[0]?.user?.firstName} {DetailAnd_checkRoomId.participants[0]?.user?.lastName}</Text>
      </View>
     
      <View style={styles.noTxtBottomContainer} >
        {DetailAnd_checkRoomId?.participants[0]?.user?.online ?
        <>
          <View style={{ width: 6, height: 6, borderRadius: 50, backgroundColor: colors.greenColor }} />
          <Text FontSmall medium color={colors.White} leftSpacing={5} >Online</Text>
        </> 
        :
        <>
          <Text FontSmall medium color={colors.White} >Offline</Text>
        </> 
        }
      </View>
    </View>

    </TouchableOpacity>
      </View>
      )
    }

    return (
      <GradientHeader
        height={130}
        backFunction={() => {
          navigationService.goBack();
        }}
        btnImage={Images.ArrowLeft}
        showLeftUserImg={true}
        containerColor={colors.WhiteHalfOpacity02}
        tintColor={colors.T_White}
        showLeftComponent={true}
        showMiddleComponent={true}
        showMiddletxtonly={false}
        MiddleComponentRender={MiddleComponentRender}
        showMiddletxt={"Message"}
        showRightComponent={true}
        showRight1={false}
        right1containerColor={colors.WhiteHalfOpacity02}
        showRight1Img={Images.NotificationIcon}
        right1opacity={1}
        showRight1Press={()=>{ console.log("right icon 1") }}
        showRight2={true}
        right2containerColor={colors.WhiteHalfOpacity02}
        showRight2Img={Images.ThreeDot}
        right2opacity={1}
        showRight2Press={()=>{ setOpen(true) }}
        showRight3={false}
        right3containerColor={colors.WhiteHalfOpacity02}
        showRight3Img={Images.LeftRightClip}
        right3opacity={1}
        showRight3Press={()=>{ console.log("right icon 3") }}
      />
    );
  }

  function reflectFast(msg: any) {

    let newMessage = {
      _id: msg?.roomId,
      text: msg?.message,
      createdAt: new Date().getTime(),
      user: { _id: 1, avatar: userData?.profilePictures[0]?.path  },
      received: msg?.data?.messageStatus,
      linkData: {
        title: msg?.linkData?.title,
        description: msg?.linkData?.description,
        image: msg?.linkData?.image,
        content: msg?.linkData?.content,
        data:  msg?.linkData?.data, 
      }
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    )

  }

  function RoomId_have_directsendMsg() {

    // if (linkData?.title || linkData?.description || linkData?.image) {

    // if (linkData?.data) {
      if (linkData.title == '' && linkData.description == '' && linkData.image == null && !linkData.data ) {

        var object =  {
          roomId: DetailAnd_checkRoomId?.participants[0]?.chatId?.toString(),
          message: message,
          linkData: {
            title: null,
            description: null,
            image: null,
            content: null,
            data: false 
          },
          chatType: DetailAnd_checkRoomId?.type,
          friendId: DetailAnd_checkRoomId?.participants[0]?.user?.id,
        }

    }
    else{
      var object =  {
        roomId: DetailAnd_checkRoomId?.participants[0]?.chatId?.toString(),
        message: message,
        linkData: {
          title: linkData?.title,
          description: linkData?.description,
          image: linkData?.image,
          content: linkData?.content,
          data: true 
        },
        chatType: DetailAnd_checkRoomId?.type,
        friendId: DetailAnd_checkRoomId?.participants[0]?.user?.id,
      }
    }    

    reflectFast(object)

    Socket.sendMessage(
      {
          roomId: object?.roomId,
          message: object?.message,
          chatType: object?.chatType,
          linkData: {
            title: object?.linkData?.title,
            description: object?.linkData?.description,
            image: object?.linkData?.image,
            content: object?.linkData?.content,
            data: object?.linkData?.data 
          },
          friendId: object?.friendId,
      }


    );

    setlinkData({
      title: null,
      description: null,
      image: null,
      content: null,
      data: false 
    })
    setthumbUrl('')
    setvalidUrl(false)
    setloadthumbUrl(false)

    setTimeout(() => {
      scrollRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      });
    }, 1000);

    setMessage('')
  }
  

  async function hitApiToGetRoomId() {
    let body = {
        userId: DetailAnd_checkRoomId?.id_forApiHit,
        message: message,
        linkData: {
          title: linkData?.title,
          description: linkData?.description,
          image: linkData?.image,
          content: linkData?.content,
          data: true 
        }
     }

    let res = await apis.getRoomId(body)

    if (res?.status) {
      console.log("run==hitApiToGetRoomId");
      joinChat(res?.data?.id)
    }

    setTimeout(() => {
      scrollRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      });
    }, 700);

    setMessage('') 
    
     //this becouse in second hit it will not hit api as we get chat id and in 2nd round every thing happen same as happen in chat user listing flow we have 2 flow for this 1: come to chat from user list or 2nd come to chat in other friend list     
    
     setDetailAnd_checkRoomId((prevState) => ({
      ...prevState,
      type: res?.data?.type,
      participants: prevState?.participants?.map(participant => ({
        ...participant,
        chatId: res?.data?.id?.toString()
      }))
    }));
    
     // setDetailAnd_checkRoomId(prevState => ({
    //   ...prevState,
    //   participants: [{
    //     chatId: res?.data?.id
    //   }]
    // }))
  }

  async function sendMessage() {

    if (message) {

      if (DetailAnd_checkRoomId?.participants[0]?.chatId?.toString() == null) {
        console.log("hit api");
        hitApiToGetRoomId()
      }
      else{
        console.log("RoomId_have_directsendMsg");
        RoomId_have_directsendMsg()
      }
      

    }
    // else{
    //   Alert.alert("empty message can not be sent")
    // }
    
  }

  const detectURL = (text: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls ? urls[0] : null;
  };


  const getParamsFromLink = (url: string): { title: string, description: string, imageUrl: string } => {
    if (!url.includes('?')) return { title: '', description: '', imageUrl: '' };
  
    const queryString = url.split('?')[1];
    const params = queryString.split('&').reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = decodeURIComponent(value || '');
      return acc;
    }, {} as Record<string, string>);
  
    const title = params.title || '';
    const description = params.description || '';
    const imageUrl = params.imageUrl || '';
  
    return { title, description, imageUrl };
  };

  // Function to fetch metadata from a dynamic link
// Function to fetch metadata from a dynamic link
const fetchMetaDataFromDynamicLink = async (url: string) => {
  try {
    // Resolve the dynamic link using Firebase Dynamic Links
    const resolvedLink = await dynamicLinks().resolveLink(url);

    // Check if the resolved link contains a URL
    const resolvedUrl = resolvedLink?.url || '';
    
    // Extract query parameters from the resolved URL
    const { title, description, imageUrl } = getParamsFromLink(resolvedUrl);

    console.log("Extracted Metadata from Dynamic Link:s", { title, description, image: imageUrl });

    return { title, description, image: imageUrl, data: imageUrl ? true : false };
  } catch (error) {
    console.error('Error resolving dynamic link:', error, "--", url);
    return { title: '', description: '', image: null, data: false };
  }
};


  // Function to fetch metadata from a regular URL (Open Graph)
  const fetchMetaDataFromUrl = async (url: any) => {
    try {
      // Fetch the raw HTML of the page
      const response = await fetch(url);
      const html = await response.text();

      // Extract Open Graph meta tags using regex
      const metaTags = {
        title: html.match(/<meta property="og:title" content="(.*?)"/)?.[1] || '',
        description: html.match(/<meta property="og:description" content="(.*?)"/)?.[1] || '',
        image: html.match(/<meta property="og:image" content="(.*?)"/)?.[1] || '',
        data: html.match(/<meta property="og:image" content="(.*?)"/)?.[1] ? true : false
      };

      console.log("extracted universal link==>",metaTags);
      

      // Decode any encoded characters in the image URL
      metaTags.image = metaTags.image.replace(/&amp;/g, '&');

      return metaTags;
    } catch (error) {

      return { title: '', description: '', image: null, data: false };
      }
  };

  // Main function to decide where to fetch metadata from
  const fetchMetaData = async (url: any) => {
    try {
      // Show loader
      setloadthumbUrl(true);

      let metaData = null;

      // Check if the URL is a dynamic link
      if (url.includes('https://planzee')) {
        // Fetch metadata from the dynamic link

        // console.log("firebase run");
        metaData = await fetchMetaDataFromDynamicLink(url);
      } else {
        // Fetch metadata from the regular URL
        // console.log("universal run");
        metaData = await fetchMetaDataFromUrl(url);
      }

      // if (metaData) {
      if (metaData.title == '' && metaData.description == '' && metaData.image == null && !metaData.data ) {
        // In case of failure, set empty link data
        setlinkData({
          title: null,
          description: null,
          image: null,
          content: null,
          data: false, // Indicate failure to fetch metadata
        });
        setloadthumbUrl(false); // Hide loader

      } else {
        // Update the state with the fetched metadata
        setlinkData({
          title: metaData.title,
          description: metaData.description,
          image: metaData.image,
          content: metaData.description, // Use description as content
          data: true, // Indicate metadata was successfully fetched
        });

        setthumbUrl(url); // Store the current URL
        setloadthumbUrl(false); // Hide loader
      }

      setTimeout(() => {
        console.log("bna-=====>",metaData);
      }, 1000);

      return metaData;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      setloadthumbUrl(false); // Hide loader
    } finally {
      setloadthumbUrl(false); // Ensure loader is hidden
    }
  };  

  const fetchAllPostLikes = useCallback((id: any) => {
    NavigationService.navigate(HOME_ROUTES.ShowLikes, {
      id: id,
    });
  }, []);

  const handleChangeText = useCallback((text:string) => {
    setMessage(text)
    
    const url = detectURL(text);  

    if (!url) {
      setvalidUrl(false)
      setlinkData({
        title: null,
        description: null,
        image:  null,
        content: null,
        data: false 
      })
    } 
    if (url) {
      setvalidUrl(true)
      if (
        // linkData?.data && 
        (thumbUrl?.length == url?.length)) {
        return
      }
      
        fetchMetaData(url);   
      
    }

  },[]);

  function renderComposer() {
    return (       
      <View>

        
        <InputAboveSide 
        validUrl={validUrl}
        loadThumbUrl={loadthumbUrl}
        linkData={linkData}
        message={message}
        colors={colors}
        themeType={dark}
        SD={SD}
      />
      <View style={[styles.composerContainerStyles,{     backgroundColor: colors.White, }]}>  
        <CustomInputChat
          value={message}
          onChangeText={message => {
            handleChangeText(message)
          }}
          placeholder={'Message...'}
          multiline
          textAlignVertical="center"
          eye={message && Images.sendIcon}
          onEyePress={()=>{ sendMessage()}}
          returnKeyType={Platform.OS == 'android' ? 'none' : 'default'}
          containerStyle={styles.composerInputStyles}
          customStyle={{  paddingTop: Platform.OS == 'ios' ? SD.wp(15) : SD.wp(12)  }}
        />
        {/* </View> */}
      </View>
      </View>
    );
  }

  // const onSend = useCallback((messages = []) => {

  //   console.log("----->",messages);
    

  //   // setMessages(previousMessages =>
  //   //   GiftedChat.append(previousMessages, messages),
  //   // )
  // }, [])

  function copyLink(link: any) {
    Clipboard.setString(link);
    Alert.alert('Link Copied', `The link has been copied to your clipboard. \n${link}`); 
  }


  async function openUrl(link: any) {
    if (!link?.includes('https://planzee.page')) {
      Linking.openURL(link)
    }
    try {
      // Resolve the short link
      const resolvedLink = await dynamicLinks().resolveLink(link);
  
      // Access the original URL (long URL) from the resolved link
      const originalUrl = resolvedLink.url;
  
    // Check if the URL contains the specific strings ('EventPreview' or 'PostPreview')
    if (originalUrl.includes('EventPreview')) {
      const eventId = originalUrl?.split('EventPreview/')[1]?.split("-----")[0];
      NavigationService.navigate(HOME_ROUTES.EventsDetail,{ eventId: eventId, categoryName: ''})

    } else if (originalUrl.includes('PostPreview')) {
      const postId = originalUrl?.split('PostPreview/')[1]?.split("-----")[0]
      
      dispatch(HandleLoader(true))
      let res = await apis.getPostDetail(postId)
      NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: false, postObjectData: res?.data, objectId: postId  })
      dispatch(HandleLoader(false))
    } 
    else if (originalUrl.includes('ProfilePreview')) {
      // Extract the ID from the URL (after 'ProfilePreview/')
      const profileId = originalUrl?.split('ProfilePreview/')[1]?.split("-----")[0]

      NavigationService.navigate(HOME_ROUTES.OtherProfile, {
        userDetail: {
          id: profileId,
        }})

    } 

    else {
      // If the link doesn't contain either of the strings, open it in the browser
      Linking.openURL(originalUrl);
    }

    
  
    } catch (error) {
      console.error('Error resolving dynamic link:', error);
      return null; // Return null if there is an error
    }
  }


  const renderBubble = (props) => {
    
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: [
              styles.bubbleStyleright
            ],
            left: [
              styles.bubbleStyleleft,
            ],
          }}
          renderMessageText={props => {

            const messageText =
            props?.currentMessage?.text || props?.nextMessage?.text;  

            console.log("---messageText-->",messageText,"?.linkData==>",props?.currentMessage?.linkData);
            
            
            if (props?.currentMessage?.linkData?.image) {
              return(
                <LinkPreview 
                  position={props?.position} 
                  messageText={messageText}
                  metadata={props?.currentMessage?.linkData} 
                  isLoading={false}
                />
              )
            }
            else
            return ( 
              <Linkify onLongPress={(item)=>{ copyLink(item) }} onPress={(link)=>{ openUrl(link) }} linkStyle={[{ color:  props?.position == "right" ? colors.White : colors.orangeCol }, { textDecorationLine: "underline" } ]} >
              <View style={{   
                backgroundColor: props?.position == "right" ? colors.btnColor : colors.White,
                paddingHorizontal: SD.wp(14),
                padding: SD.wp(10),
                borderRadius: SD.wp(10),
                minWidth: SD.wp(100),
                marginTop: SD.wp(10)
               }} >

                <Text color={ props?.position == "right" ? colors.T_White : colors.txtColor} size={14} regular >{messageText}</Text>
              </View>
                 
                <View style={{ flexDirection: "row", alignSelf: "flex-end", alignItems: "center" }} >
                  <Text size={11} medium  color={"#14151580"} topSpacing={8} rightSpacing={1} >{CommonUtils.timeHumanize(props?.currentMessage?.createdAt)}</Text>
                  {props?.position == "right" && 
                  <View>
                   {props?.currentMessage?.received == "Read" ?
                    <Image source={Images.tickRead} style={{ width: SD.wp(19), height: SD.hp(11), marginLeft: SD.wp(5), top: SD.wp(3) }} tintColor={themeType && colors.blue} resizeMode="contain" />
                    : 
                    <Image source={Images.tickUnread} style={{ width: SD.wp(19), height: SD.hp(11), marginLeft: SD.wp(5), top: SD.wp(3) }} tintColor={themeType && colors.lightGrey}  resizeMode="contain" />
                   }
                  </View>
                  }
                </View>
              </Linkify>
            );
          }}
          renderTicks={props => (<></>)} 
          renderTime={props => (<></>)}  //dont show time

            // renderTicks={(props) => (
            //   console.log(":SADasdasdaa",props )
              
            //   // <Image
            //   //   source={Images.ArrowLeft}
            //   //   style={{
            //   //     width: 15,
            //   //     height: 15,
            //   //   }}
            //   // />
            // )}
          
        />
      </View>
    );

  };

  function renderChat() {
    return(
      <GiftedChat
        // forceGetKeyboardHeight={false}
        infiniteScroll
        messages={messages}
        messagesContainerStyle={{ paddingBottom: SD.wp(25) }}
        showAvatarForEveryMessage
        renderAvatarOnTop
        showUserAvatar
        // onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        // alwaysShowSend
        // renderComposer={renderComposer}
        renderInputToolbar={renderComposer}
        // scrollToBottom

        renderAvatar={(props) => (
          <Avatar {...props} imageStyle={{ 
            left: { borderRadius: 10, width: SD.wp(30), height: SD.wp(30), marginTop: SD.wp(10) },
            right: { borderRadius: 10, width: SD.wp(30), height: SD.wp(30), marginTop: SD.wp(10) }  
          }} />
        )}
        />
  )}

  function renderModal() {
    return (
      <Modal
        isVisible={Open}
        isKeyboardAvoidingView={true}
        children={DeleteMsgAlert()}
        onClose={() => {
          console.log('close');
        }}
      />
    );
  }

  function deleteAllMsg() {
    Socket.DeleteMessges(
      {
        roomId: DetailAnd_checkRoomId?.participants[0]?.chatId?.toString(),
        friendId: DetailAnd_checkRoomId?.participants[0]?.user?.id,
      }, // DELETED ALL MESSAGE FROM THIS ROOM ID
      dispatch,
    );
  }

  function DeleteMsgAlert() {
    return(
      <View style={styles.moladPadding} >
              
      <View>
        <TouchableOpacity onPress={() => setOpen(false) }>
          <Image source={Images.circleCross} style={styles.crossImgContainer} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }} >
        <Text size={24} bold color={colors.txtColor} >Alert!</Text>
        <Text FontRegular medium topSpacing={12} color={colors.txtCol6} style={{ textAlign: "center" }} >{"Are you sure you want to delete chat history from this user"}</Text>
      </View>
      
      
      <View style={styles.twobtnCont} >
   <PrimaryButton
      activeOpacity={0.7}
      title={'Yes'}
      fontSize={14}
      color={colors.red}
      textColor={colors.T_White}
      customStyles={[styles.headerCustomStyleShhetSty,{ width: screenWidth/2 - 50 }]}
      onPress={()=>{
        setOpen(false)
        setTimeout(() => {
          deleteAllMsg()                     
        }, 1000);

      } } 
  />
  <PrimaryButton
    activeOpacity={0.7}
      title={'No'}
      fontSize={14}
      color={colors.disableBtnCol2}
      textColor={colors.txtColor}
      customStyles={[styles.headerCustomStyleShhetSty,{ width: screenWidth/2 - 50, }]}
      onPress={()=>{
        setOpen(false)
      } } 
  />

   </View>


    </View>
    )
  } 

  return (
      <ImageBackground source={ dark ? Images.wtsappBackgroundDark : Images.wtsappBackground}  style={{flex: 1,backgroundColor: colors.BgScreenCol}} key={dark} >
        <StatusBar translucent backgroundColor={colors.btnColor} />
      {renderHeader()}
      {renderChat()}
      {renderModal() }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerimgSize:
  { width: SD.wp(42), height: SD.hp(42) },
  marleft10:
  {  marginLeft: SD.wp(10) },
  noTxtTopContainer:
  { marginBottom: 0, marginTop: 1 },
  noTxtBottomContainer:
  { flexDirection: "row", top: 3, alignItems: "center",  },
  noTxtBottomContainerMargin:
  { marginRight: SD.wp(10) },
  noTxtBottomContainerImgSize:
  { width: 19, height: 19 },
  
  //gifter chat style

  senderContainerStyles: {
    // borderWidth: 1,
    // borderColor: 'red',
    // width: '15%',
    // height: '100%',
    // marginBottom: Metrix.VerticalSize(10),
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#021728",
    position: 'absolute',
    right: 30,
    width: 36,
    height: 36,
    bottom: 3,
  },
  composerContainerStyles: {
    paddingHorizontal: SD.hp(9),
    // paddingVertical: Metrix.HorizontalSize(10),
    // marginHorizontal: Metrix.HorizontalSize(20),
    // paddingRight: Metrix.HorizontalSize(10),

    // backgroundColor:"blue",
    width: '100%',
    height: Platform.OS == 'ios' ? SD.hp(100) : SD.hp(80),
    // justifyContent: "center",
    // borderWidth: 1,
    // borderColor: 'red',
    // position: 'absolute',
    // bottom: 0,
    // alignSelf: 'center',
  },

// removeDefultWhiteLine:
// { height: 2, width: screenWidth, backgroundColor: "021728" ,position: "absolute", top: -1.5 },
composerInputStyles: {
  borderRadius: SD.wp(12),

  // marginVertical: 0,
  // backgroundColor: "#0D2438",
  // paddingTop: Platform.OS == 'ios' ? 10 : 0,
  // borderWidth: 1,
  // borderColor: 'green',
  // position: 'relative',
},

//bubble
bubbleStyleright: {
  // borderWidth: 1,
  // borderColor:'red',
  backgroundColor: "transparent",
  paddingHorizontal: SD.wp(14),
  // paddingVertical: SD.wp(10),
  // borderTopLeftRadius: 20,
  // borderTopRightRadius: 20,
  // borderBottomLeftRadius: 20,
  // borderBottomRightRadius: 20,
  // marginVertical: 10,
  width: '80%',
  marginRight: -18 // in actiaul its 12
},

bubbleStyleleft: {
  // borderWidth: 1,
  // borderColor:'red',
  // backgroundColor: "#fff",
  backgroundColor: "transparent",
  paddingHorizontal: SD.wp(14),
  // paddingVertical: SD.wp(10),
  // borderTopLeftRadius: 20,
  // borderTopRightRadius: 20,
  // borderBottomLeftRadius: 20,
  // borderBottomRightRadius: 20,
  // marginVertical: 10,
  width: '80%',
  marginLeft: -18 // in actiaul its 12

},

// bubbleMessageTimeStyles: {
//   display: 'none',
// },


  //modal
  moladPadding:
  { padding: SD.wp(20) },
  crossImgContainer:
  { width: SD.wp(24), height: SD.hp(24), alignSelf: "flex-end" },
  btnstyle:
  { height: SD.hp(56), marginTop: SD.hp(10), width: SD.wp(150), alignSelf: "center" },
  headerCustomStyleShhetSty:  
  {  borderRadius: SD.wp(10), height: SD.hp(55) },
  twobtnCont:
  { flexDirection: "row",  justifyContent: "space-between", marginTop: 20},

  


  container: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: SD.wp(20),
    marginTop: SD.hp(5)
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  mutualFriends: {
    width: '70%',
    height: 12,
    borderRadius: 4,
  },
  button: {
    width: 80,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

});
