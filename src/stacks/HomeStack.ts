import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import { Login } from "../screens/authScreens/index";
import ConfirmCardRequest from "../screens/homeScreens/card/confirmCardRequest";
import CreatePhysicalCard from "../screens/homeScreens/card/createPhysicalCard";
import CreateVirtualCard from "../screens/homeScreens/card/createVirtualCard";
import PinSecurity from "../screens/homeScreens/card/pinSecurity";
import ReplaceCard from "../screens/homeScreens/card/replaceCard";
import ReplaceCardConfirm from "../screens/homeScreens/card/replaceCardConfirm";
import SetLimits from "../screens/homeScreens/card/setLimit";
import setlimitCardPassword from "../screens/homeScreens/card/setlimitCardPassword";
import TransactionHistory from "../screens/homeScreens/card/transactionHistory";
import UpdateAddress from "../screens/homeScreens/card/updateAddress";
import AddNewCurrencyAcount from "../screens/homeScreens/home/addNewCurrencyAcount";
import TransactionDetail from "../screens/homeScreens/home/transactionDetail";
import ContactAddress from "../screens/homeScreens/more/contactandAddress";
import { TabStack } from "./TabStack";
// import { TabStack } from "./TabStack";


export type HomeStackParamList = {
  [HOME_ROUTES.TABSTACK]: undefined;

};

type HomeScreenStacksTypes = {
  name: HOME_ROUTES | Auth_ROUTES;
  component: React.FC;
}[];

export const HomeStack: HomeScreenStacksTypes = [
  {
    name: HOME_ROUTES.TABSTACK,
    component: TabStack,
  },
  {
    name: HOME_ROUTES.CREATE_VC,
    component: CreateVirtualCard,
  },
  {
    name: HOME_ROUTES.CREATE_PC,
    component: CreatePhysicalCard,
  },
  {
    name: HOME_ROUTES.CONTACTADDRESS,
    component: ContactAddress,
  },
  {
    name: HOME_ROUTES.ConfirmCardRequest,
    component: ConfirmCardRequest,
  },
  {
    name: HOME_ROUTES.PIN_SECURITY,
    component: PinSecurity,
  },
  {
    name: HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT,
    component:  AddNewCurrencyAcount,
  },
  {
    name: HOME_ROUTES.REPLACE_CARD,
    component: ReplaceCard,
  },
    {
    name: HOME_ROUTES.SET_LIMIT,
    component: SetLimits,
  },
  {
    name: HOME_ROUTES.RELACE_CARD_CONFIRM,
    component: ReplaceCardConfirm,
  },

  {
    name: HOME_ROUTES.TRANSACTIONHISTORY,
    component: TransactionHistory,
  },
  {
    name: HOME_ROUTES.UPDATE_ADDRESS,
    component: UpdateAddress,
  },
  {
    name: HOME_ROUTES.TRANSACTION_DETAIL,
    component: TransactionDetail,
  },
  {
    name: HOME_ROUTES.SET_CARD_PASSWORD,
    component: setlimitCardPassword,
  },

];