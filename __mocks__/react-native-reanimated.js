const mockedModule = jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
mockedModule.useSharedValue = jest.fn;
mockedModule.useAnimatedStyle = jest.fn;
module.exports = mockedModule;