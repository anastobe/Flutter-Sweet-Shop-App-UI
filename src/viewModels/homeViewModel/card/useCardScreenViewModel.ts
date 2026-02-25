// // src/viewModels/homeViewModel/card/useCardScreenViewModel.ts
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { Alert, FlatList } from 'react-native';
// import {
//   createCard,
//   freezUnFreezCard,
//   getCards,
// } from '../../../queries/auth.query';
// import {
//   CardpaymentHistry,
//   getCardsUsageRules,
//   getPublicKey,
//   getSucureCard,
//   updateUsageRules,
// } from '../../../queries/card.Queries/card.query';
// import { Images } from '../../../config';
// import { HOME_ROUTES } from '../../../constants';
// import { StatusBar } from 'react-native';
// import { THEME } from '../../../styles';
// import { Toast } from '../../../utils';
// import { ACCOUNT_HISTRY_VALIDATION, CARD_STATUS } from '../../../utils/data';
// import Clipboard from '@react-native-clipboard/clipboard';
// import { decode as atob } from "base-64";
// import { Buffer } from "buffer";
// import RNSimpleCrypto from "react-native-simple-crypto";
// import { AES, utils } from "react-native-simple-crypto";
// import { storeSelectedAccountWholeApp } from '../../../Redux/Action/Home/HomeActions';
// // import { getRandomValues } from 'crypto';
// import 'react-native-get-random-values';
// import CryptoJS from 'react-native-crypto-js';
// import RSA from 'react-native-rsa-native';
// import { log } from 'console';
// import { text } from 'stream/consumers';
// import apis from '../../../services';
// export const useCardScreenViewModel = () => {

//   const { AES, utils } = RNSimpleCrypto;

//   const dispatch = useDispatch();
//   const navigation = useNavigation()
//   const selectAccountRef = useRef<any>(null);
//   const cardListRef = useRef<FlatList>(null);

//   const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
//   const refreshCall = useSelector((state: any) => state?.HomeReducer?.refreshCall)
//   //below allAccounts data must save in application opening
//   const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)
//   const selectedAccount_WholeApp = useSelector((state: any) => state?.HomeReducer?.selectedAccount_WholeApp)

//   console.log("AES module", RNSimpleCrypto,"==",AES); 

//   // UI toggles
//   const [getCardsData, setgetCardsData] = useState([]);
//   const [atmSwitch, setAtmSwitch] = useState(true);
//   const [onlineSwitch, setOnlineSwitch] = useState(false);
//   const [chipSwitch, setChipSwitch] = useState(true);
//   const [walletSwitch, setWalletSwitch] = useState(false);
  
//   // modal / bottom sheet state
//   // const [currentAccount, setcurrentAccount] = useState<any | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [saveCureentDisplayData, setsaveCureentDisplayData] = useState<any>({});
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeModal, setActiveModal] = useState<keyof typeof MODAL_CONFIG | null>(null);
//   const [transactions, setTransactions] = useState<any[]>([]);
//   // const [modalVisible, setModalVisible] = useState(false);
//   // const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);
//   // const [modalVisibleActive, setmodalVisibleActive] = useState(false);


//   // refs for bottom sheets (exposed so View can attach)
//   const AddCardRef = useRef<any>(null);
//   const cardDetailRef = useRef<any>(null);
//   const methodsRef = useRef<any>(null);
//   const manageRef = useRef<any>(null);
//   const [showvalidThru, setshowvalidThru] = useState(false);
//   const [showccvv, setshowccvv] = useState(false);

//   const currentItem = getCardsData[currentIndex];

// const { mutate: CardpaymentHistryFunc, isPending: isPendingpaymentCardHistry } =

// // paymentHistry

//   CardpaymentHistry
//   ({
//     callback: (response: any) => {
//       if (response?.success) {
//         const newData = response?.results?.values || [];

//         setTransactions(newData);

//         // if (newData.length < LIMIT) {
//         //   setHasMore(false);
//         // }

//         // setIsLoadingMore(false);
//       }
//     },
//   });
  

//   // queries / mutations (hooks you already used)
//   const { mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard } =
//     freezUnFreezCard({
//       callback: (response: any) => {
//         refetchgetCardsData(selectedAccount_WholeApp?.id);
//         setActiveModal(false);
//         // setModalVisible(false);
//         // setmodalVisibleUnfreez(false);
//         // setmodalVisibleActive(false)
//       },
//     });

//   const { mutate: updateUsageRulesFunc, isPending: isPendingupdateUsageRules } =
//     updateUsageRules({
//       callback: (response: any) => {
//         // refetchgetCardsData();
//         setActiveModal(false);
//         // setModalVisible(false);
//         // setmodalVisibleUnfreez(false);
//         // setmodalVisibleActive(false)
//       },
//     });

    
//   const { mutate: getCardsFunc, isPending } = getCards({
//       callback: (response: any) => {
//         if (response?.success) {
//           const newData = response?.results?.values || [];
//           // console.log("getCardsFunc==>",newData);          
//           setgetCardsData(newData);
//         }
//       }, 
//     });

    
//     const {
//       data: getCardsUsageRulesData,
//       refetch: refetchgetCardsUsageRules,
//       isFetching: isPendingGetCardsUsageRules,
//     } = getCardsUsageRules({
//     enabled: false,
//     dispatch,
//     card_id: currentItem?.card_id,
//   });

