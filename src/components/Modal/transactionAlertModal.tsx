import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNotificationModal } from '../notificationModalContext';
import { Modal } from '../../components';
import BluryModal from './bluryModal';
import { cardUsedStatus } from '../../queries/auth.query';
import commonUtils from '../../utils/common.utils';
import { CommonUtils, Toast } from '../../utils';
import { dequeueTransaction } from '../../Redux/Action/Notification/notificationActions';

const TransactionAlertModal = () => {
  const dispatch = useDispatch();
  const { visible, closeModal, data } = useNotificationModal();

  const approved = 'approved';
  const declined = 'declined';

  // 🔑 ONE SINGLE CLOSE HANDLER
  const closeAndNext = () => {
    closeModal();                 // close current modal
    dispatch(dequeueTransaction()); // show next from queue
  };

  // accept
const { mutate: cardUsedAcceptFunc, isPending: isPendingAccept } =
  cardUsedStatus({
    onSuccessCallback: () => {
      closeAndNext(); // ✅ success → next
    },
    onErrorCallback: (err) => {
      Toast.showToast(
        err?.message || 'Something went wrong',
        '',
        'error'
      );
      // closeAndNext(); // ❗ error ke baad bhi next
    },
  });

  // reject
  const { mutate: cardUsedDeclinedFunc, isPending: isPendingDecline } =
  cardUsedStatus({
    onSuccessCallback: () => {
      closeAndNext(); // ✅ success → next
    },
    onErrorCallback: (err) => {
      Toast.showToast(
        err?.message || 'Something went wrong',
        '',
        'error'
      );
      // closeAndNext(); // ❗ error ke baad bhi next
    },
    });

  const CallApi = status => {
    const backendTime = data?.challenge_expiry_datetime;
    const isValid = commonUtils.isTimeRemaining(backendTime);

    if (!isValid) {
      Toast.showToast('Request Time out', '', 'error');
      closeAndNext();
      return;
    }

    const payload = {
      sp_transaction_id: data?.sp_transaction_id,
      user_response: status,
    };

    if (status === approved) {
      // Toast.showToast("Payment Successfull", '', 'success',5000);
      // closeAndNext();
      cardUsedAcceptFunc(payload);
    } else {
      // Toast.showToast("Payment Rejected", '', 'error',5000);
      // closeAndNext();
      cardUsedDeclinedFunc(payload);
    }
  };

  return (
    <Modal isVisible={visible} isKeyboardAvoidingView>
      <BluryModal
        style={{ flex: 1, paddingHorizontal: 20 }}
        onClose={() => {
          if (isPendingAccept || isPendingDecline) return;
          closeAndNext();
        }}
        btnLoader={isPendingAccept}
        botmBtmLoader={isPendingDecline}
        body={`Your Frontier Pay card was just used in ${data?.card_acceptor_name}. Please confirm if this was you.`}
        marginTopTitle={20}
        onConfirm={() => {
          if (isPendingAccept || isPendingDecline) return;
          CallApi(approved);
        }}
        iconNameBottom={1}
        title={`Amount: ${parseFloat(data?.transaction_amount)?.toFixed(2)} ${CommonUtils.getCurrencySymbol(data?.transaction_currency_code)}\nAccount: **** ${data?.transaction_pan}`}
        iconName={'alert-outline'}
        confirmText={'APPROVE'}
        showCancelBtn
        downConfirmText={'REJECT'}
        onPressBottomBtn={() => {
          if (isPendingAccept || isPendingDecline) return;
          CallApi(declined);
        }}
      />
    </Modal>
  );
};

export default TransactionAlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#0A84FF',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
