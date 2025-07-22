import { Login, OnBoarding, Signup6Screen, WelcomeScreen, SignupOtpScreen, SignupAccDetail, SignupFinish, ForgetPassword, ResetPassword, SignupLocation, CreateEvent, CreatePost, EditEvent, UniversalOtp } from "../screens";
import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import { SignupUploadProfile } from "../screens/authScreens/signupScreens/signupUploadProfile";
import { TabStack } from "./TabStack";
import { HomeStack } from "./HomeStack";
import { Message } from "../screens/homeScreens/home/message";
import { Notification } from "../screens/homeScreens/home/notification";
import { Search } from "../screens/homeScreens/home/search";
import { ShowLikes } from "../screens/homeScreens/generalScreens/ShowLikes";
import { EventDetails } from "../screens/homeScreens/events/eventDetails";
import { AddActivity } from "../screens/homeScreens/create/addActivity";
import { AddLocation } from "../screens/homeScreens/create/AddLocation";
import { ChatScreens } from "../screens/homeScreens/home/chatScreens";
import { EventMap } from "../screens/homeScreens/events/EventMap";
import { SelectCategory } from "../screens/homeScreens/events/selectCategory";
import { OtherProfile } from "../screens/homeScreens/account/otherProfile";
import ActivitySignup from "../screens/homeScreens/account/activitySignup";
import More from "../screens/homeScreens/account/more";
import AccountSetting from "../screens/homeScreens/account/more/accountSetting";
import BlockUser from "../screens/homeScreens/account/more/blockUser";
import TermsCondition from "../screens/homeScreens/account/more/termsCondition";
import PrivacyPolicy from "../screens/homeScreens/account/more/privacyPolicy";
import Faq from "../screens/homeScreens/account/more/faq";
import ContactUs from "../screens/homeScreens/account/more/contactUs";
import {PostDetailScreen} from "../screens/homeScreens/generalScreens/postDetail";
import {PostDetailSinglePost} from "../screens/homeScreens/generalScreens/postDetailSinglePost";
import { ActivityProfile } from "../screens/homeScreens/account/activityProfile";
import { InviteFriends } from "../screens/homeScreens/generalScreens/inviteFriends";
import EditPersonalProfile from "../screens/homeScreens/account/accountSetting/editPersonalProfile";
import EditBusinessProfile from "../screens/homeScreens/account/accountSetting/editBusinessProfile";
import ChangePassword from "../screens/homeScreens/account/accountSetting/changePassword";
import { PeopleJoined } from "../screens/homeScreens/generalScreens/peopleJoined";
import { GroupChatScreens } from "../screens/homeScreens/home/groupchatScreens";
import AddReviews from "../screens/homeScreens/account/addReviews";
import { InviteFriendsEvents } from "../screens/homeScreens/generalScreens/inviteFriendsEvents";
import { ShowFriendList } from "../screens/homeScreens/generalScreens/ShowFriendList";
import { PostPreview } from "../screens/homeScreens/generalScreens/postPreview";
import SelectPreferences from "../screens/homeScreens/account/more/selectPreferences";
import { AboutMe } from "../screens/homeScreens/account/aboutMe";
import { BlurPrevew } from "../screens/homeScreens/generalScreens/BlurPrevew";

export type AuthStackParamList = {
  [Auth_ROUTES.OnBoarding]: undefined;
  [Auth_ROUTES.Login]: undefined;
  [Auth_ROUTES.ForgotPassword]: undefined;
};

type AuthScreenStacksTypes = {
  name: Auth_ROUTES;
  component: React.FC;
}[];

