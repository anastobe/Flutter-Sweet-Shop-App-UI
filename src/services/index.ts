import { 
    getNotifications,
    AccFreeze,
    AccDelete,
    paymentHistry,
    getDashboardData,
    getAccountsAndAssets
    
} from './account/account.service';

import {
    userLogin,
    createCard,
    cardUsedStatus,
    getCards,
    freezUnFreezCard,
    


} from './auth/auth.service';

import {
    usePaymentTransfer,
    useFXConversion,
    useMyAccount_InternationalTransfer

} from './payment/payment.service';


import {
    freezUnFreezCardNoMessage,
    useReplaceCard,
    setSpendLimit,
    setPinSecurity,
    updateUsageRules,
    getCardsUsageRules,
    getSucureCard


} from './card/card.service';

import { 
    getUserDetail,
    getCurrencyAccount,
    useaddAsset

} from './home/home.service';

import { 
    getBeneficiaryDetail,
    DeleteBeneficiary,
    AddnewBeneficiaryApi,
    getCoutry,
    getCurrency,
    getAssetType,
    
    
} from './more/more.service';

const apis = {
  userLogin,
  usePaymentTransfer,
  useFXConversion,
  useMyAccount_InternationalTransfer,
  createCard,
  cardUsedStatus,
  getCards,
  freezUnFreezCard,
  useReplaceCard,
  getUserDetail,
  getBeneficiaryDetail,
  DeleteBeneficiary,
  AddnewBeneficiaryApi,
  getCoutry,
  getCurrency,
  getAssetType,
  getCurrencyAccount,
  getNotifications,
  useaddAsset,
  getDashboardData,
  getAccountsAndAssets,
  setSpendLimit,
  setPinSecurity,
  freezUnFreezCardNoMessage,
  AccFreeze,
  AccDelete,
  paymentHistry,
  updateUsageRules,
  getCardsUsageRules,
  getSucureCard
  
  };
  
  export default apis;