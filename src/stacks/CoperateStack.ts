import { Auth_ROUTES, HOME_ROUTES } from "../constants";
import { Login } from "../screens/authScreens/index";
import ConfirmCardRequest from "../screens/homeScreens/card/confirmCardRequest";
import CreatePhysicalCard from "../screens/homeScreens/card/createPhysicalCard";
import CreateVirtualCard from "../screens/homeScreens/card/createVirtualCard";
import PinSecurity from "../screens/homeScreens/card/pinSecurity";
import ReplaceCard from "../screens/homeScreens/card/replaceCard";
import ReplaceCardConfirm from "../screens/homeScreens/card/replaceCardConfirm";
import SetLimits from "../screens/homeScreens/card/setLimit";
import TransactionHistory from "../screens/homeScreens/card/transactionHistory";
import UpdateAddress from "../screens/homeScreens/card/updateAddress";
import AddNewCurrencyAcount from "../screens/homeScreens/home/addNewCurrencyAcount";
import TransactionDetail from "../screens/homeScreens/home/transactionDetail";
import ContactAddress from "../screens/homeScreens/more/contactandAddress";
import { TabStackCorporate } from "./TabStackCorporate";
// import { TabStack } from "./TabStack";


export type CoperateStackParamList = {
  [HOME_ROUTES.TABSTACK]: undefined;

};

type HomeScreenStacksTypes = {
  name: HOME_ROUTES | Auth_ROUTES;
  component: React.FC;
}[];

export const CoperateStack: HomeScreenStacksTypes = [
  {
    name: HOME_ROUTES.TABSTACK_CORPORATE,
    component: TabStackCorporate,
  },
  {
    name: HOME_ROUTES.CONTACTADDRESS,
    component: ContactAddress,
  },
  {
    name: HOME_ROUTES.PIN_SECURITY,
    component: PinSecurity,
  },
  {
    name: HOME_ROUTES.UPDATE_ADDRESS,
    component: UpdateAddress,
  },


];