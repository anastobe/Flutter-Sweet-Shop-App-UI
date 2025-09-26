import { ReactNode } from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export type  MainContainerProps = {
    children?: ReactNode;
    customeStyle?: StyleProp<ViewStyle>;
    hidden?: boolean;
    mainContainerStyle?: StyleProp<ViewStyle>;
    barStyle?: "default" | "light-content" | "dark-content";
    barBg?: string;
    isFlatList?: boolean;
    showBackArrow?: boolean;
    pressBackArrow?: any;
    onRefresh?: any;
    refreshing?: boolean;
    refreshingeffect?: boolean;
    pressRightArrow?: any
  };