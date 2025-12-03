import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import CreateAccount from "../screens/authScreens/createAccount";
import ForgetPassword from "../screens/authScreens/forgetPassword";
import { Login } from "../screens/authScreens/index";
import LoginSecurePassword from "../screens/authScreens/loginSecurePassword";
import OtpVerify from "../screens/authScreens/otpVerify";
import SetPassword from "../screens/authScreens/setPasword";
import Welcome from "../screens/authScreens/welcome";
// import { SignupUploadProfile } from "../screens/authScreens/signupScreens/signupUploadProfile";
// import { TabStack } from "./TabStack";
import { HomeStack } from "./HomeStack";

export type AuthStackParamList = {
  [Auth_ROUTES.LOGIN]: undefined;
};

type AuthScreenStacksTypes = {
  name: Auth_ROUTES;
  component: React.FC;
}[];

export const AuthStack: AuthScreenStacksTypes = [
  {
    name: Auth_ROUTES.LOGIN,
    component: Login,
  },
      {
    name: Auth_ROUTES.WELCOME,
    component: Welcome,
  },
  {
    name: Auth_ROUTES.FORGETPASSWORD,
    component: ForgetPassword,
  },
  {
    name: Auth_ROUTES.OTPVERIFY,
    component: OtpVerify,
  },
  {
    name: Auth_ROUTES.SETPASSWORD,
    component: SetPassword,
  },
  {
    name: Auth_ROUTES.CREATEACCOUNT,
    component: CreateAccount,
  },

    {
    name: Auth_ROUTES.LOGIN_SECURE_PASS,
    component: LoginSecurePassword,
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