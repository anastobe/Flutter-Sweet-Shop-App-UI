
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNotificationModal} from '../notificationModalContext';
import { Modal } from '../../components';
import BluryModal from './bluryModal';
import { cardUsedStatus } from '../../queries/auth.query';

const TransactionAlertModal = () => {
  const {visible, closeModal, data } = useNotificationModal();

  let approved = "approved"
  let declined = "declined" 
  
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
    let payload = {
      "sp_transaction_id": 12, 
      "user_response": status
      }

      console.log("SAdsaad==>",payload);
      
      if (status==approved) {
        cardUsedAcceptFunc(payload)//call accept function
      }else if(status==declined){
        cardUsedDeclinedFunc(payload)//call declined function
      }
  }


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
          iconNameBottom={10}
          // showSubBody={true}
          // subBody={"Your Frontier Pay card was just used.Please confirm if this was you by selecting Approve or Reject."}
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
