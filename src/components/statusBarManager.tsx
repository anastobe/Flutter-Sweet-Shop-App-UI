import React, { useEffect, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';

interface StatusBarManagerProps {
  backgroundColor: string;
  barStyle?: 'light-content' | 'dark-content';
}

const StatusBarManager: React.FC<StatusBarManagerProps> = ({
  backgroundColor,
  barStyle = 'light-content',
}) => {
  
  // useFocusEffect ensures effect runs when screen is focused
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setBarStyle(barStyle);
    }, [backgroundColor, barStyle])
  );

  return null; // no UI
};

export default StatusBarManager;
