// export * from './notification.service';
import {
    userLogin,
    userSocialLogin,
    sendOtp,
    validateOtp,
    userAppleLogin,
    getUserDetail,
    getNotifications,
    getPostDetail,
    ReadNotification,
    getFriendList,
    getFriendListOthers,
    inviteFriendList,
    getOtpAgain,
    userForgetPassword,
    userVerifyForgetPassword,
    userVerifySignPassword,
    useResetPasswordApi,
    authSignupApi,
    storeUserDataApi,
    storeUserDataSocialApi,
    UserSignUpApi,
    getEventCategories


} from './auth/auth.service';

import {
    getPendingList,
    getGlobalSearchData,
    getSearchResult,
    AcceptReq,
    RejectReq,
    usersOnApplication,
    AddusersOnApplication,
    SyncContacts

} from './home/request.service';

import {
    getTimeLinePost,
    Like_Unlike,
    Like_Unlike_Comnt,
    ReportPost,
    CommentPosting,
    SharePost,
    getPostLikes,
    getPostComments,
    getPostCommentsPrevew

} from './home/home.service';

import {
    getEventList,
    getEventsMapLocation,
    getLocationsCoordinates_Filter_NearBy,
    getLocationsCoordinates_Filter,
    getEventsDetail,
    joinEvent,
    UnJoinEvent,
    getJoinedUserList,
    CancelEvent

} from './home/event.service';

import {
    CreatPost,
    UpdatePost,
    EditEventApi,
    CreatEvent

} from './home/create.service';

import {
    UpdateProfile,
    ActivitySignupApiCall,
    SendFriendReq,
    UnSendFriendReq,
    BlockFriends,
    DeactivAccount,
    DeleteAccountUserAccount,
    DeleteAccountApi,
    DeletePostApi,
    HidePostApi,
    getMyProfile,
    UpdateActivitySignupApiCall,
    BlockUserList,
    UnBlock,
    ContactUsApi,
    changePassword,
    Mute_UnMuteNotificationn,
    getMyProfilePostOnly,
    getPostActivityProfile,
    getMyProfileEventOnly,
    getMyProfileVideoOnly,
    getMyProfilePhotoOnly,
    getMyActivity,
    InviteEvent,
    getActivityList,
    getRoomId,
    getReviews,
    AddReview,
    logoutApi

} from './home/account.service';

import {
    UploaderMedia

} from './home/global.service';


const apis = {
    userLogin,
    sendOtp,
    validateOtp,
    userSocialLogin,
    userAppleLogin,
    getUserDetail,
    getNotifications,
    getPostDetail,
    ReadNotification,
    getFriendList,
    getFriendListOthers,
    inviteFriendList,
    getOtpAgain,
    userForgetPassword,
    userVerifyForgetPassword,
    userVerifySignPassword,
    useResetPasswordApi,
    authSignupApi,
    storeUserDataApi,
    storeUserDataSocialApi,
    UserSignUpApi,
    getEventCategories,

    //request
    getPendingList,
    getGlobalSearchData,
    getSearchResult,
    AcceptReq,
    RejectReq,
    usersOnApplication,
    AddusersOnApplication,
    SyncContacts,
    

    //home
    getTimeLinePost,
    Like_Unlike,
    Like_Unlike_Comnt,
    ReportPost,
    CommentPosting,
    SharePost,
    getPostLikes,
    getPostComments,
    getPostCommentsPrevew,

    //event
    getEventList,
    getEventsMapLocation,
    getLocationsCoordinates_Filter_NearBy,
    getLocationsCoordinates_Filter,
    getEventsDetail,
    joinEvent,
    UnJoinEvent,
    getJoinedUserList,
    CancelEvent,

    //create
    CreatPost,
    UpdatePost,
    EditEventApi,
    CreatEvent,

    //account
    UpdateProfile,
    ActivitySignupApiCall,
    SendFriendReq,
    UnSendFriendReq,
    BlockFriends,
    DeactivAccount,
    DeleteAccountUserAccount,
    DeleteAccountApi,
    DeletePostApi,
    HidePostApi,
    getMyProfile,
    UpdateActivitySignupApiCall,
    BlockUserList,
    UnBlock,
    ContactUsApi,
    changePassword,
    Mute_UnMuteNotificationn,
    getMyProfilePostOnly,
    getPostActivityProfile,
    getMyProfileEventOnly,
    getMyProfileVideoOnly,
    getMyProfilePhotoOnly,
    getMyActivity,
    InviteEvent,
    getActivityList,
    getRoomId,
    getReviews,
    AddReview,
    logoutApi,

    //global
    UploaderMedia,
    
    

  
  
  };
  
  export default apis;