//   // const {
//   //   data: getPublicKeyData,
//   //   refetch: refetchgetPublicKey,
//   //   isFetching: isPendinggetPublicKey,
//   // } = getPublicKey({
//   //   enabled: false,
//   //   dispatch
//   // });
  
//   // console.log("getPublicKeyData===>",getPublicKeyData?.results?.key);
  
//   const {
//     data: getSucureCardData,
//     refetch: refetchgetSucureCard,
//     isFetching: isPendinggetSucureCard,
//   } = getSucureCard({
//     enabled: false,
//     dispatch,
//     card_id: currentItem?.card_id,
//   });
  
  
//   useEffect(() => {
//     if (getCardsUsageRulesData?.success) {
//       const rule = findRule(getCardsUsageRulesData?.results?.usages, 'allow_atm_withdrawal');
//       const rule2 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_ecomm');
//       const rule3 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_offline_pin');
//       const rule4 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_international_transactions');
      
//       // console.log("rule=>1234",rule?.enabled,rule2?.enabled,rule3?.enabled,rule4?.enabled);
      
//       setAtmSwitch((rule?.enabled));
//       setOnlineSwitch(rule2?.enabled);
//       setChipSwitch(rule3?.enabled);
//       setWalletSwitch(rule4?.enabled);
//     }
//   }, [getCardsUsageRulesData]);
  


//   const fetchTransactions = (ID: any) => {
//   if (!ID) return;
//     const payloadWithParams = {
//       card_id: ID,
//       payload: {
//         page: 1,
//         limit: 20,
//         // search,
//         sort: {
//           key: 'created_at',
//           order: 'desc',
//         }
//       }
//     };

//   CardpaymentHistryFunc(payloadWithParams);
// };

//   useEffect(() => {
//     if (selectedAccount_WholeApp?.id) {
//       refetchgetCardsData(selectedAccount_WholeApp?.id);
//     }

//     //move index to 0 and scroll to index 0 when account change in whole app

//     setCurrentIndex(0)

//     if (getCardsData?.length) {
//       setTimeout(() => {
//         cardListRef?.current?.scrollToIndex({
//           index: 0,
//           animated: false,
//         });
//       }, 50);
//     }
  
//   }, [
//     // refreshCall
//     selectedAccount_WholeApp?.id
//   ]);

// //   const saveDatainState = (data: any[] = []) => {

// //     const accounts = data ? data : [];

// //     if (!accounts.length) return;
// //     dispatch(storeSelectedAccountWholeApp(accounts?.[0]))

// //     // setcurrentAccount((prev: any) =>
// //     //   prev?.id === accounts[0]?.id ? prev : accounts[0]
// //     // );
// //   };

// // //this below useeffect save first asset and all accounts and assets
// //   useEffect(() => {
// //     if (allAccounts?.length) {
// //       saveDatainState(allAccounts)
// //     }
// //   }, [allAccounts]);

//   useEffect(() => {
//     if (!currentItem?.card_id) return;
    
//     if (currentItem?.card_id) {
//       fetchTransactions(currentItem?.card_id)
//     }
//   }, [currentItem?.card_id]);

  

//   const MODAL_CONFIG = {
//   freeze: {
//     title: 'Freeze this card?',
//     body: 'Freezing will temporarily disable all transactions from this card.',
//     subBody:
//       'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.',
//     confirmText: 'Freeze Card',
//     iconName: 'snow-outline',
//     action: () => freezCardApi('freeze'),
//   },

//   unfreeze: {
//     title: 'Card is frozen',
//     body:
//       'Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending.',
//     confirmText: 'Unfreeze Card',
//     iconName: 'snow-outline',
//     action: () => freezCardApi('active'),
//   },

//   inactive: {
//     title: 'Card is inactive',
//     body:
//       'Your card is currently inactive for security reasons. Tap below to active it and resume spending.',
//     confirmText: 'Active Card',
//     iconName: 'alert-outline',
//     action: () => freezCardApi('active'),
//   },

//   atm: {
//     body: 'Kindly visit your nearest ATM',
//     confirmText: 'Ok',
//     iconName: 'alert-outline',
//     action: () => setActiveModal(false),
//   },
// };


//   function refetchgetCardsData(ID: any) {
//     console.log("check==>",ID);
    
//     let payload = {
//       page: 1,
//       limit: 20,
//       account_id: ID
//     }
//     getCardsFunc(payload)    
//   }

//   // Viewability config and handler
//   const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index ?? 0);
//     }
//   }).current;

//   const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

//   const findRule = (rulesArray: any[] = [], ruleName: string) => {
//     return rulesArray?.find((item: any) => item.name === ruleName);
//   };

//   const onRefresh = () => {
    
//     console.log("refresh trigger");
    
//     setRefreshing(true);
//     // call refetch if needed
//     refetchgetCardsData(selectedAccount_WholeApp?.id);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1200);
//   };


