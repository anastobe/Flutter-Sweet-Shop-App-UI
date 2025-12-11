

import { 
    getAccounts,
    AccFreeze,
    AccDelete,
    
} from './account/account.service';

import {
    userLogin,
    createCard,
    getCards,
    freezUnFreezCard,
    


} from './auth/auth.service';

import {
    useBankTransfer


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
  useBankTransfer,
  createCard,
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
  setSpendLimit,
  setPinSecurity,
  freezUnFreezCardNoMessage,
  AccFreeze,
  AccDelete,
  updateUsageRules,
  getCardsUsageRules,
  getSucureCard
  
  };
  
  export default apis;
