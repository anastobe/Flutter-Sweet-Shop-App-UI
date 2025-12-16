

import { 
    getAccounts,
    getNotifications,
    AccFreeze,
    AccDelete,
    paymentHistry
    
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
    getCurrencyAccount

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
  getAccounts,
  getNotifications,
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
