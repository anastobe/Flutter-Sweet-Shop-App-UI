

import { getAccounts } from './account/account.service';
import {
    userLogin,
    createCard,
    getCards,
    freezUnFreezCard,
    


} from './auth/auth.service';

import {
    freezUnFreezCardNoMessage,
    useReplaceCard,
    setSpendLimit,
    setPinSecurity
    


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
  freezUnFreezCardNoMessage
  
  };
  
  export default apis;
