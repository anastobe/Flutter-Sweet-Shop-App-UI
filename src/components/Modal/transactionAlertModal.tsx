
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNotificationModal} from '../notificationModalContext';
import { Modal } from '../../components';
import BluryModal from './bluryModal';
import { cardUsedStatus } from '../../queries/auth.query';
import commonUtils from '../../utils/common.utils';
import { Toast } from '../../utils';
import { useCountdown } from '../../utils/useCountdown';

const TransactionAlertModal = () => {
  const {visible, closeModal, data } = useNotificationModal();

  let approved = "approved"
  let declined = "declined" 

  const { minutes, seconds, isExpired } = useCountdown(
    data?.challenge_expiry_datetime || ''
  );
  
  //for accept
  const { mutate: cardUsedAcceptFunc, isPending: isPendingcardUsedStatus } = cardUsedStatus({
    callback: function (response) {
      console.log("cardUsedAcceptFunc==>",response);
      if (response.success) {
        closeModal()
      }
    },
  });
  
  //for Reject
  const { mutate: cardUsedDeclinedFunc, isPending: isPendingcardUsedDeclinedFunc } = cardUsedStatus({
    callback: function (response) {
      console.log("cardUsedDeclinedFunc==>",response);
      if (response.success) {
        closeModal()
      }
    },
  });

  function CallApi(status: string) {
    
    let backendTime =  data?.challenge_expiry_datetime
    const isValid = commonUtils.isTimeRemaining(backendTime);

    console.log("===>",data,"---",isValid);
    
    
    if (isValid) {
      let payload = {
        sp_transaction_id:  data?.sp_transaction_id, 
        user_response: status
        }
      
        if (status==approved) {
          cardUsedAcceptFunc(payload)//call accept function
        }else if(status==declined){
          cardUsedDeclinedFunc(payload)//call declined function
        }      
    }
    else{
      Toast.showToast("Request Time out", '', 'error');
    }
    
    
  }

  const formatTime = (value: number) => {
    return String(value).padStart(2, '0');
  };


  return (
    <Modal
      isVisible={visible}
      isKeyboardAvoidingView={true}
      children={<BluryModal
          style={{ flex: 1, paddingHorizontal: 20 }}
          onClose={() =>{ 
            if (isPendingcardUsedDeclinedFunc || isPendingcardUsedStatus) {
              return
            }
            else{
              closeModal() 
            }
          }}
          btnLoader={isPendingcardUsedStatus }
          botmBtmLoader={isPendingcardUsedDeclinedFunc }
          // title='Transaction Alert'
          // body={`
          //   Your Frontier Pay card was just used in ${data?.card_acceptor_name}.Please confirm if this was you by selecting Approve or Reject.
          //   \n ${`Session expire in ${formatTime(minutes)} min ${formatTime(seconds)} sec`}
          //   `}

          body={`Your Frontier Pay card was just used in ${data?.card_acceptor_name}.Please confirm if this was you by selecting Approve or Reject.`}
          marginTopTitle={20}
          onConfirm={() =>{ 
            if (isPendingcardUsedDeclinedFunc || isPendingcardUsedStatus) {
              return
            }
            else{
            CallApi(approved) 
            }
          }}
          iconNameBottom={1}
          // showSubBody={true}
          // showSubBodyIcon={false}
          // subBody={`Session expire in ${formatTime(minutes)} min ${formatTime(seconds)} sec`}
          title={`Amount: ${data?.transaction_amount} ${data?.transaction_currency_code}\n Account: **** ${data?.transaction_pan}`}
          iconName={"alert-outline"}
          confirmText={'APPROVE'}
          showCancelBtn={true}
          downConfirmText={"REJECT"}
          onPressBottomBtn={()=>{
            if (isPendingcardUsedDeclinedFunc || isPendingcardUsedStatus) {
              return
            }
            else{
            CallApi(declined) 
            }
          }}
        />}
        onClose={() => closeModal() }
    />
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
