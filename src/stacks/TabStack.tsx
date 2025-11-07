import {
  Image,
  ImageProps,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import React, { useEffect } from 'react';
import { Images } from '../config';
import { SD, Toast } from '../utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth_ROUTES, HOME_ROUTES } from '../constants';
import HomeScreen from '../screens/homeScreens/home/homeScreen';
import AccountScreen from '../screens/homeScreens/account/accountScreen';
import MoreScreen from '../screens/homeScreens/more/moreScreen';
import CardScreen from '../screens/homeScreens/card/cardScreen';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../styles';
import { scale } from 'react-native-size-matters';
import CreateVirtualCard from '../screens/homeScreens/card/createVirtualCard';
import CreatePhysicalCard from '../screens/homeScreens/card/createPhysicalCard';
import ContactAddress from '../screens/homeScreens/more/contactandAddress';
import Profile from '../screens/homeScreens/more/profile';
import UpdatePassword from '../screens/homeScreens/more/updatePassword';
import CurrencyExchange from '../screens/homeScreens/more/currencyExchange/currencyExchange';
import ConversionHistory from '../screens/homeScreens/more/conversionHistory';
import BeneficiariesManagement from '../screens/homeScreens/more/benefeciaryModule/BeneficiariesManagement';
import AddnewBeneficiary from '../screens/homeScreens/more/benefeciaryModule/addnewBeneficiary';
import Privacypolicy from '../screens/homeScreens/more/privacypolicy';
import TermsofUse from '../screens/homeScreens/more/termsofUse';
import FAQ from '../screens/homeScreens/more/faq';
import Support from '../screens/homeScreens/more/support';
import ConfirmCurrencyExchange from '../screens/homeScreens/more/currencyExchange/confirmCurrencyExchange';
import AccountDetail from '../screens/homeScreens/account/accountDetail';
import MakePayment from '../screens/homeScreens/payment/makePayment';
import MyAccountTransfer from '../screens/homeScreens/home/myAccountTransfer';
import InternationalTransfer from '../screens/homeScreens/home/internationalTransfer';
import BankTansfer from '../screens/homeScreens/home/bankTransfer';
import Notification from '../screens/homeScreens/home/notification';
import AddNewCurrencyAcount from '../screens/homeScreens/home/addNewCurrencyAcount';
import AccountStatement from '../screens/homeScreens/account/accountStatement';
import ConfirmCardRequest from '../screens/homeScreens/card/confirmCardRequest';
import TransactionDetail from '../screens/homeScreens/home/transactionDetail';
import Request from '../screens/homeScreens/more/adminModule/request';
import AdminPaymentStatus from '../screens/homeScreens/more/adminModule/adminPaymentStatus';
import AdminBeneficiaryStatus from '../screens/homeScreens/more/adminModule/adminbeneficiaryStatus';
import AdminConfirmCardRequest from '../screens/homeScreens/more/adminModule/admincardStatus';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type TabStackType = {
  name: string;
  component: React.FC;
  icon: ImageProps['source'];
  iconActive: ImageProps['source'];
}[];


const HomeStack = () => {

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={HOME_ROUTES.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.TRANSACTION_DETAIL}
          component={TransactionDetail}
          options={{ headerShown: false }}
        />
              <Stack.Screen
        name={HOME_ROUTES.BENEFICIARY_MANAGEMENT}
        component={BeneficiariesManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />      
      <Stack.Screen
        name={HOME_ROUTES.ADD_NEW_BENEFICIARY}
        component={AddnewBeneficiary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.CURRENCY_EXCHANGE}
        component={CurrencyExchange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.MAKE_PAYMENT}
        component={MakePayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.MY_ACCOUNT_TRANSFER}
        component={MyAccountTransfer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.BANK_TRANSFER}
        component={BankTansfer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.INTERNATIONAL_TRANSFER}
        component={InternationalTransfer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ACCOUNT_DETAIL}
        component={AccountDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.NOTIFICATION}
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ACCOUNT_STATEMENT}
        component={AccountStatement}
        options={{ headerShown: false }}
      />
      
              <Stack.Screen
        name={HOME_ROUTES.ADD_NEW_CURRENCY_ACCOUNT}
        component={AddNewCurrencyAcount}
        options={{ headerShown: false }}
      />

      </Stack.Navigator>
    </>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={HOME_ROUTES.ACCOUNT}
        component={AccountScreen}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name={HOME_ROUTES.ACCOUNT_STATEMENT}
        component={AccountStatement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ACCOUNT_DETAIL}
        component={AccountDetail}
        options={{ headerShown: false }}
      />
              <Stack.Screen
        name={HOME_ROUTES.BENEFICIARY_MANAGEMENT}
        component={BeneficiariesManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADD_NEW_BENEFICIARY}
        component={AddnewBeneficiary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.CURRENCY_EXCHANGE}
        component={CurrencyExchange}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name={HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE}
        component={ConfirmCurrencyExchange}
        options={{ headerShown: false }}
      />
    <Stack.Screen
          name={HOME_ROUTES.MAKE_PAYMENT}
          component={MakePayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.MY_ACCOUNT_TRANSFER}
          component={MyAccountTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.BANK_TRANSFER}
          component={BankTansfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.INTERNATIONAL_TRANSFER}
          component={InternationalTransfer}
          options={{ headerShown: false }}
        />
            <Stack.Screen
        name={HOME_ROUTES.NOTIFICATION}
        component={Notification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name={HOME_ROUTES.PAYMENT}
        component={PaymentScreen}
        options={{ headerShown: false }}
      /> */}
           <Stack.Screen
          name={HOME_ROUTES.MAKE_PAYMENT}
          component={MakePayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.MY_ACCOUNT_TRANSFER}
          component={MyAccountTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.BANK_TRANSFER}
          component={BankTansfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.INTERNATIONAL_TRANSFER}
          component={InternationalTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.ACCOUNT_DETAIL}
          component={AccountDetail}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};

const CardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen
        name={HOME_ROUTES.CARD}
        component={CardScreen}
        options={{ headerShown: false }}
      />
      
              <Stack.Screen
          name={HOME_ROUTES.TRANSACTION_DETAIL}
          component={TransactionDetail}
          options={{ headerShown: false }}
        />
      <Stack.Screen
        name={HOME_ROUTES.ConfirmCardRequest}
        component={ConfirmCardRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ACCOUNT_DETAIL}
        component={AccountDetail}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name={HOME_ROUTES.NOTIFICATION}
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADD_NEW_BENEFICIARY}
        component={AddnewBeneficiary}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={HOME_ROUTES.MORE}
        component={MoreScreen}
        options={{ headerShown: false }}
      />
           <Stack.Screen
          name={HOME_ROUTES.TRANSACTION_DETAIL}
          component={TransactionDetail}
          options={{ headerShown: false }}
        />
      <Stack.Screen
        name={HOME_ROUTES.CONTACTADDRESS}
        component={ContactAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.REQUEST}
        component={Request}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.UpdatePassword}
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.CURRENCY_EXCHANGE}
        component={CurrencyExchange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.CONVERSION_HISTORY}
        component={ConversionHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.BENEFICIARY_MANAGEMENT}
        component={BeneficiariesManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADD_NEW_BENEFICIARY}
        component={AddnewBeneficiary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.FAQ}
        component={FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.SUPPORT}
        component={Support}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.PRIVACY_POLICY}
        component={Privacypolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.TERMS_USE}
        component={TermsofUse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.CONFIRM_CURENCY_EXCHANGE}
        component={ConfirmCurrencyExchange}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADMIN_PAYMENT_STATUS}
        component={AdminPaymentStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADMIN_BENEFICIAY_STATUS}
        component={AdminBeneficiaryStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.ADMIN_CARD_STATUS}
        component={AdminConfirmCardRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_ROUTES.MAKE_PAYMENT}
        component={MakePayment}
        options={{ headerShown: false }}
      />

        <Stack.Screen
          name={HOME_ROUTES.MY_ACCOUNT_TRANSFER}
          component={MyAccountTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.BANK_TRANSFER}
          component={BankTansfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.INTERNATIONAL_TRANSFER}
          component={InternationalTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={HOME_ROUTES.ACCOUNT_DETAIL}
          component={AccountDetail}
          options={{ headerShown: false }}
        />
        
    </Stack.Navigator>
  );
};


