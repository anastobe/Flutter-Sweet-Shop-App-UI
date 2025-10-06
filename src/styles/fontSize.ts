import { scale, moderateScale } from 'react-native-size-matters';

const FONT_SIZES = Object.freeze({
  nine: moderateScale(9),
  oneZero: moderateScale(10),
  oneone: moderateScale(11),
  onetwo: moderateScale(12),
  onefour: moderateScale(14),
  onesix: moderateScale(16),
  oneeight: moderateScale(18),
  twozero: moderateScale(20),
  twotwo: moderateScale(22),
  twosix: moderateScale(26),
  threesix:  moderateScale(26),
  threetwo:  moderateScale(32),
  foureight:  moderateScale(48)
});

export { FONT_SIZES };
export default FONT_SIZES;
