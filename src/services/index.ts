// export * from './notification.service';
import {
    userLogin,
    createCard,
    getCards,
    freezUnFreezCard,
    


} from './auth/auth.service';

import {
    useReplaceCard
    


} from './auth/card.service';


const apis = {
    userLogin,
    createCard,
  getCards,
  freezUnFreezCard,
  useReplaceCard
  
  };
  
  export default apis;
