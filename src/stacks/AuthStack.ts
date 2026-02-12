import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import ForgetPassReset from "../screens/authScreens/forgetPassReset";
import ForgetPassword from "../screens/authScreens/forgetPassword";
import { Login } from "../screens/authScreens/index";
import LoginSecurePassword from "../screens/authScreens/loginSecurePassword";
import OtpVerify from "../screens/authScreens/otpVerify";
import SetPassword from "../screens/authScreens/setPasword";
import Welcome from "../screens/authScreens/welcome";
import AdminBeneficiaryStatus from "../screens/homeScreens/more/adminModule/adminbeneficiaryStatus";
import AdminConfirmCardRequest from "../screens/homeScreens/more/adminModule/admincardStatus";
import AdminPaymentStatus from "../screens/homeScreens/more/adminModule/adminPaymentStatus";
import Request from "../screens/homeScreens/more/adminModule/request";

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
    name: Auth_ROUTES.FORGET_PASS_RESET,
    component: ForgetPassReset,
  },
  {
    name: Auth_ROUTES.LOGIN_SECURE_PASS,
    component: LoginSecurePassword,
  },
  {
    name: Auth_ROUTES.REQUEST,
    component: Request,
  },
  {
    name: Auth_ROUTES.ADMIN_BENEFICIAY_STATUS,
    component: AdminBeneficiaryStatus,
  },
  {
    name: Auth_ROUTES.ADMIN_CARD_STATUS,
    component: AdminConfirmCardRequest,
  },
  {
    name: Auth_ROUTES.ADMIN_PAYMENT_STATUS,
    component: AdminPaymentStatus,
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