//   function openFreezCard() {
//     if (currentItem?.card_status == 'active')  {
//       // setModalVisible(true);
//       setActiveModal('freeze');
//     }
//     else if (currentItem?.card_status == 'freeze')  {
//       // setmodalVisibleUnfreez(true);
//       setActiveModal('unfreeze');
//     }
//     else if (currentItem?.card_status == 'inactive')  {
//       // setmodalVisibleActive(true);
//       setActiveModal('inactive');
//     }
//   }


// // const generateRandomCipher = () => {
// //   const array = new Uint8Array(24) // 24 bytes for AES-192
// //   getRandomValues(array)
// //   return Buffer.from(array).toString('base64').slice(0, 24)
// // }

// // const generateEncryptedCipher = async (publicKey: string) => {

// //   const rawCipherKey = generateRandomCipher()

// //   const encryptedCipher = await RSA.encrypt(
// //     rawCipherKey,
// //     publicKey
// //   )

// //   console.log("check===>",rawCipherKey,"ss",encryptedCipher)

// //   return {
// //     rawCipherKey,        // ye tum local store karo (decrypt ke liye)
// //     encryptedCipher      // ye backend ko bhejna hai
// //   }
// // }


// const generateRawCipherKey = () => { 
//   const random = CryptoJS.lib.WordArray.random(18);
//   return CryptoJS.enc.Base64.stringify(random).slice(0, 24);
// };

// const utf8ToArrayBuffer = (text: string) => {
//   return new TextEncoder().encode(text).buffer;
// };

// const arrayBufferToUtf8 = (buffer: ArrayBuffer) => {
//   return new TextDecoder().decode(new Uint8Array(buffer));
// };

// const normalizeBase64 = (s: string) =>
//   s.replace(/\s+/g, "").replace(/\\n/g, "").trim();

// const base64ToArrayBuffer = (base64: string) => {
//   const binary = atob(base64.replace(/\s+/g, ''));
//   const bytes = new Uint8Array(binary.length);
//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }
//   return bytes.buffer;
// };

// const decryptField = async (base64Value: string, rawCipherKey: string) => {
//   try {
//     if (!base64Value || !rawCipherKey) return null;

//     // Convert base64 -> ArrayBuffer
//     const rawBytes = new Uint8Array(base64ToArrayBuffer(base64Value));

//     if (rawBytes.length <= 16) {
//       console.log('❌ Invalid encrypted payload (too short)');
//       return null;
//     }

//     // Extract IV (first 16 bytes) and ciphertext
//     const iv = rawBytes.slice(0, 16).buffer;
//     const ciphertext = rawBytes.slice(16).buffer;

//     // Convert key to ArrayBuffer
//     const keyBuffer = utils.convertUtf8ToArrayBuffer(rawCipherKey);

//     if (![16, 24, 32].includes(keyBuffer.byteLength)) {
//       throw new Error(`AES key must be 16, 24, or 32 bytes (current: ${keyBuffer.byteLength})`);
//     }

//     // Decrypt
//     const decryptedBuffer = await AES.decrypt(ciphertext, keyBuffer, iv);
//     return utils.convertArrayBufferToUtf8(decryptedBuffer);
//   } catch (e: any) {
//     console.log('Decrypt error:', e.message || e);
//     return null;
//   }
// };

// async function getSucureCardDetail(encryptedCipher: string, rawCipherKey: string, ID: string) {
//   const payload = { 
//     card_id: ID, 
//     encrypted_cipher: encryptedCipher
//   };

//   const SECURE_RESULT = await apis.getSucureCardEncrypted(payload);

//   // const decryptedCVV = await decryptField(SECURE_RESULT?.cvv, rawCipherKey);
//   // const decryptedPan = await decryptField(SECURE_RESULT?.pan, rawCipherKey);
//   // const decryptedExpiry = await decryptField(SECURE_RESULT?.expiry_date, rawCipherKey);

//   const decryptedCVV = await decryptField(normalizeBase64(SECURE_RESULT?.cvv), rawCipherKey);
//   const decryptedPan = await decryptField(normalizeBase64(SECURE_RESULT?.pan), rawCipherKey);
//   const decryptedExpiry = await decryptField(normalizeBase64(SECURE_RESULT?.expiry_date), rawCipherKey);


//   console.log(SECURE_RESULT,"CVV =>", decryptedCVV);
//   console.log("PAN =>", decryptedPan);
//   console.log("EXP =>", decryptedExpiry);
// }

// const encryptCipherWithPublicKey = async (publicKey: string, card_id: string) => {
//   const pemKey = `-----BEGIN PUBLIC KEY-----\n${publicKey.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;

//   const rawCipherKey = generateRawCipherKey();

//   const encryptedCipher = await RSA.encrypt(rawCipherKey, pemKey);

//   await getSucureCardDetail(encryptedCipher, rawCipherKey, card_id);
  
//   return { rawCipherKey, encryptedCipher };
// };


//   async function onPressCard(item: any) {
    

//     // let tt  = decryptField("0egtAmN69MQFMh89WExETESosg==", "MW3MinWGg39qY/AhS8ccMHdo")
//     // console.log("tt=>",item);

//     setsaveCureentDisplayData(item);
    
//     let PublicKey = await apis.getPublicKey()

//     if (PublicKey?.results?.key) {
//       encryptCipherWithPublicKey(PublicKey?.results?.key,item?.card_id)      
//     }
    

