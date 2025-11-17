import dataHandlerService from "../APICall/dataHandler.service";
import ActionType from "../Redux/Action/ActionType/actionType";

export function logoutUser() {
  try {
    console.log("🚀 Logging out user…");

    // Clear Redux User Data
    dataHandlerService?.getStore()?.dispatch({
      type: ActionType.LOGOUT,
      payload: {},
    });

  } catch (e) {
    console.log("Logout error:", e);
  }
}
