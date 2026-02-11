import ActionType from '../Action/ActionType/actionType';

const initialState = {
  loginUserData: {},
  getCurrencyAccArray: [],
  beneficiaryArray: [],
  refreshCall: Math.random(),
  refreshCallAccount: Math.random(),
  allAccounts: [],
  selectedAccount_WholeApp: {}

};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOGIN_USER_DATA:
      return {
        ...state,
        loginUserData: action.payload,
      };

      case ActionType.GET_CURR_ACCOUNTS:
      return {
        ...state,
        getCurrencyAccArray: action.payload,
      };
      case ActionType.GET_BENEFICIARY:
      return {
        ...state,
        beneficiaryArray: action.payload,
      };
      case ActionType.CARD_SCREEN_REFRESH:
      return {
        ...state,
        refreshCall: action.payload,
      };
      case ActionType.ACCOUNT_SCREEN_REFRESH:
      return {
        ...state,
        refreshCallAccount: action.payload,
      };
      case ActionType.GET_ACCOUNTS:
      return {
        ...state,
        allAccounts: action.payload,
      };
      case ActionType.SELECTED_ACCOUNT_WHOLE_APP:
      return {
        ...state,
        selectedAccount_WholeApp: action.payload,
      };
      


      case ActionType.LOGOUT:
      return {
        ...state,
        loginUserData: {},
        getCurrencyAccArray: [],
        beneficiaryArray: [],
        refreshCall: "",
        allAccounts: [],
        selectedAccount_WholeApp: {}
      };

    default:
      return state;
  }
};


