import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import ForgetPassword from "../screens/authScreens/forgetPassword";
import { Login } from "../screens/authScreens/index";
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
    name: Auth_ROUTES.FORGETPASSWORD,
    component: ForgetPassword,
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