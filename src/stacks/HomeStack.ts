import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import { Login } from "../screens/authScreens/index";
// import { TabStack } from "./TabStack";


export type HomeStackParamList = {
  // [HOME_ROUTES.TabStack]: undefined;

};

type HomeScreenStacksTypes = {
  name: HOME_ROUTES | Auth_ROUTES;
  component: React.FC;
}[];

export const HomeStack: HomeScreenStacksTypes = [
  {
    name: Auth_ROUTES.LOGIN,
    component: Login,
  }


];