import ActionType from "../Redux/Action/ActionType/actionType";
import { SD, Toast } from "../utils";

export default function MessageHandler(response) {
    if (Array.isArray(response?.message)) {
        Toast.showToast(response?.message[0], '', 'error');
    } else {
        Toast.showToast(response.message, '', 'success');
    }
}