// // const decryptedCardNumber = decryptField(
// //   "dGs7Ygq4lDQY/XJj6yDLbESGjg==",
// //   "mRc6m/bkD2Z1gpmiZ/qwrM8V"
// // );

// // console.log("Decrypted Card:", decryptedCardNumber);

//     // refetchgetSucureCard()
//     cardDetailRef?.current?.open();
//   }

//   function onPressfeature(item: any, navigation: any) {
//     if (!currentItem) return;
//     if (item.text == CARD_STATUS.Freeze_Card || item.text == CARD_STATUS.Unfreeze_Card || item.text ==  CARD_STATUS.Active_Card) {
//       openFreezCard();
//     } else if (item.text == 'Replace Card') {
      
//       if (currentItem?.card_status == "inactive") {
//         Toast.showToast("Please active your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "freeze") {
//         Toast.showToast("Please unfreeze your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "active") {
//         navigation.navigate('REPLACE_CARD' as any, { cardDetail: currentItem });
//       }

//     } else if (item.text == 'Methods') {
     
//       if (isPendingupdateUsageRules) {
//         Toast.showToast("Payments methods is loading", '', 'error')
//       }
//       else if (currentItem?.card_status == "inactive") {
//         Toast.showToast("Please active your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "freeze") {
//         Toast.showToast("Please unfreeze your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "active") {
//         methodsRef?.current?.open();
//         refetchgetCardsUsageRules();
//       }

//     } else if (item.text == 'Manage') {

//       if (currentItem?.card_status == "inactive") {
//         Toast.showToast("Please active your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "freeze") {
//         Toast.showToast("Please unfreeze your card", '', 'error')
//       }
//       else if (currentItem?.card_status == "active") {
//         manageRef?.current?.open();
//       }
//     }
//   }

//   // function renderCardFeature() {
//   //   return [
//   //     { icon: Images.freeze, text: currentItem?.card_status == 'freeze' || currentItem?.card_status == 'inactive' ? 'Unfreeze Card' : 'Freeze Card', width: 22, height: 22 },
//   //     { icon: Images.replace, text: 'Replace Card', width: 22, height: 22 },
//   //     { icon: Images.methods, text: 'Methods', width: 22, height: 22 },
//   //     { icon: Images.manage, text: 'Manage', width: 22, height: 22 },
//   //   ];
//   // }

//   const getCardActionText = (cardStatus?: string) => {
//   switch (cardStatus) {
//     case 'inactive':
//       return CARD_STATUS.Active_Card;

//     case 'active':
//       return CARD_STATUS.Freeze_Card;

//     case 'freeze':
//       return CARD_STATUS.Unfreeze_Card;

//     default:
//       return '';
//   }
// };

//   function renderCardFeaturePhysical() {
//     return [
//       { icon: Images.freeze, text: getCardActionText(currentItem?.card_status), width: 21, height: 21 },
//       { icon: Images.replace, text: 'Replace Card', width: 21, height: 21 },
//       { icon: Images.methods, text: 'Methods', width: 21, height: 21 },
//       { icon: Images.manage, text: 'Manage', width: 21, height: 21 },
//     ];
//   }

//   function renderCardFeatureVirtual() {
//     return [
//       { icon: Images.freeze, text: getCardActionText(currentItem?.card_status), width: 21, height: 21 },
//       { icon: Images.methods, text: 'Methods', width: 21, height: 21 },
//       { icon: Images.manage, text: 'Manage', width: 21, height: 21 },
//     ];
//   }

//   function HandleOnPress(option: any, navigation: any) {
//     AddCardRef?.current?.close();
//     setTimeout(() => {
//       if (option == '1') navigation.navigate('CREATE_VC' as any);
//       else navigation.navigate('CREATE_PC' as any);
//     }, 500);
//   }

//   const handleNavigateTransactionHistory = () => {
//   // console.log("handleNavigateTransactionHistory");
//   // return
//     if (currentItem?.card_id != "") {
//       navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY,{assetId: currentItem?.card_id, show: ACCOUNT_HISTRY_VALIDATION.COMPLETE})
//     }
//   };


//   const handleNavigateTransaction = (item: any) => {
//     console.log("handleNavigateTransaction",item);
//     // return

//     if (item) {
//       navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item, showAttachement: false  });
//     }
//   };
  

//   async function HandleOnPressCardDetail(id: any, data: any) {

//     if (id == '1') {
//       let makeString = `Card Number: ${data?.pan}`
//         Clipboard.setString(makeString);
//         Alert.alert('Copied', 'Card number copied to clipboard');
//     }
//     else if (id == '2') {
//       setshowvalidThru(!showvalidThru)
//     }
//     else if (id == '3') {
//       setshowccvv(!showccvv)
//     }
//   }

//   function freezCardApi(status: any) {
//     const payload = {
//       card_id: currentItem?.card_id,
//       status: `${status}`,
//       note: `Card confirmed ${status}`,
//     };
//     freezUnFreezCardFunc(payload);
//   }

//   function onPressOption(id: any) {
//     manageRef?.current?.close();
//     setTimeout(() => {
//       if (id == 1) {
//         if (currentItem?.format == 'physical') {
//           // setopen(true);
//           setActiveModal('atm');
//         }
//         // else if (currentItem?.format == 'virtual') {
//         //   navigation.navigate(HOME_ROUTES.PIN_SECURITY, { cardDetail: currentItem })    
//         // }


