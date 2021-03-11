import {StyleSheet} from 'react-native';
import {COLORS} from '../constants';

export const commonStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.lightgrey,
  },
  body: {
    backgroundColor: COLORS.lightgrey,
    minHeight: '100%',
  },
});
