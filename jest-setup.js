require('react-native-reanimated/src/reanimated2/jestUtils').setUpTests();

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage); //eslint-disable-line no-undef
