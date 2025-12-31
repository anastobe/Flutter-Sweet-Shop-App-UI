import { 
    getNotifications,
    AccFreeze,
    AccDelete,
    paymentHistry,
    fetchLinkedAccCards,
    getDashboardData,
    getAccountsAndAssets
    
} from './account/account.service';

import {
    userLogin,
    ResetPasswordLink,
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
    getFxQuote,
    DeleteBeneficiary,
    AddnewBeneficiaryApi,
    changePassword,
    getCoutry,
    getCurrency,
    getAssetType,
    
    
} from './more/more.service';

const apis = {
  ResetPasswordLink,
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
  getFxQuote,
  DeleteBeneficiary,
  AddnewBeneficiaryApi,
  changePassword,
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
  fetchLinkedAccCards,
  updateUsageRules,
  getCardsUsageRules,
  getSucureCard
  
  };
  
  export default apis;