//       } else if (id == 2) {  
//         navigation.navigate(HOME_ROUTES.SET_LIMIT, { cardDetail: currentItem, getCardsData: getCardsData })    
//       }
//     }, 1000);
//   }
  
// function updateToSecure() {
//   setshowvalidThru(false)
//   setshowccvv(false)
// }

//   function updateCardStatuses() {
//     const payload = {
//       card_id: currentItem?.card_id,
//       usage: [
//       { 
//         name: 'allow_atm_withdrawal', 
//         enabled: atmSwitch 
//       },
//       {
//         name: "allow_ecomm",
//         enabled: onlineSwitch
//       },
//       {
//         name: "allow_offline_pin",
//         enabled: chipSwitch
//       },
//       {
//         name: "allow_international_transactions",
//         enabled: walletSwitch
//       }
//         ],
//     };
//     console.log("payload==>",payload);    
//     updateUsageRulesFunc(payload);
//   }
  
// function selectAccount(account: any) {

//   console.log("account selection is close");
//   return

//   selectAccountRef.current?.close();
//   // setcurrentAccount(account);

//   dispatch(storeSelectedAccountWholeApp(account))

//   setCurrentIndex(0)

//   if (getCardsData?.length) {
//     setTimeout(() => {
//       cardListRef?.current?.scrollToIndex({
//         index: 0,
//         animated: false,
//       });
//     }, 50);
//   }

// }



//   return {
//     // state
//     atmSwitch,
//     onlineSwitch,
//     chipSwitch,
//     walletSwitch,
//     // open,
//     currentIndex,
//     saveCureentDisplayData,
//     refreshing,
//     // modalVisible,
//     // modalVisibleUnfreez,
//     // refs
//     AddCardRef,
//     cardDetailRef,
//     methodsRef,
//     manageRef,
//     // data/flags
//     getCardsData,
//     isPending,
//     getCardsUsageRulesData,
//     getSucureCardData,
//     isPendingGetCardsUsageRules,
//     isPendinggetSucureCard,
//     isPendingfreezUnFreezCard,
//     // handlers
//     setAtmSwitch,
//     setOnlineSwitch,
//     setChipSwitch,
//     setWalletSwitch,
//     // setopen,
//     setCurrentIndex,
//     setsaveCureentDisplayData,
//     // setModalVisible,
//     // setmodalVisibleUnfreez,
//     setRefreshing,
//     freezCardApi,
//     onPressCard,
//     onPressfeature,
//     renderCardFeaturePhysical,
//     renderCardFeatureVirtual,
//     TransactionListProps: {
//       onRefresh,
//     },
//     SlidingCardsProps: {
//       onViewableItemsChanged,
//       viewabilityConfig,
//     },
//     HandleOnPress,
//     HandleOnPressCardDetail,
//     onPressOption,
//     updateUsageRulesFunc,
//     currentItem,
//     updateCardStatuses,
//     // modalVisibleActive, 
//     // setmodalVisibleActive,
//     MODAL_CONFIG,
//     activeModal, 
//     setActiveModal,
//     transactions,
//     isPendingpaymentCardHistry,
//     handleNavigateTransactionHistory,
//     handleNavigateTransaction,
//     onRefresh,
//     // currentAccount,
//     selectedAccount_WholeApp,
//     selectAccount,
//     selectAccountRef,
//     allAccounts,
//     cardListRef,
//     updateToSecure,
//     showvalidThru,
//     setshowvalidThru,
//     showccvv, 
//     setshowccvv,
//     loginUserData

//     // refetchgetCardsData,
//   };
// };





// src/viewModels/homeViewModel/card/useCardScreenViewModel.ts
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import {
  createCard,
  freezUnFreezCard,
  getCards,
} from '../../../queries/auth.query';
import {
  CardpaymentHistry,
  getCardsUsageRules,
  getSucureCard,
  updateUsageRules,
} from '../../../queries/card.Queries/card.query';
import { Images } from '../../../config';
import { HOME_ROUTES } from '../../../constants';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import { Toast } from '../../../utils';
import { ACCOUNT_HISTRY_VALIDATION, CARD_STATUS } from '../../../utils/data';
import Clipboard from '@react-native-clipboard/clipboard';
import { storeSelectedAccountWholeApp } from '../../../Redux/Action/Home/HomeActions';
export const useCardScreenViewModel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const selectAccountRef = useRef<any>(null);
  const cardListRef = useRef<FlatList>(null);

  const loginUserData = useSelector((state: any) => state?.HomeReducer?.loginUserData);
  const refreshCall = useSelector((state: any) => state?.HomeReducer?.refreshCall)
  //below allAccounts data must save in application opening
  const allAccounts = useSelector((state: any) => state?.HomeReducer?.allAccounts)
  const selectedAccount_WholeApp = useSelector((state: any) => state?.HomeReducer?.selectedAccount_WholeApp)

  // UI toggles
  const [getCardsData, setgetCardsData] = useState([]);
  const [atmSwitch, setAtmSwitch] = useState(true);
  const [onlineSwitch, setOnlineSwitch] = useState(false);
  const [chipSwitch, setChipSwitch] = useState(true);
  const [walletSwitch, setWalletSwitch] = useState(false);
  
  // modal / bottom sheet state
  // const [currentAccount, setcurrentAccount] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saveCureentDisplayData, setsaveCureentDisplayData] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);
  const [activeModal, setActiveModal] = useState<keyof typeof MODAL_CONFIG | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);
  // const [modalVisibleActive, setmodalVisibleActive] = useState(false);


  // refs for bottom sheets (exposed so View can attach)
  const AddCardRef = useRef<any>(null);
  const cardDetailRef = useRef<any>(null);
  const methodsRef = useRef<any>(null);
  const manageRef = useRef<any>(null);
  const [showvalidThru, setshowvalidThru] = useState(false);
  const [showccvv, setshowccvv] = useState(false);

  const currentItem = getCardsData[currentIndex];

