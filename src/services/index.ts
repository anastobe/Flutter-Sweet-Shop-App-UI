import { 
    getNotifications,
    AccFreeze,
    AccDelete,
    paymentHistry,
    getMonthlyStatement,
    getMonthlyStatementUrl,
    fetchLinkedAccCards,
    getDashboardData,
    getAssetBalance,
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
    changeFxPaymentStatus,
    changeBankPaymentStatus,
    changeBeneficiaryStatus,
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
    getPendingBankPayment,
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
  getPendingBankPayment,
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
  getAssetBalance,
  getAccountsAndAssets,
  setSpendLimit,
  setPinSecurity,
  freezUnFreezCardNoMessage,
  changeCardStatus,
  changeFxPaymentStatus,
  changeBankPaymentStatus,
  changeBeneficiaryStatus,
  AccFreeze,
  AccDelete,
  paymentHistry,
  getMonthlyStatement,
  getMonthlyStatementUrl,
  fetchLinkedAccCards,
  updateUsageRules,
  getCardsUsageRules,
  getSucureCard,
  getTransactionAttachement
  
  };
  
  export default apis;