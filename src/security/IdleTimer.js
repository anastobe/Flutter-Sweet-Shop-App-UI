// InteractionContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState, Pressable } from 'react-native';
import dataHandlerService from '../APICall/dataHandler.service';
import ActionType from '../Redux/Action/ActionType/actionType';

const IDLE_TIME = 2 * 60 * 1000; // 2 minutes

const InteractionContext = createContext(null);

export const InteractionProvider = ({ children }) => {
  const timerRef = useRef(null);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false);

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      console.log('User inactive 🚫');
            
      dataHandlerService?.getStore()?.dispatch({
        type: ActionType.LOGOUT,
        payload: {},
      });

      // 🔐 logout / lock / show modal
    }, IDLE_TIME);
  };


   const resetTimer = () => {
    setLastInteraction(Date.now());

    if (isIdle) {
      console.log('User active again ✅');
      setIsIdle(false);
    }

    startTimer();
  };

  useEffect(() => {
   startTimer();


    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') resetTimer();
    });

    return () => {
      sub.remove();
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <InteractionContext.Provider value={{ resetTimer, lastInteraction }}>
      <Pressable style={{ flex: 1 }} onPressIn={resetTimer}>
        {children}
      </Pressable>
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => useContext(InteractionContext);