const { mutate: CardpaymentHistryFunc, isPending: isPendingpaymentCardHistry } =

// paymentHistry

  CardpaymentHistry
  ({
    callback: (response: any) => {
      if (response?.success) {
        const newData = response?.results?.values || [];

        setTransactions(newData);

        // if (newData.length < LIMIT) {
        //   setHasMore(false);
        // }

        // setIsLoadingMore(false);
      }
    },
  });
  

  // queries / mutations (hooks you already used)
  const { mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard } =
    freezUnFreezCard({
      callback: (response: any) => {
        refetchgetCardsData(selectedAccount_WholeApp?.id);
        setActiveModal(false);
        // setModalVisible(false);
        // setmodalVisibleUnfreez(false);
        // setmodalVisibleActive(false)
      },
    });

  const { mutate: updateUsageRulesFunc, isPending: isPendingupdateUsageRules } =
    updateUsageRules({
      callback: (response: any) => {
        // refetchgetCardsData();
        setActiveModal(false);
        // setModalVisible(false);
        // setmodalVisibleUnfreez(false);
        // setmodalVisibleActive(false)
      },
    });

    
  const { mutate: getCardsFunc, isPending } = getCards({
      callback: (response: any) => {
        if (response?.success) {
          const newData = response?.results?.values || [];
          // console.log("getCardsFunc==>",newData);          
          setgetCardsData(newData);
        }
      }, 
    });

    
    const {
      data: getCardsUsageRulesData,
      refetch: refetchgetCardsUsageRules,
      isFetching: isPendingGetCardsUsageRules,
    } = getCardsUsageRules({
    enabled: false,
    dispatch,
    card_id: currentItem?.card_id,
  });

  const {
    data: getSucureCardData,
    refetch: refetchgetSucureCard,
    isFetching: isPendinggetSucureCard,
  } = getSucureCard({
    enabled: false,
    dispatch,
    card_id: currentItem?.card_id,
  });
  
  
  useEffect(() => {
    if (getCardsUsageRulesData?.success) {
      const rule = findRule(getCardsUsageRulesData?.results?.usages, 'allow_atm_withdrawal');
      const rule2 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_ecomm');
      const rule3 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_offline_pin');
      const rule4 = findRule(getCardsUsageRulesData?.results?.usages, 'allow_international_transactions');
      
      // console.log("rule=>1234",rule?.enabled,rule2?.enabled,rule3?.enabled,rule4?.enabled);
      
      setAtmSwitch((rule?.enabled));
      setOnlineSwitch(rule2?.enabled);
      setChipSwitch(rule3?.enabled);
      setWalletSwitch(rule4?.enabled);
    }
  }, [getCardsUsageRulesData]);
  


  const fetchTransactions = (ID: any) => {
  if (!ID) return;
    const payloadWithParams = {
      card_id: ID,
      payload: {
        page: 1,
        limit: 20,
        // search,
        sort: {
          key: 'created_at',
          order: 'desc',
        }
      }
    };

  CardpaymentHistryFunc(payloadWithParams);
};

  useEffect(() => {
    if (selectedAccount_WholeApp?.id) {
      refetchgetCardsData(selectedAccount_WholeApp?.id);
    }

    //move index to 0 and scroll to index 0 when account change in whole app

    setCurrentIndex(0)

    if (getCardsData?.length) {
      setTimeout(() => {
        cardListRef?.current?.scrollToIndex({
          index: 0,
          animated: false,
        });
      }, 50);
    }
  
  }, [
    // refreshCall
    selectedAccount_WholeApp?.id
  ]);

//   const saveDatainState = (data: any[] = []) => {

//     const accounts = data ? data : [];

//     if (!accounts.length) return;
//     dispatch(storeSelectedAccountWholeApp(accounts?.[0]))

//     // setcurrentAccount((prev: any) =>
//     //   prev?.id === accounts[0]?.id ? prev : accounts[0]
//     // );
//   };