export const AuthStack: AuthScreenStacksTypes = [
  {
    name: Auth_ROUTES.Welcome,
    component: WelcomeScreen,
  },
  {
    name: Auth_ROUTES.SignupLocation,
    component: SignupLocation,
  },
  {
    name: Auth_ROUTES.Login,
    component: Login,
  },
  {
    name: Auth_ROUTES.Signup6,
    component: Signup6Screen,
  },
  {
    name: Auth_ROUTES.SignupOtp,
    component: SignupOtpScreen,
  },
  {
    name: Auth_ROUTES.UniversalOtp,
    component: UniversalOtp,
  },
  {
    name: Auth_ROUTES.SignupUploadProfile,
    component: SignupUploadProfile,
  },
  {
    name: Auth_ROUTES.SignupAccDetail,
    component: SignupAccDetail,
  },
 {
    name: Auth_ROUTES.SignupFinish,
    component: SignupFinish,
  },
  {
    name: Auth_ROUTES.ForgetPassword,
    component: ForgetPassword,
  },
  {
    name: Auth_ROUTES.ResetPassword,
    component: ResetPassword,
  },
  {
    name: HOME_ROUTES.TabStack,
    component: TabStack,
  },

//removing screens
{
  name: HOME_ROUTES.Message,
  component: Message,
},
{
  name: HOME_ROUTES.ChatScreens,
  component: ChatScreens,
},
{
  name: HOME_ROUTES.GROUPCHATSCREENS,
  component: GroupChatScreens,
},
{
  name: HOME_ROUTES.Notification,
  component: Notification,
},
{
  name: HOME_ROUTES.ShowLikes,
  component: ShowLikes,
},
{
  name: HOME_ROUTES.ShowFriendList,
  component: ShowFriendList,
},
{
name: HOME_ROUTES.Search,
component: Search,
},
{
  name: HOME_ROUTES.CreateEvent,
  component: CreateEvent,
},
{
  name: HOME_ROUTES.EditEvent,
  component: EditEvent,
},
{
  name: HOME_ROUTES.SelectCagegory,
  component: SelectCategory,
},
{
  name: HOME_ROUTES.CreatePost,
  component: CreatePost,
},
{
  name: HOME_ROUTES.EventsDetail,
  component: EventDetails,
},
{
  name: HOME_ROUTES.AddActivity,
  component: AddActivity,
},
{
  name: HOME_ROUTES.AddLocation,
  component: AddLocation,
},
{
  name: HOME_ROUTES.OtherProfile,
  component: OtherProfile,
},
{
  name: HOME_ROUTES.activitySignup,
  component: ActivitySignup,
},
{
  name: HOME_ROUTES.AddReviews,
  component: AddReviews,
},
{
  name: HOME_ROUTES.more,
  component: More,
},
{
  name: HOME_ROUTES.activityProfile,
  component: ActivityProfile,
},
{
  name: HOME_ROUTES.InviteFriends,
  component: InviteFriends,
},
{
  name: HOME_ROUTES.InviteFriendsEvents,
  component: InviteFriendsEvents,
},
{
  name: HOME_ROUTES.editPersonalProfile,
  component: EditPersonalProfile,
},
{
  name: HOME_ROUTES.editBusinessProfile,
  component: EditBusinessProfile,
},
{
  name: HOME_ROUTES.ChangePassword,
  component: ChangePassword,
},
{
  name: HOME_ROUTES.accountSetting,
  component: AccountSetting,
},
{
  name: HOME_ROUTES.blockUser,
  component: BlockUser,
},
{
  name: HOME_ROUTES.termsCondition,
  component: TermsCondition,
},
{
  name: HOME_ROUTES.privacyPolicy,
  component: PrivacyPolicy,
},
{
  name: HOME_ROUTES.faq,
  component: Faq,
},
{
  name: HOME_ROUTES.contactUs,
  component: ContactUs,
},
{
  name: HOME_ROUTES.selectPreferences,
  component: SelectPreferences,
},
{
  name: HOME_ROUTES.postDetail,
  component: PostDetailScreen,
},
{
  name: HOME_ROUTES.postDetailSinglePost,
  component: PostDetailSinglePost,
},
{
  name: HOME_ROUTES.PeopleJoined,
  component: PeopleJoined,
},
{
  name: HOME_ROUTES.PostPreview,
  component: PostPreview,
},
{
  name: HOME_ROUTES.aboutMe,
  component: AboutMe,
},
{
  name: HOME_ROUTES.BlurPrevew,
  component: BlurPrevew,
},


  // {
  //   name: Auth_ROUTES.Login,
  //   component: Login,
  // },

  // {
  //   name: Auth_ROUTES.ForgotPassword,
  //   component: ForgotPassword,
  // },
];