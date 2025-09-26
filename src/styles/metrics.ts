import {Dimensions} from 'react-native';

export const Metrics = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  halfScreen: Dimensions.get('window').height / 2
};

export default Metrics;