// //this below useeffect save first asset and all accounts and assets
//   useEffect(() => {
//     if (allAccounts?.length) {
//       saveDatainState(allAccounts)
//     }
//   }, [allAccounts]);

  useEffect(() => {
    if (!currentItem?.card_id) return;
    
    if (currentItem?.card_id) {
      fetchTransactions(currentItem?.card_id)
    }
  }, [currentItem?.card_id]);

  

  const MODAL_CONFIG = {
  freeze: {
    title: 'Freeze this card?',
    body: 'Freezing will temporarily disable all transactions from this card.',
    subBody:
      'The card can be unfrozen at any time. Existing subscriptions may still attempt charges.',
    confirmText: 'Freeze Card',
    iconName: 'snow-outline',
    action: () => freezCardApi('freeze'),
  },

  unfreeze: {
    title: 'Card is frozen',
    body:
      'Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending.',
    confirmText: 'Unfreeze Card',
    iconName: 'snow-outline',
    action: () => freezCardApi('active'),
  },

  inactive: {
    title: 'Card is inactive',
    body:
      'Your card is currently inactive for security reasons. Tap below to active it and resume spending.',
    confirmText: 'Active Card',
    iconName: 'alert-outline',
    action: () => freezCardApi('active'),
  },

  atm: {
    body: 'Kindly visit your nearest ATM',
    confirmText: 'Ok',
    iconName: 'alert-outline',
    action: () => setActiveModal(false),
  },
};


  function refetchgetCardsData(ID: any) {
    let payload = {
      page: 1,
      limit: 20,
      account_id: ID
    }
    getCardsFunc(payload)    
  }

  // Viewability config and handler
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const findRule = (rulesArray: any[] = [], ruleName: string) => {
    return rulesArray?.find((item: any) => item.name === ruleName);
  };

  const onRefresh = () => {
    
    console.log("refresh trigger");
    
    setRefreshing(true);
    // call refetch if needed
    refetchgetCardsData(selectedAccount_WholeApp?.id);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };


  function openFreezCard() {
    if (currentItem?.card_status == 'active')  {
      // setModalVisible(true);
      setActiveModal('freeze');
    }
    else if (currentItem?.card_status == 'freeze')  {
      // setmodalVisibleUnfreez(true);
      setActiveModal('unfreeze');
    }
    else if (currentItem?.card_status == 'inactive')  {
      // setmodalVisibleActive(true);
      setActiveModal('inactive');
    }
  }

  function onPressCard(item: any) {
    setsaveCureentDisplayData(item);
    refetchgetSucureCard()
    cardDetailRef?.current?.open();
  }

  function onPressfeature(item: any, navigation: any) {
    if (!currentItem) return;
    if (item.text == CARD_STATUS.Freeze_Card || item.text == CARD_STATUS.Unfreeze_Card || item.text ==  CARD_STATUS.Active_Card) {
      openFreezCard();
    } else if (item.text == 'Replace Card') {
      
      if (currentItem?.card_status == "inactive") {
        Toast.showToast("Please active your card", '', 'error')
      }
      else if (currentItem?.card_status == "freeze") {
        Toast.showToast("Please unfreeze your card", '', 'error')
      }
      else if (currentItem?.card_status == "active") {
        navigation.navigate('REPLACE_CARD' as any, { cardDetail: currentItem });
      }

    } else if (item.text == 'Methods') {
     
      if (isPendingupdateUsageRules) {
        Toast.showToast("Payments methods is loading", '', 'error')
      }
      else if (currentItem?.card_status == "inactive") {
        Toast.showToast("Please active your card", '', 'error')
      }
      else if (currentItem?.card_status == "freeze") {
        Toast.showToast("Please unfreeze your card", '', 'error')
      }
      else if (currentItem?.card_status == "active") {
        methodsRef?.current?.open();
        refetchgetCardsUsageRules();
      }

    } else if (item.text == 'Manage') {

      if (currentItem?.card_status == "inactive") {
        Toast.showToast("Please active your card", '', 'error')
      }
      else if (currentItem?.card_status == "freeze") {
        Toast.showToast("Please unfreeze your card", '', 'error')
      }
      else if (currentItem?.card_status == "active") {
        manageRef?.current?.open();
      }
    }
  }

  // function renderCardFeature() {
  //   return [
  //     { icon: Images.freeze, text: currentItem?.card_status == 'freeze' || currentItem?.card_status == 'inactive' ? 'Unfreeze Card' : 'Freeze Card', width: 22, height: 22 },
  //     { icon: Images.replace, text: 'Replace Card', width: 22, height: 22 },
  //     { icon: Images.methods, text: 'Methods', width: 22, height: 22 },
  //     { icon: Images.manage, text: 'Manage', width: 22, height: 22 },
  //   ];
  // }

  const getCardActionText = (cardStatus?: string) => {
  switch (cardStatus) {
    case 'inactive':
      return CARD_STATUS.Active_Card;

    case 'active':
      return CARD_STATUS.Freeze_Card;

    case 'freeze':
      return CARD_STATUS.Unfreeze_Card;

    default:
      return '';
  }
};

  function renderCardFeaturePhysical() {
    return [
      { icon: Images.freeze, text: getCardActionText(currentItem?.card_status), width: 21, height: 21 },
      { icon: Images.replace, text: 'Replace Card', width: 21, height: 21 },
      { icon: Images.methods, text: 'Methods', width: 21, height: 21 },
      { icon: Images.manage, text: 'Manage', width: 21, height: 21 },
    ];
  }

  function renderCardFeatureVirtual() {
    return [
      { icon: Images.freeze, text: getCardActionText(currentItem?.card_status), width: 21, height: 21 },
      { icon: Images.methods, text: 'Methods', width: 21, height: 21 },
      { icon: Images.manage, text: 'Manage', width: 21, height: 21 },
    ];
  }

  function HandleOnPress(option: any, navigation: any) {
    AddCardRef?.current?.close();
    setTimeout(() => {
      if (option == '1') navigation.navigate('CREATE_VC' as any);
      else navigation.navigate('CREATE_PC' as any);
    }, 500);
  }

  const handleNavigateTransactionHistory = () => {
  // console.log("handleNavigateTransactionHistory");
  // return
    if (currentItem?.card_id != "") {
      navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY,{assetId: currentItem?.card_id, show: ACCOUNT_HISTRY_VALIDATION.COMPLETE})
    }
  };


  const handleNavigateTransaction = (item: any) => {
    console.log("handleNavigateTransaction",item);
    // return

    if (item) {
      navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item, showAttachement: false  });
    }
  };
  

  async function HandleOnPressCardDetail(id: any, data: any) {

    if (id == '1') {
      let makeString = `Card Number: ${data?.pan}`
        Clipboard.setString(makeString);
        Alert.alert('Copied', 'Card number copied to clipboard');
    }
    else if (id == '2') {
      setshowvalidThru(!showvalidThru)
    }
    else if (id == '3') {
      setshowccvv(!showccvv)
    }
  }

  function freezCardApi(status: any) {
    const payload = {
      card_id: currentItem?.card_id,
      status: `${status}`,
      note: `Card confirmed ${status}`,
    };
    freezUnFreezCardFunc(payload);
  }

  function onPressOption(id: any) {
    manageRef?.current?.close();
    setTimeout(() => {
      if (id == 1) {
        if (currentItem?.format == 'physical') {
          // setopen(true);
          setActiveModal('atm');
        }
        // else if (currentItem?.format == 'virtual') {
        //   navigation.navigate(HOME_ROUTES.PIN_SECURITY, { cardDetail: currentItem })    
        // }


      } else if (id == 2) {  
        navigation.navigate(HOME_ROUTES.SET_LIMIT, { cardDetail: currentItem, getCardsData: getCardsData })    
      }
    }, 1000);
  }
  