function RenderTab({ focus, txt, img, sty }: { focus: any, txt: any, img: any, sty?: any }) {
  return (
    <View
      style={[styles.tabCont, sty]}>
      <View style={[styles.iconBack, { backgroundColor: focus ? THEME.primary : undefined }]} >
        <Image
          source={img}
          tintColor={focus ? THEME.textPrimary : THEME.white}
          style={[styles.imgTab, {}]}
          resizeMode="contain"
        />
      <Text style={[styles.tabTxt, { color: focus ? THEME.textPrimary : THEME.white }]} >
        {txt}
      </Text>
      </View>
    </View>
  )
}


export const TabStack: React.FC = ({ }) => {

  return (
    <Tab.Navigator
      initialRouteName={"HomeStack"}
      screenOptions={{
        tabBarStyle: {
          height: scale(65),
          // width: screenHeight >= 926 && isIphoneX() ? '95%' : '95%',
          // paddingBottom: 0,
          // alignSelf: 'center',
          backgroundColor: THEME.darkSecondary,
          // bottom: 5.2,
          // marginBottom: 0,
          // alignItems: 'center',
          // elevation: 0,
          // position: 'absolute',
          // borderTopColor: 'rgba(255, 255, 255, 0.3)',
          // borderTopWidth: 1
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        tabBarHideOnKeyboard: true,

        // tabBarLabelStyle: {
        //   textTransform: 'uppercase',
        //   marginTop: 0,
        //   top: -15,
        // },
        tabBarShowLabel: false,
        // tabBarStyle: { display: 'none' },
      }}>

             <Tab.Screen
        key={'AccountStack'}
        name={'AccountStack'}
        component={AccountStack}
        options={{
          tabBarLabel: 'HomeStack',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <RenderTab focus={focused} txt="Account" img={Images.accountTab} />
            )
          }
        }}
      />
      <Tab.Screen
        key={'PaymentStack'}
        name={'PaymentStack'}
        component={PaymentStack}
        options={{
          tabBarLabel: 'PaymentStack',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <RenderTab focus={focused} txt="Payment" img={Images.paymentTab} />
            )
          }
        }}
      />

      <Tab.Screen
        key={'HomeStack'}
        name={'HomeStack'}
        component={HomeStack}
        options={{
          tabBarLabel: 'HomeStack',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <RenderTab focus={focused} txt="Home" img={Images.homeTab} sty={{ borderTopLeftRadius: 0 }} />
            )
          }
        }}
      />

 
      <Tab.Screen
        key={'CardStack'}
        name={'CardStack'}
        component={CardStack}
        options={{
          tabBarLabel: 'CardStack',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <RenderTab focus={focused} txt="Card" img={Images.cardTab} />
            )
          }
        }}
      />

      <Tab.Screen
        key={'MoreStack'}
        name={'MoreStack'}
        component={MoreStack}
        options={{
          tabBarLabel: 'MoreStack',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <RenderTab focus={focused} txt="More" img={Images.settingTab} sty={{ borderTopRightRadius: 0, }} />
            )
          }
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create<any>({
  tabTxt:
  {
    fontFamily: FONTFAMILY.Regular, fontSize: FONT_SIZES.nine, marginTop: 4
  },
  imgTab:
  {
    width: scale(24),
    height: scale(24),
  },
  iconBack:
    { paddingHorizontal: 12,     paddingVertical: 10,justifyContent: 'center', alignItems: "center", borderRadius: 16 },
  tabCont:
  {
    width: METRICS.width / 5-10,
    // height: scale(50),
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: THEME.medRed,
    top: scale(5),

  }


});