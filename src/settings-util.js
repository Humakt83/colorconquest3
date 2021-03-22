import AsyncStorage from '@react-native-async-storage/async-storage';

export const EVENT_MUSIC = 'event_music';
export const EVENT_SPEED = 'event_speed';
export const SETTINGS_MUSIC_KEY = '@music-on-off';
export const SETTINGS_SPEED_KEY = '@speed-level';

export const SPEED = {slow: 450, medium: 250, fast: 150};

export const readSettings = async (key, cb) => {
  try {
    const settingsVal = await AsyncStorage.getItem(key);
    if (settingsVal !== null && settingsVal !== undefined) {
      cb(JSON.parse(settingsVal));
    }
  } catch (error) {
    console.log('Unable to retrieve settings data');
    console.log(error);
  }
};

export const SettingsBus = {
  listeners: [],
  listen: function (listener, listenerFn) {
    if (!this.listeners.find((l) => l.name === listener)) {
      this.listeners.push({name: listener, fn: listenerFn});
    }
  },
  dispatch: function (event, value) {
    this.listeners.forEach((listener) => listener.fn(event, value));
  },
  remove: function (listener) {
    this.listeners = this.listeners.filter((l) => l.name !== listener);
  },
};

export const storeSettings = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Unable to store settings data');
    console.log(e);
  }
};