function updateToSecure() {
  setshowvalidThru(false)
  setshowccvv(false)
}

  function updateCardStatuses() {
    const payload = {
      card_id: currentItem?.card_id,
      usage: [
      { 
        name: 'allow_atm_withdrawal', 
        enabled: atmSwitch 
      },
      {
        name: "allow_ecomm",
        enabled: onlineSwitch
      },
      {
        name: "allow_offline_pin",
        enabled: chipSwitch
      },
      {
        name: "allow_international_transactions",
        enabled: walletSwitch
      }
        ],
    };
    console.log("payload==>",payload);    
    updateUsageRulesFunc(payload);
  }
  
function selectAccount(account: any) {

  console.log("account selection is close");
  return

  selectAccountRef.current?.close();
  // setcurrentAccount(account);

  dispatch(storeSelectedAccountWholeApp(account))

  setCurrentIndex(0)

  if (getCardsData?.length) {
    setTimeout(() => {
      cardListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
    }, 50);
  }

}



  return {
    // state
    atmSwitch,
    onlineSwitch,
    chipSwitch,
    walletSwitch,
    // open,
    currentIndex,
    saveCureentDisplayData,
    refreshing,
    // modalVisible,
    // modalVisibleUnfreez,
    // refs
    AddCardRef,
    cardDetailRef,
    methodsRef,
    manageRef,
    // data/flags
    getCardsData,
    isPending,
    getCardsUsageRulesData,
    getSucureCardData,
    isPendingGetCardsUsageRules,
    isPendinggetSucureCard,
    isPendingfreezUnFreezCard,
    // handlers
    setAtmSwitch,
    setOnlineSwitch,
    setChipSwitch,
    setWalletSwitch,
    // setopen,
    setCurrentIndex,
    setsaveCureentDisplayData,
    // setModalVisible,
    // setmodalVisibleUnfreez,
    setRefreshing,
    freezCardApi,
    onPressCard,
    onPressfeature,
    renderCardFeaturePhysical,
    renderCardFeatureVirtual,
    TransactionListProps: {
      onRefresh,
    },
    SlidingCardsProps: {
      onViewableItemsChanged,
      viewabilityConfig,
    },
    HandleOnPress,
    HandleOnPressCardDetail,
    onPressOption,
    updateUsageRulesFunc,
    currentItem,
    updateCardStatuses,
    // modalVisibleActive, 
    // setmodalVisibleActive,
    MODAL_CONFIG,
    activeModal, 
    setActiveModal,
    transactions,
    isPendingpaymentCardHistry,
    handleNavigateTransactionHistory,
    handleNavigateTransaction,
    onRefresh,
    // currentAccount,
    selectedAccount_WholeApp,
    selectAccount,
    selectAccountRef,
    allAccounts,
    cardListRef,
    updateToSecure,
    showvalidThru,
    setshowvalidThru,
    showccvv, 
    setshowccvv,
    loginUserData

    // refetchgetCardsData,
  };
};

