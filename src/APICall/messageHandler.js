import ActionType from "../Redux/Action/ActionType/actionType";
import { SD, Toast } from "../utils";

export default function MessageHandler(response) {
    if (response?.success) {
        Toast.showToast(response?.message || response.message?.error?.details, '', 'success');
    } else {
        Toast.showToast(response?.message || response.message?.error?.details, '', 'error');
    }
}