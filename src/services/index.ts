

import { getAccounts } from './account/account.service';
import {
    userLogin,
    createCard,
    getCards,
    freezUnFreezCard,
    


} from './auth/auth.service';

import {
    useReplaceCard
    


} from './auth/card.service';

import { 
    getUserDetail 

} from './home/home.service';

import { 
    getBeneficiaryDetail,
    DeleteBeneficiary,
    AddnewBeneficiaryApi,
    getCoutry,
    getCurrency,
    getAssetType
    
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
  getAccounts
  
  };
  
  export default apis;
