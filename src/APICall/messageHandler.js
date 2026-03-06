import ActionType from "../Redux/Action/ActionType/actionType";
import { Toast } from "../utils";

const IGNORE_MESSAGES = [
  "Invalid code received for user"
];

export default function MessageHandler(response) {

    if (IGNORE_MESSAGES.includes(response?.message)) {
        return;
    }    

    if (response?.success) {
        Toast.showToast(response?.message || response?.message?.error?.details, '', 'success');
    } else {
        Toast.showToast(response?.message || response?.message?.error?.details, '', 'error');
    }
}