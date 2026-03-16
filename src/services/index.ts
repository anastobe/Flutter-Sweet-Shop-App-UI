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
    useBioMetryLogin,
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
    changeLimitCardStatus,
    changeFxPaymentStatus,
    changeBankPaymentStatus,
    changeBeneficiaryStatus,
    useReplaceCard,
    CardpaymentHistry,
    setSpendLimit,
    setPinSecurity,
    updateUsageRules,
    getCardsUsageRules,
    getCardFees,
    getPublicKey,
    getSucureCard,
    getSucureCardEncrypted


} from './card/card.service';

import { 
    getUserDetail,
    getCurrencyAccount,
    useaddAsset

} from './home/home.service';

import { 
    getBeneficiaryDetail,
    getPendingCardLimitChange,
    getPendingRequest,
    getPendingBankPayment,
    getFxQuote,
    DeleteBeneficiary,
    GetCopDetail,
    AddnewBeneficiaryApi,
    UpdateContactAddress,
    changePassword,
    resetPassword,
    FirstTimeEnableMFA,
    getCoutry,
    getCurrency,
    getAssetType,
    
    
} from './more/more.service';

const apis = {
  ResetPasswordLink,
  userLogin,
  useBioMetryLogin,
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
  getPendingCardLimitChange,
  getPendingRequest,
  getPendingBankPayment,
  getFxQuote,
  DeleteBeneficiary,
  GetCopDetail,
  AddnewBeneficiaryApi,
  UpdateContactAddress,
  changePassword,
  resetPassword,
  FirstTimeEnableMFA,
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
  changeLimitCardStatus,
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
  getCardFees,
  getPublicKey,
  getSucureCard,
  getSucureCardEncrypted,
  getTransactionAttachement
  
  };
  
  export default apis;