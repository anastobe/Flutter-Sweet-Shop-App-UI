// theme/responsiveTheme.ts
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export const handleSize = {
  w: (val: number) => scale(val),
  h: (val: number) => verticalScale(val),
  f: (val: number) => moderateScale(val),
};
