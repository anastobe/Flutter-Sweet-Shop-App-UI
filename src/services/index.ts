import { 
    getNotifications,
    AccFreeze,
    AccDelete,
    paymentHistry,
    fetchLinkedAccCards,
    getDashboardData,
    getAccountsAndAssets,
    getTransactionAttachement
    
} from './account/account.service';

import {
    userLogin,
    LogoutApi,
    ResetPasswordLink,
    createCard,
    cardUsedStatus,
    getCards,
    freezUnFreezCard,
    uploadFile


} from './auth/auth.service';

import {
    usePaymentTransfer,
    useFXConversion,
    useMyAccount_InternationalTransfer

} from './payment/payment.service';


import {
    freezUnFreezCardNoMessage,
    changeCardStatus,
    useReplaceCard,
    CardpaymentHistry,
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
    getPendingRequest,
    getFxQuote,
    DeleteBeneficiary,
    AddnewBeneficiaryApi,
    UpdateContactAddress,
    changePassword,
    resetPassword,
    getCoutry,
    getCurrency,
    getAssetType,
    
    
} from './more/more.service';

const apis = {
  ResetPasswordLink,
  userLogin,
  LogoutApi,
  usePaymentTransfer,
  useFXConversion,
  useMyAccount_InternationalTransfer,
  createCard,
  uploadFile,
  cardUsedStatus,
  getCards,
  freezUnFreezCard,
  useReplaceCard,
  CardpaymentHistry,
  getUserDetail,
  getBeneficiaryDetail,
  getPendingRequest,
  getFxQuote,
  DeleteBeneficiary,
  AddnewBeneficiaryApi,
  UpdateContactAddress,
  changePassword,
  resetPassword,
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
  changeCardStatus,
  AccFreeze,
  AccDelete,
  paymentHistry,
  fetchLinkedAccCards,
  updateUsageRules,
  getCardsUsageRules,
  getSucureCard,
  getTransactionAttachement
  
  };
  
  export default apis;