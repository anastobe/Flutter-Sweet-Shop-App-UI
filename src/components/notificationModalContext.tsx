import React, {createContext, useContext, useState} from 'react';
import { cardUsedStatus, createCard } from '../queries/auth.query';

type TransactionData = {
  transaction_amount: string;
  transaction_currency_code: string;
  transaction_channel: string;
};

type ContextType = {
  openModal: (data: TransactionData) => void;
  closeModal: () => void;
  visible: boolean;
  data?: TransactionData;
};

const NotificationModalContext = createContext<ContextType>({
  openModal: () => {},
  closeModal: () => {},
  visible: false,
});

export const useNotificationModal = () => useContext(NotificationModalContext);

export const NotificationModalProvider = ({children}: any) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<TransactionData | undefined>();

  
  const openModal = (payload: TransactionData) => {
    setData(payload);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setData(undefined);
  };

  console.log("modal open krwado");

  return (
    <NotificationModalContext.Provider
      value={{openModal, closeModal, visible, data}}>
      {children}
    </NotificationModalContext.Provider>
  );
};
